const fs = require("fs");
const datetime = new Date();
const config = require("./config.json");

const json = require(config.output);

let content;
try {
  contents = fs.readFileSync(config.markdown_template, { encoding: 'utf8' });
} catch(err) {
  // An error occurred
  console.error(err);
}


  const outputList = json.map(x => ' "' + x.tag + '"').toString();
  const token = "__TAGS__";
  const token2 = "__DATE__";
  const res = contents.replace(token, outputList).replace(token2, datetime.toISOString());
//   console.log(res);

try {
  fs.writeFileSync(config.markdown_output, res, { encoding: 'utf8' });
} catch(err) {
  // An error occurred
  console.error(err);
}