const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const port = 3000;

const folderPath = "./files"; //Folder where our files will get saved

if (!fs.existsSync(folderPath)) {
  // Create the folder if it doesnt exist
  fs.mkdirSync(folderPath, { recursive: true });
}
app.get("/create-file",reponseText);
app.get("/list-files",reponseJSON);
app.get("/notFound", reponseNotFound);
    // Create a file with current timestamp
    function reponseText(req, res) {
    const now = new Date();
    const fileName = `${now.toISOString().replace(/:/g, "-")}.txt`;
    const filePath = path.join(folderPath, fileName);

    fs.writeFile(filePath, now.toString(), (err) => {
      if (err) {
        res.writeHead(500);
        res.end("Server error!");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Current Time Stamp: ${fileName}`);
    });
}

function reponseJSON(req, res) {
    //List all the text files in the folder
    fs.readdir(folderPath, (err, files) => {
        if (err) {
          res.writeHead(500);
          res.end("Server error!");
          return;
        }
        const txtFiles = files.filter((file) => path.extname(file) === ".txt");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(txtFiles));
      });
}
function reponseNotFound(req, res) {
    res.setHeader("Content-Type", "text/plain");
    res.end("not found");
}
    
  
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
