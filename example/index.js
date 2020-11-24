const path = require("path");
const BimLvParser = require("../lib/bim-lv.parser");
const { readFilePromise } = require("../lib/utils");

const LinkFile = path.join(__dirname, "/files/BMLinks.xml");
const BoQFile = path.join(__dirname, "/files/Leistungsverzeichnis.xml");
const BillingFile = path.join(__dirname, "/files/BillingModel.xml");

async function run() {
  const links = await readFilePromise(LinkFile).then((json) =>
    BimLvParser.parseLinkFile(json, false)
  );
  const billing = await readFilePromise(BillingFile).then((json) =>
    BimLvParser.parseBillingFile(json, false)
  );
  const boq = await readFilePromise(BoQFile).then((json) =>
    BimLvParser.parseBoQFile(json, { billing, links }, false)
  );
  return boq;
}

run();
