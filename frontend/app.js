const express = require("express");
const Path = require("path");
const fetch = require('node-fetch').default; // Add this line
const app = express();
const port = 3000;

app.set("view engine", "ejs");
require("dotenv").config();
const url = process.env.URL || "http://localhost:4000/api";

app.set("views", Path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.render("index", { data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data from the server");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
