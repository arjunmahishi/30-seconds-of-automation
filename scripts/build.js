const fs = require("fs");
 
const SNIPPETS_PATH = "./snippets";
const SNIPPETS_JSON = "./docs/assets/snippets.json";
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

const writeToJson = (json) => {
    fs.writeFile(`${SNIPPETS_JSON}`, json, (err) => {
        if (err) console.log("couldnt write to JSON snippets file", err);
    });
};

const build = () => {
    var snippetFiles = fs
    .readdirSync(SNIPPETS_PATH)
    .sort((a, b) => a.toLowerCase() - b.toLowerCase());

    var snippetsContent = ""
    const snippetFileNames = [];
    for (file of snippetFiles) {
        let filepath = `${SNIPPETS_PATH}/${file}`
        snippetFileNames.push({ name: filepath.split("/")[2].split(".")[0] });
        let conts = fs.readFileSync(filepath).toString()
        conts = formatSnippetForReadme(conts)
        snippetsContent += "\n" + conts + "\n"
    }
    const jsonContent = JSON.stringify(snippetFileNames);
    writeToJson(jsonContent);
    readmeTemplate = pasteValue(readmeTemplate, "contents_body", snippetsContent.trim())
    var err = fs.writeFileSync("README.md", readmeTemplate)
    if (err) {
        console.log("couldn't write to README.md", err)
    }
}

build()