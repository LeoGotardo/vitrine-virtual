const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const database = new Database('./database.db');

database.exec(`
  CREATE TABLE IF NOT EXISTS Products (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    nome          TEXT    NOT NULL,
    descricao     TEXT,
    preco         REAL    NOT NULL,
    precoOriginal REAL,
    imagem        TEXT,
    fabricante    TEXT,
    emOferta      INTEGER DEFAULT 0,
    especificacoes TEXT
  ) STRICT
`);

const isEmpty = database.prepare('SELECT COUNT(*) as count FROM Products').get().count === 0;

if (isEmpty) {
  const seed = JSON.parse(fs.readFileSync(path.join(__dirname, 'seeds.json'), 'utf-8'));
  const insert = database.prepare(
    `INSERT INTO Products (nome, descricao, preco, precoOriginal, imagem, fabricante, emOferta, especificacoes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );
  for (const p of seed) {
    insert.run(p.nome, p.descricao, p.preco, p.precoOriginal, p.imagem, p.fabricante, p.emOferta, JSON.stringify(p.especificacoes));
  }
}

function parseProduct(row) {
  if (!row) return null;
  return {
    ...row,
    emOferta: row.emOferta === 1,
    especificacoes: JSON.parse(row.especificacoes || '{}'),
  };
}

function getProducts() {
  return database.prepare('SELECT * FROM Products').all().map(parseProduct);
}

function getProduct(id) {
  return parseProduct(database.prepare('SELECT * FROM Products WHERE id = ?').get(id));
}

function putProduct(product) {
  const stmt = database.prepare(
    `INSERT INTO Products (nome, descricao, preco, precoOriginal, imagem, fabricante, emOferta, especificacoes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const result = stmt.run(
    product.nome,
    product.descricao,
    product.preco,
    product.precoOriginal ?? null,
    product.imagem,
    product.fabricante,
    product.emOferta ? 1 : 0,
    JSON.stringify(product.especificacoes ?? {})
  );
  return getProduct(result.lastInsertRowid);
}

module.exports = { getProducts, getProduct, putProduct };
