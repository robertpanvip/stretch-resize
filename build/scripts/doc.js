const { markdownRender  } =require('react-docgen-typescript-markdown-render') ;
const docGen = require("react-docgen-typescript");
const packageJSon = require('../../package.json')
const fs = require('fs')
const options = {
    savePropValueAsString: true,
};
const baseDir= `../../`

module.exports = async function () {
    const doc = docGen.parse("../../src/index.tsx",options);
    doc[0].displayName="📦 Description";
    const md = markdownRender(doc)
    const _md=`
📦 **Installation**
\`\`\` javascript
npm install ${packageJSon.name}
\`\`\`
${md}
    `.replace('#### Props',"🖥 **Props**")
        .replace('### 📦 Description','📦 **Description**')

    fs.writeFileSync(`${baseDir}/README.md`, _md)
}
