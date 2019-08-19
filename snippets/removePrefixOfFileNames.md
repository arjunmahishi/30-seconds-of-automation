## Remove text from multiple file name

This snippet of code is useful when multiple files have a certain text in their name, that you want to get rid of, without manually
renaming all of them. Replace the `<text-to-remove>` with the actual text you want to remove from all file names. Run this 
command in the directory where all those files exist (*you could also tweak `$(ls)` to get files from different locations*). 

### Code
```bash
for i in $(ls);do mv $i ${i#"<text-to-remove>"}; done

## examples:
    # limit the renaming to .txt files
    - for i in $(ls *.txt);do mv $i ${i#"<text-to-remove>"}; done 
    # renaming all files that have the prefix "test_"
    - for i in $(find / -name "test_*");do mv $i ${i#"<text-to-remove>"}; done
```
