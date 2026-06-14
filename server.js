const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let projects = [];

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.post("/api/projects", (req, res) => {
  const project = {
    id: Date.now(),
    studentName: req.body.studentName,
    title: req.body.title,
    technology: req.body.technology,
    status: req.body.status
  };

  projects.push(project);
  res.json({ message: "Project added successfully" });
});

app.delete("/api/projects/:id", (req, res) => {
  const id = Number(req.params.id);
  projects = projects.filter(project => project.id !== id);
  res.json({ message: "Project deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});