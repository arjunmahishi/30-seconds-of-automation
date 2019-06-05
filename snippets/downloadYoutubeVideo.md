## Download youtube video
This is a very simple and common python script to download a youtube video

### Setup
```bash
pip install pytube
```

### Code
```py
from pytube import YouTube
yt = YouTube("<youtube-link>")
yt = yt.get('mp4', '720p')
yt.download('/path/to/download/directory')
```
