const fs = require("fs");
 
const SNIPPETS_PATH = "./snippets";


var readmeTemplate = fs.readFileSync("scripts/readme_template.md").toString();

const pasteValue = (tag, value) => {
    readmeTemplate = readmeTemplate.replace(`%${tag}%`, value);
}

const build = () => {
    var snippetFiles = fs
    .readdirSync(SNIPPETS_PATH)
    .sort((a, b) => a.toLowerCase() - b.toLowerCase());

    var snippetsContent = ""
    for (file of snippetFiles) {
        let filepath = `${SNIPPETS_PATH}/${file}`
        let conts = fs.readFileSync(filepath).toString()
        snippetsContent += conts + "\n"
    }

    pasteValue("contents_body", snippetsContent.trim())
    var err = fs.writeFileSync("README.md", readmeTemplate)
    if (err) {
        console.log("couldn't write to README.md", err)
    }
}

build()