const express = require('express');
const { resultados } = require('./utils/database_mock');
const app = express()
const port = 3000

let simpleCache = undefined;

app.get('/pessoas', (_, res) => {
  if(!simpleCache || simpleCache !== JSON.stringify(resultados.pessoas)) {
    simpleCache = JSON.stringify(resultados.pessoas);
    return res.status(200).json(resultados.pessoas)
  }
  return res.status(304).json(simpleCache)
});

app.get('/carros', (_, res) => {
  if(!simpleCache || simpleCache !== JSON.stringify(resultados.carros)) { 
    simpleCache = JSON.stringify(resultados.carros);
    return res.status(200).json(resultados.carros)
  }
  return res.status(304).json(simpleCache)
});

app.get('/animais', (_, res) => {
  if(!simpleCache || simpleCache !== JSON.stringify(resultados.animais)) { 
    simpleCache = JSON.stringify(resultados.animais);
    return res.status(200).json(resultados.animais)
  }
  return res.status(304).json(simpleCache)
});

app.get('/pessoas/:id', (req, res) => {
  const {id} = req.params;
  const person = resultados.pessoas.find((person) => person.id.toString() === id)

  if(!simpleCache || simpleCache !== JSON.stringify(person)) {
    simpleCache = JSON.stringify(person);
    return res.status(200).json(person)
  }
  return res.status(304).json(simpleCache)
});

app.get('/carros/:id', (req, res) => {
  const {id} = req.params;
  const car = resultados.carros.find((car) => car.id.toString() === id)
  if(!simpleCache || simpleCache !== JSON.stringify(car)) {
    simpleCache = JSON.stringify(car);
    
    return res.status(200).json(car)
  }
  return res.status(304).json(simpleCache)
});

app.get('/animais/:id', (req, res) => {
  const {id} = req.params;
  const animal = resultados.animais.find((animal) => animal.id.toString() === id)
  if(!simpleCache || simpleCache !== JSON.stringify(animal)) {
    
    simpleCache = JSON.stringify(animal);
    return res.status(200).json(animal)
  }

  return res.status(304).json(simpleCache)
});


app.listen(port, () => console.log(`Server online na porta: ${port}!`))