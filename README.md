# 30 seconds of automation [![Build Status](https://travis-ci.com/arjunmahishi/30-seconds-of-automation.svg?branch=master)](https://travis-ci.com/arjunmahishi/30-seconds-of-automation) [![License](https://img.shields.io/badge/license-CC0--1.0-blue.svg)](https://github.com/arjunmahishi/30-seconds-of-automation/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![first-timers-only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square)](https://www.firsttimersonly.com/) 

A curated list of automation scripts that make a developer's life easy. Inspired by other [30-seconds](https://github.com/30-seconds) projects.

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

## Build Go code for multiple platforms 

An alias to build your go code for multiple platforms. Edit the below code for add or remove platforms.

<details>
<summary>view snippet</summary>

### Setup
```bash
# paste this code in .bashrc or .zshrc etc and source it
alias go-build-all="path-to/go-build-all.sh"
```

### Code
```bash
# create a file called go-build-all.sh and paste the folowing code

#!/bin/bash

PLATFORMS="darwin/amd64" # amd64 only as of go1.5
PLATFORMS="$PLATFORMS windows/amd64 windows/386" # arm compilation not available for Windows
PLATFORMS="$PLATFORMS linux/amd64 linux/386"
PLATFORMS="$PLATFORMS linux/ppc64 linux/ppc64le"
PLATFORMS="$PLATFORMS linux/mips64 linux/mips64le" # experimental in go1.6
PLATFORMS="$PLATFORMS freebsd/amd64"
PLATFORMS="$PLATFORMS netbsd/amd64" # amd64 only as of go1.6
PLATFORMS="$PLATFORMS openbsd/amd64" # amd64 only as of go1.6
PLATFORMS="$PLATFORMS dragonfly/amd64" # amd64 only as of go1.5
PLATFORMS="$PLATFORMS solaris/amd64" # as of go1.3
PLATFORMS_ARM="linux freebsd netbsd"

mkdir -p build
##############################################################
# Shouldn't really need to modify anything below this line.  #
##############################################################

type setopt >/dev/null 2>&1

SCRIPT_NAME=`basename "$0"`
FAILURES=""
SOURCE_FILE=`echo $@ | sed 's/\.go//'`
CURRENT_DIRECTORY=${PWD##*/}
OUTPUT="build/$CURRENT_DIRECTORY"
# if no src file given, use current dir name


for PLATFORM in $PLATFORMS; do
  GOOS=${PLATFORM%/*}
  GOARCH=${PLATFORM#*/}
  BIN_FILENAME="${OUTPUT}-${GOOS}-${GOARCH}"
  if [[ "${GOOS}" == "windows" ]]; then BIN_FILENAME="${BIN_FILENAME}.exe"; fi
  CMD="GOOS=${GOOS} GOARCH=${GOARCH} go build -o ${BIN_FILENAME} $@"
  echo "${CMD}"
  eval $CMD || FAILURES="${FAILURES} ${PLATFORM}"
done

# ARM builds
if [[ $PLATFORMS_ARM == *"linux"* ]]; then 
  CMD="GOOS=linux GOARCH=arm64 go build -o ${OUTPUT}-linux-arm64 $@"
  echo "${CMD}"
  eval $CMD || FAILURES="${FAILURES} ${PLATFORM}"
fi
for GOOS in $PLATFORMS_ARM; do
  GOARCH="arm"
  # build for each ARM version
  for GOARM in 7 6 5; do
    BIN_FILENAME="${OUTPUT}-${GOOS}-${GOARCH}${GOARM}"
    CMD="GOARM=${GOARM} GOOS=${GOOS} GOARCH=${GOARCH} go build -o ${BIN_FILENAME} $@"
    echo "${CMD}"
    eval "${CMD}" || FAILURES="${FAILURES} ${GOOS}/${GOARCH}${GOARM}" 
  done
done

# eval errors
if [[ "${FAILURES}" != "" ]]; then
  echo ""
  echo "${SCRIPT_NAME} failed on: ${FAILURES}"
  exit 1
fi
```

</details>

## Remove text from multiple file name

This snippet of code is useful when multiple files have a certain text in their name, that you want to get rid of, without manually
renaming all of them. Replace the `<text-to-remove>` with the actual text you want to remove from all file names. Run this 
command in the directory where all those files exist (*you could also tweak `$(ls)` to get files from different locations*). 

<details>
<summary>view snippet</summary>

### Code
```bash
for i in $(ls);do mv $i ${i#"<text-to-remove>"}; done

## examples:
    # limit the renaming to .txt files
    - for i in $(ls *.txt);do mv $i ${i#"<text-to-remove>"}; done 
    # renaming all files that have the prefix "test_"
    - for i in $(find / -name "test_*");do mv $i ${i#"<text-to-remove>"}; done
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