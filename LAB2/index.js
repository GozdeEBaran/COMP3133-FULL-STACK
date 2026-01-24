const fs = require("fs");
const path = require("path");

// Define the file path
const filePath = path.join(__dirname, "input.txt");

console.log("--- START ---");
//Read synchronously
try {
  const data = fs.readFileSync(filePath, "utf8");
  console.log(data);
} catch (err) {
  console.error("Error reading file:", err);
}

// Read asysnchronously
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  console.log(data);
});

console.log("--- END ---");
