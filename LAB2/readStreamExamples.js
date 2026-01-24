const fs = require("fs");
const path = require("path");

// Define the file path
const filePath = path.join(__dirname, "input_stream.txt");
const readSteam = fs.createReadStream(filePath);
readSteam.on("data", (chunk) => {
  console.log("Received chunk:", chunk.toString());
});

readSteam.on("end", () => {
  console.log("No more data to read.");
});

readSteam.on("error", (err) => {
  console.error("Error reading the stream:", err);
});
