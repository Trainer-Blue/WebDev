import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from 'body-parser';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var name1 = "Default Name";
var name2 = "Sample Name";

app.use(bodyParser.urlencoded({extended: true}));

app.post("/submit", (req, res) => {
  console.log(req.body);
  name1 = req.body["street"];
  name2 = req.body["pet"];
  res.send(`<h1>Your Band Name is:</h1><p>${name1}${name2}</p>`);
}
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
}
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
