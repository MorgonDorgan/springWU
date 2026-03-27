const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.static("public"));

mongoose.connect("mongodb+srv://Morgonpigg:9DGxSaZun4pd1ecq@springwu.0mityag.mongodb.net/SearchDB?retryWrites=true&w=majority")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("ERROR:", err));

  const ItemSchema = new mongoose.Schema({
    name: String
  });
  
  const Item = mongoose.model("Item", ItemSchema);

app.get("/search", async (req, res) => {
  const query = (req.query.q || "").toLowerCase();

  const results = await Item.find({
    name: { $regex: query, $options: "i" } 
  }).sort({ name: 1 });

  res.json(results.map(item => item.name));
});

app.get("/add", async (req, res) => {

  const name = req.query.name;

  if (!name) {
    return res.send("Use /add?name=HTML");
  }

  const newItem = await Item.create({ name });

  console.log("Saved to DB:", newItem);

  res.send(`Added: ${name}`);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});