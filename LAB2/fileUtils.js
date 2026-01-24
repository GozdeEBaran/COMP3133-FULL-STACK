const fs = require("fs");
const path = require("path");

// Define the file path
const filePath = path.join(__dirname, "input.txt");

// File Stat
fs.stat(filePath, (err, stats) => {
  if (err) {
    return console.error("Error fetching file stats:", err);
  }
  console.log("File Stats:", stats);
  console.log("Stats isFile:", stats.isFile());
  console.log("Stats isDirectory:", stats.isDirectory());
  console.log("File Size:", stats.size, "bytes");
});
