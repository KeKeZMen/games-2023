const { createServer } = require("http");
const next = require("next");
const { parse } = require("url");
const { readFile } = require("fs/promises");
const { resolve } = require("path");

const port = 3000;
const hostname = "localhost";
const app = next({ hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      if (req.url.includes("/games/")) {
        const file = await readFile(resolve(`./public/${req.url}`));
        const fileBuffer = Buffer.from(file.buffer)
        res.end(fileBuffer);
      }
      if(req.url.includes("/videos/")) {
        const file = await readFile(resolve(`./public/${decodeURIComponent(req.url)}`));
        const fileBuffer = Buffer.from(file.buffer)
        res.end(fileBuffer);
      }
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> server started`);
    });
});
