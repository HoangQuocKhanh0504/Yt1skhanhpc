#!/bin/bash

# Cài python3 và pip3 (nếu chưa có)
apt-get update && apt-get install -y python3 python3-pip

# Cài yt-dlp hệ thống (để gọi lệnh yt-dlp)
pip3 install --upgrade yt-dlp

# Hoặc có thể tải binary yt-dlp trực tiếp:
# curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
# chmod +x /usr/local/bin/yt-dlp

# Cài Node packages
npm install
