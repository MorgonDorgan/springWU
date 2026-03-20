const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/searchDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

  const ItemSchema = new mongoose.Schema({
    name: String
  });
  
  const Item = mongoose.model("Item", ItemSchema);

const data = [
  "HTML",
  "CSS",
  "JavaScript",
  "Node.js",
  "Express",
  "React"
];

app.get("/search", (req, res) => {

  const query = (req.query.q || "").toLowerCase();

  const results = data
    .filter(item => item.toLowerCase().includes(query))
    .sort((a, b) => a.length - b.length);

  res.json(results);

});

app.get("/add", async (req, res) => {
  await Item.create({ name: "HTML" });
  await Item.create({ name: "CSS" });
  await Item.create({ name: "JavaScript" });
  await Item.create({ name: "Node.js" });
  await Item.create({ name: "Express" });

  res.send("Data added");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});