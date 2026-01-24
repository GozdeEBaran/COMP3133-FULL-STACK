const fs = require("fs");
const path = require("path");

// Define the file path
const filePath = path.join(__dirname, "output.txt");

const dataToAppend = Buffer.from("This text is appended to the file.\n");

// Append synchronously
try {
  fs.appendFileSync(filePath, dataToAppend);
  console.log("Data appended successfully (sync).");
} catch (err) {
  console.error("Error appending file:", err);
}

// Append asynchronously
fs.appendFile(filePath, dataToAppend, (err) => {
  if (err) {
    console.error("Error appending file:", err);
    return;
  }
  console.log("Data appended successfully (async).");
});
