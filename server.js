const express = require("express");
const app = express();

app.use(express.static("public"));

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

  const results = data.filter(item =>
    item.toLowerCase().includes(query)
  );

  res.json(results);

});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});