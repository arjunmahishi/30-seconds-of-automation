# 30 seconds of automation [![Build Status](https://travis-ci.com/arjunmahishi/30-seconds-of-automation.svg?branch=master)](https://travis-ci.com/arjunmahishi/30-seconds-of-automation)
A curated list of automation scripts that make a developer's life. Inspired by other [30-seconds](https://github.com/30-seconds) projects.

# Snippets

## Download youtube video
This is a very simple and common python script to download a youtube video

### Setup
```bash
pip install pytube
```

### Code
```py
from pytube import YouTube
yt = YouTube("https://www.youtube.com/watch?v=n06H7OcPd-g")
yt = yt.get('mp4', '720p')
yt.download('/path/to/download/directory')
```