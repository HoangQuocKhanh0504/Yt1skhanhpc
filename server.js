const express = require('express');
const youtubedl = require('youtube-dl-exec');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/video-info', async (req, res) => {
  const videoUrl = req.query.url;
  console.log('Yêu cầu video:', videoUrl);

  if (!videoUrl || !videoUrl.includes('youtube.com')) {
    return res.status(400).json({ error: 'Link không hợp lệ!' });
  }

  try {
    const info = await youtubedl(videoUrl, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ['referer:youtube.com', 'user-agent:googlebot']
    });

    const format = info.formats.find(f => f.format_id === '18') || info.formats[0];

    res.json({
      title: info.title,
      thumbnail: info.thumbnail,
      channel: info.uploader,
      download: format.url,
    });
  } catch (err) {
    console.error("❌ Lỗi lấy info:", err.message || err);
    res.status(500).json({ error: 'Lỗi khi lấy thông tin video' });
  }
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`✅ Server đang chạy tại http://${HOST}:${PORT}`);
});
