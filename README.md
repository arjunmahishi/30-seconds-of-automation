# 30 seconds of automation [![Build Status](https://travis-ci.com/arjunmahishi/30-seconds-of-automation.svg?branch=master)](https://travis-ci.com/arjunmahishi/30-seconds-of-automation) [![License](https://img.shields.io/badge/license-CC0--1.0-blue.svg)](https://github.com/arjunmahishi/30-seconds-of-automation/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![first-timers-only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square)](https://www.firsttimersonly.com/) 

A curated list of automation scripts that make a developer's life. Inspired by other [30-seconds](https://github.com/30-seconds) projects.

# Snippets

## Download youtube video
This is a very simple and common python script to download a youtube video

<details>
<summary>view snippet</summary>

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

</details>


## Git aliases

A bunch of useful aliases for making git commands shorter and easier to use

<details>
<summary>view snippet</summary>

### Setup

Copy the below code to your `.bashrc` or `.zshrc` etc and source it (Ex: `source ~/.bashrc`)

### Code
```bash
alias gst="git status"
alias glg="git log"
alias gpm="git push origin master" 
alias gac="git add -A && git commit $1" # add and commit new changes
alias grh="git reset HEAD~1" # undo the last commit
```

</details>

## TODO Comments

A simple hack to to list all the `TODO` comments in the current directory and it's sub-directories

<details>
<summary>view snippet</summary>

### Setup

- create a python script and put the below code in it
- make the script executable by running  `chmod +x path/to/the/script.py`
- Copy the following alias to you `.bashrc` or `.zshrc` etc

```bash
alias todo="path/to/the/script.py"
```

### Code
```python
#!/usr/bin/env python
import os

def searchForTodo(filename):
    todos = "%s:\n" % filename
    flag = False
    with open(filename) as f:
        conts = f.read()
        for line in conts.split("\n"):
            if "TODO" in line:
                flag = True
                todos += "\t- " + line.split("TODO")[1].replace(":", "").replace("-", "") + "\n"
    if flag:
        return todos.replace("./", "") 
    return ""

def run(path):
    files = [path+"/"+f for f in os.listdir(path)]
    for f in files:
        if os.path.isfile(f) and "." in f: # making sure its not a binary
            todos = searchForTodo(f)
            if todos != "": 
                print todos
        if os.path.isdir(f):
            run(f)

run(".")

# output:
# file/containing/TODO:
#       - your TODO item 1
#       - your TODO item 2
```

</details>