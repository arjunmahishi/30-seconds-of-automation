# 30 seconds of automation [![Build Status](https://travis-ci.com/arjunmahishi/30-seconds-of-automation.svg?branch=master)](https://travis-ci.com/arjunmahishi/30-seconds-of-automation) [![License](https://img.shields.io/badge/license-CC0--1.0-blue.svg)](https://github.com/arjunmahishi/30-seconds-of-automation/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![first-timers-only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square)](https://www.firsttimersonly.com/) 

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
yt = YouTube("<youtube-link>")
yt = yt.get('mp4', '720p')
yt.download('/path/to/download/directory')
```