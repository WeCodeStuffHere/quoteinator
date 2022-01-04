import Quoteinator from "./src/quoteinator.js";
import http from "http";
import url from "url";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();
var mime = {
  html: "text/html",
  txt: "text/plain",
  css: "text/css",
  gif: "image/gif",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  js: "application/javascript",
};
let maker = new Quoteinator();
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
const server = http.createServer(async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  var filename = maker.quote(queryObject["quote"]);
  console.log(queryObject["quote"]);

  await sleep(1000);

  var file = path.join(__dirname, filename);
  var type = mime[path.extname(file).slice(1)] || "text/plain";
  var s = fs.createReadStream(file);
  s.on("open", function () {
    res.setHeader("Content-Type", type);
    s.pipe(res);
  });

  /*res.writeHead(200, { "Content-Type": "text/html" });
  //res.end("Feel free to add query parameters to the end of the url");

  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  res.end(time);*/
});

server.listen(5500, () => {
  console.log("Serving on 5500");
});
