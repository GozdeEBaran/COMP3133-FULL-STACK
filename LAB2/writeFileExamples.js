const fs = require("fs");
const path = require("path");

// Define the file path
const filePath = path.join(__dirname, "output.txt");

const dataToWrite = Buffer.from(
  "Hello, this is a sample text written to the file.\n",
);
// Write synchronously
try {
  fs.writeFileSync(filePath, dataToWrite);
  console.log("Data written successfully.");
} catch (err) {
  console.error("Error writing file:", err);
}

// Write asynchronously
fs.writeFile(filePath, dataToWrite, (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("Data written successfully (async).");
});
