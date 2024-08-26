const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const temporaryStorage = []; // Temporary storage for validated data

// Routes
app.get("/", (req, res) => {
  res.render("index", { errors: [] });
});

app.post("/submit", (req, res) => {
  const { name, email, age, message } = req.body;

  // Server-side validation
  const errors = [];
  if (!name || !email || !age || !message) {
    errors.push("All fields are required.");
  }
  if (isNaN(age) || age <= 0) {
    errors.push("Please enter a valid age.");
  }

  if (errors.length > 0) {
    res.render("index", { errors });
  } else {
    // Store validated data
    temporaryStorage.push({ name, email, age, message });
    res.render("response", { name, email, age, message });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
