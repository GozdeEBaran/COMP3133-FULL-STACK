const fs = require("fs");
const path = require("path");

// Define the file path
const filePath = path.join(__dirname, "user.json");

const userData = [
  {
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
  },
];

// Write JSON data to file
fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));
console.log("User data written to file successfully.");

// Read JSON data from file
try {
  const jsonData = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(jsonData);
  console.log("User data read from file:", users);

  // write new user data
  users.push({
    name: "Jane Smith",
    age: 25,
    email: "p@p.com",
  });

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  console.log("User data written to file successfully.");
} catch (err) {
  console.error("Error reading or parsing JSON file:", err);
}
