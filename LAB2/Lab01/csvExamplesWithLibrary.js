const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Example 1: Reading CSV file using csv-parser library
function readCSVWithLibrary(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        console.log(`Read ${results.length} rows from CSV`);
        resolve(results);
      })
      .on("error", (err) => {
        console.error("Error reading CSV:", err);
        reject(err);
      });
  });
}

// Example 2: Writing CSV file using csv-writer library
async function writeCSVWithLibrary(filePath, headers, data) {
  const csvWriter = createCsvWriter({
    path: filePath,
    header: headers.map((h) => ({ id: h, title: h })),
  });

  try {
    await csvWriter.writeRecords(data);
    console.log(`CSV file written successfully to ${filePath}`);
    return true;
  } catch (err) {
    console.error("Error writing CSV:", err);
    return false;
  }
}

// Example 3: Processing and transforming CSV data
async function processCSV() {
  // Files are now in the same directory
  const inputPath = path.join(__dirname, "input_countries.csv");
  const outputPath = path.join(__dirname, "processed_countries.csv");

  console.log("=== Reading CSV with csv-parser library ===");
  const data = await readCSVWithLibrary(inputPath);

  console.log("First 3 rows:", data.slice(0, 3));

  // Transform data: filter and add calculated fields
  const processedData = data
    .filter((row) => parseInt(row.population) > 50000000)
    .map((row) => ({
      country: row.country,
      year: row.year,
      population: row.population,
      populationInMillions: (parseInt(row.population) / 1000000).toFixed(2),
    }));

  console.log(`\nFiltered to ${processedData.length} rows`);

  // Write processed data
  const headers = ["country", "year", "population", "populationInMillions"];
  await writeCSVWithLibrary(outputPath, headers, processedData);
}

// Run the example
processCSV().catch(console.error);

