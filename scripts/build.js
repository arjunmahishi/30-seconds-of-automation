const fs = require("fs");
 
const SNIPPETS_PATH = "./snippets";
const README_TEMPLATE_PATH = "scripts/readme_template.md";
const SNIPPET_PLACEHOLDER_PATH = "scripts/snippet_placeholder.md"

var readmeTemplate = fs.readFileSync(README_TEMPLATE_PATH).toString();

const pasteValue = (placeholder, tag, value) => {
    return placeholder.replace(`%${tag}%`, value);
}

const stripSnippetTitle = (snippetContent) => {
    const regex = /###(.+\n*)+```/gm;
    let m = regex.exec(snippetContent)
    return m.length > 0 ? m[0] : "";
}

const formatSnippetForReadme = (snippetContent) => {
    let snippetPH = fs.readFileSync(SNIPPET_PLACEHOLDER_PATH).toString();
    let snippetWithoutTitle = stripSnippetTitle(snippetContent)
    let formattedSnippet = pasteValue(snippetPH, "snippet_body", snippetWithoutTitle)
    return snippetContent.replace(snippetWithoutTitle, formattedSnippet)
}

const build = () => {
    var snippetFiles = fs
    .readdirSync(SNIPPETS_PATH)
    .sort((a, b) => a.toLowerCase() - b.toLowerCase());

    var snippetsContent = ""
    for (file of snippetFiles) {
        let filepath = `${SNIPPETS_PATH}/${file}`
        let conts = fs.readFileSync(filepath).toString()
        conts = formatSnippetForReadme(conts)
        snippetsContent += "\n" + conts + "\n"
    }

    readmeTemplate = pasteValue(readmeTemplate, "contents_body", snippetsContent.trim())
    var err = fs.writeFileSync("README.md", readmeTemplate)
    if (err) {
        console.log("couldn't write to README.md", err)
    }
}

build()