const express = require("express");
const bodyParser = require("body-parser");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

// Excel file path
const excelFile = path.join(__dirname, "data", "submissions.xlsx");

// Utility: Save data to Excel
function saveToExcel(sheetName, data) {
  let workbook;
  let worksheet;

  if (fs.existsSync(excelFile)) {
    workbook = XLSX.readFile(excelFile);
    worksheet = workbook.Sheets[sheetName] || XLSX.utils.json_to_sheet([]);
  } else {
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.json_to_sheet([]);
  }

  const existingData = XLSX.utils.sheet_to_json(worksheet);
  existingData.push(data);

  const newSheet = XLSX.utils.json_to_sheet(existingData);
  XLSX.utils.book_append_sheet(workbook, newSheet, sheetName, true);
  XLSX.writeFile(workbook, excelFile);
}

// ✅ HOME ROUTE (THIS FIXES "Cannot GET /")
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Booking form
app.post("/book", (req, res) => {
  saveToExcel("Bookings", req.body);
  res.redirect("/success.html");
});

// Game reservation
app.post("/reserve", (req, res) => {
  saveToExcel("Game Reservations", req.body);
  res.redirect("/success.html");
});

// Newsletter
app.post("/newsletter", (req, res) => {
  saveToExcel("Newsletter", req.body);
  res.redirect("/success.html");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});