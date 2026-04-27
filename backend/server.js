const express = require('express');
const cors = require('cors');
const { getProducts, getProduct, putProduct } = require('./database.js');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/products', (req, res) => {
  res.json(getProducts());
});

app.get('/products/:id', (req, res) => {
  const product = getProduct(Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
  res.json(product);
});

app.post('/products', (req, res) => {
  const { nome, preco } = req.body;
  if (!nome || !preco) return res.status(400).json({ error: 'nome e preco são obrigatórios' });
  const created = putProduct(req.body);
  res.status(201).json(created);
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
