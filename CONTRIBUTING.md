# Contributing

## Ways to contribute
- Add automation snippets
- Improve existing snippets by writing better descriptions, fixing typos, improving code etc
- Improve the repository structure
- Anything else you can think of

## Adding a snippet
- Fork the repository
- Clone the fork to you local machine
- Add a new file to the `/snippets` directory. Seperate files are maintained for each snippet
- For the newly created file, use the [snippet_template](snippet_template.md) 
- Once you have finished with the snippet, commit it, push it to your fork, create a pull request

## Guidelines
- DO NOT MODIFY `README.md`. If you want to modify existing snippets, go to the respective snippet file in `/snippets` and modify it. The travis build will take care of making the changes in `README.md`
- While creating a new file in `/snippets`, the name of the file should be the same as the title of the snippet, but in camelCase. (Example: if the title is `Download youtube video`, the file name should be `downloadYoutubeVideo.md`)
- If you want to make changes to `README.md`, make the changes in the [readme_template](scripts/readme_template). Like mentioned above, the travis build will take care of modifying `README.md`

----
**Working on your first Pull Request?** You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)