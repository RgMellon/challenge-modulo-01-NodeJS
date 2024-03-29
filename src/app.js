const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const findIndex = repositories.findIndex(repo => repo.id === id);

  if (findIndex < 0) {
    return response.status(400).json({
      error: "Repository doesn`t exist"
    });
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[findIndex].likes
  };

  repositories[findIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findIndex = repositories.findIndex(repo => repo.id === id);

  if (findIndex < 0) {
    return response.status(400).json({
      error: "Repository doesn`t exist"
    });
  }

  repositories.splice(findIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findIndex = repositories.findIndex(repo => repo.id === id);

  if (findIndex < 0) {
    return response.status(400).json({
      error: "Repository doesn`t exist"
    });
  }

  repositories[findIndex].likes += 1;

  const repository = repositories[findIndex];

  return response.json(repository);
});

module.exports = app;
