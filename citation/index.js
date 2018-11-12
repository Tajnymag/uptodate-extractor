const Cite = require("citation-js");
const fs = require('fs');

const json = fs.readFileSync(__dirname + '/example.json', 'utf-8');
const template = fs.readFileSync(__dirname + '/iso690-numeric-brackets-cs.csl', 'utf-8');
const locale = fs.readFileSync(__dirname + '/locales-cs-CZ.xml', 'utf-8');

async function main() {
  Cite.CSL.register.addTemplate('custom', template);
  Cite.CSL.register.addLocale('cs-CZ', locale);

  const data = await Cite.async(json);

    const citation = data.get({
      format: "string",
      type: "string",
      style: "citation-custom",
      lang: "cs-CZ"
    });

    console.log(citation);
}
main();