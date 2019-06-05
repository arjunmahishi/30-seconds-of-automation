## Git aliases

A bunch of useful aliases for making git commands shorter and easier to use

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