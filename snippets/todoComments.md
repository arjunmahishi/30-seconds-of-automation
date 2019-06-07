## TODO Comments

A simple hack to to list all the `TODO` comments in the current directory and it's sub-directories

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