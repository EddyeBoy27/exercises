const express = require('express');
const bodyParser = require('body-parser');
const plantsModel = require('./plantsModel');

const app = express();
const PORT = process.env.DB_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/plants', (req, res) => {
  const plantAnswer = plantsModel.getPlants();
  res.json(plantAnswer);
});
app.get('/plant/:id', (req, res) => {
  const { id } = req.params;
  const plantAnswer = plantsModel.getPlantById(Number(id));
  res.json(plantAnswer);
});
app.delete('/plant/:id', (req, res) => {
  const { id } = req.params;
  const plantAnswer = plantsModel.removePlantById(Number(id));
  res.json(plantAnswer);
});
app.post('/plant/:id', (req, res) => {
  const { id } = req.params;
  const plantAnswer = plantsModel.editPlant(Number(id), req.body);
  res.json(plantAnswer);
});
app.post('/plant', (req, res) => {
  const plantAnswer = plantsModel.createNewPlant(req.body);
  res.json(plantAnswer);
});
app.get('/sunny/:id', (req, res) => {
  const { id } = req.params;
  const plantAnswer = plantsModel.getPlantsThatNeedsSunWithId(Number(id));
  res.json(plantAnswer);
});



app.get('/ping', (req, res) => res.send({ message: 'Pong' }));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
