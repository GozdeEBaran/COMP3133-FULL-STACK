const fs = require("fs");
const path = require("path");

// manual parsing
function readCSVNative(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n").filter((line) => line.trim() !== "");
    const headers = lines[0].split(",");
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",");
      const row = {};
      headers.forEach((header, index) => {
        row[header.trim()] = values[index]?.trim() || "";
      });
      rows.push(row);
    }

    return { headers, rows };
  } catch (err) {
    console.error("Error reading CSV file:", err);
    return null;
  }
}

//  Writing CSV
function writeCSVNative(filePath, headers, rows) {
  try {
    // Create header row
    let csvContent = headers.join(",") + "\n";

    // Create data rows
    rows.forEach((row) => {
      const values = headers.map((header) => row[header] || "");
      csvContent += values.join(",") + "\n";
    });

    fs.writeFileSync(filePath, csvContent, "utf8");
    console.log(`CSV file written successfully to ${filePath}`);
    return true;
  } catch (err) {
    console.error("Error writing CSV file:", err);
    return false;
  }
}

//  Reading CSV
function readCSVStream(filePath, callback) {
  const readStream = fs.createReadStream(filePath, { encoding: "utf8" });
  let headers = [];
  let isFirstLine = true;
  let buffer = "";

  readStream.on("data", (chunk) => {
    buffer += chunk;
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    lines.forEach((line) => {
      if (line.trim() === "") return;

      if (isFirstLine) {
        headers = line.split(",").map((h) => h.trim());
        isFirstLine = false;
      } else {
        const values = line.split(",").map((v) => v.trim());
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || "";
        });
        callback(row);
      }
    });
  });

  readStream.on("end", () => {
    if (buffer.trim() && !isFirstLine) {
      const values = buffer.split(",").map((v) => v.trim());
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || "";
      });
      callback(row);
    }
    console.log("Finished reading CSV file");
  });

  readStream.on("error", (err) => {
    console.error("Error reading CSV file:", err);
  });
}

const inputPath = path.join(__dirname, "input_countries.csv");
const outputPath = path.join(__dirname, "output_countries.csv");

console.log("=== Example 1: Reading CSV with native Node.js ===");
const csvData = readCSVNative(inputPath);
if (csvData) {
  console.log("Headers:", csvData.headers);
  console.log("Total rows:", csvData.rows.length);
  console.log("First 3 rows:", csvData.rows.slice(0, 3));
}

console.log("\n=== Example 2: Writing CSV with native Node.js ===");
if (csvData) {
  const filteredRows = csvData.rows.filter(
    (row) => parseInt(row.population) > 100000000,
  );
  writeCSVNative(outputPath, csvData.headers, filteredRows);
}

console.log("\n=== Example 3: Reading CSV with streams ===");
let rowCount = 0;
readCSVStream(inputPath, (row) => {
  rowCount++;
  if (rowCount <= 3) {
    console.log("Row", rowCount, ":", row);
  }
});
