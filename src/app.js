const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const projects = [];

app.get("/projects", (request, response) => {
  return response.json(projects);
});

app.post("/projects", (request, response) => {
  const { url, title, techs, owner } = request.body;
  project = { id: uuid(), url, title, techs, likes: 0, owner };
  projects.push(project);
  return response.json(project);

});

app.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0){
      return response.status(400).json({error: "project not found"});
  }

  const likes = projects[projectIndex].likes;

  const project = {
      id,
      url,
      title,
      techs,
      likes,
      owner,

  }
  projects[projectIndex] = project;

  return response.json(project);

});

app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;
  const projectIndex = projects.findIndex(project => project.id === id);
  
  if (projectIndex < 0){
    return response.status(400).json({error: "project not found"});
  }

  projects.splice(projectIndex,1);

  return response.status(204).send();

});

app.post("/projects/:id/like", (request, response) => {
  const { id } = request.params;
  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0){
      return response.status(400).json({error: "project not found"});
  }

  projects[projectIndex].likes = projects[projectIndex].likes + 1;
  return response.json({ "likes": projects[projectIndex].likes });

});

module.exports = app;
