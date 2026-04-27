const Database = require('better-sqlite3');

const database = new Database(':memory:');

database.exec(`
  CREATE TABLE Products (
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

const seed = [
  {
    nome: 'Notebook Dell Inspiron 15',
    descricao: 'Notebook para uso profissional e pessoal',
    preco: 3499.99,
    precoOriginal: null,
    imagem: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop',
    fabricante: 'Dell',
    emOferta: 0,
    especificacoes: JSON.stringify({ processador: 'Intel Core i5 11ª Geração', memoria: '8GB RAM DDR4', armazenamento: '256GB SSD', tela: '15.6 polegadas Full HD', placaVideo: 'Intel UHD Graphics' }),
  },
  {
    nome: 'Mouse Logitech MX Master 3',
    descricao: 'Mouse ergonômico wireless premium',
    preco: 439.92,
    precoOriginal: 549.90,
    imagem: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop',
    fabricante: 'Logitech',
    emOferta: 1,
    especificacoes: JSON.stringify({ tipo: 'Wireless', conexao: 'Bluetooth e USB', bateria: 'Até 70 dias com carga completa', dpi: 'Até 4000 DPI', botoes: '7 botões programáveis' }),
  },
  {
    nome: 'Teclado Mecânico Keychron K2',
    descricao: 'Teclado mecânico compacto wireless',
    preco: 799.00,
    precoOriginal: null,
    imagem: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=300&fit=crop',
    fabricante: 'Keychron',
    emOferta: 0,
    especificacoes: JSON.stringify({ layout: '75% compacto', switches: 'Gateron Brown', conexao: 'Bluetooth e USB-C', bateria: 'Até 240 horas', retroiluminacao: 'RGB personalizável' }),
  },
  {
    nome: 'Monitor LG UltraWide 29"',
    descricao: 'Monitor ultrawide para produtividade',
    preco: 1299.99,
    precoOriginal: null,
    imagem: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
    fabricante: 'LG',
    emOferta: 0,
    especificacoes: JSON.stringify({ tamanho: '29 polegadas', resolucao: '2560x1080 (UltraWide Full HD)', taxaAtualizacao: '75Hz', painel: 'IPS', conectividade: 'HDMI, DisplayPort' }),
  },
  {
    nome: 'Headset HyperX Cloud II',
    descricao: 'Headset gamer com som surround 7.1',
    preco: 374.93,
    precoOriginal: 499.90,
    imagem: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop',
    fabricante: 'HyperX',
    emOferta: 1,
    especificacoes: JSON.stringify({ tipo: 'Over-ear fechado', som: 'Virtual Surround 7.1', microfone: 'Removível com cancelamento de ruído', conexao: 'USB e P2 3.5mm', compatibilidade: 'PC, PS4, Xbox, Nintendo Switch' }),
  },
  {
    nome: 'Webcam Logitech C920',
    descricao: 'Webcam Full HD para videoconferências',
    preco: 319.20,
    precoOriginal: 399.00,
    imagem: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&h=300&fit=crop',
    fabricante: 'Logitech',
    emOferta: 1,
    especificacoes: JSON.stringify({ resolucao: '1080p Full HD a 30fps', foco: 'Automático', microfones: 'Estéreo integrados', campoVisao: '78 graus', compatibilidade: 'Windows, Mac, Chrome OS' }),
  },
];

const insert = database.prepare(
  `INSERT INTO Products (nome, descricao, preco, precoOriginal, imagem, fabricante, emOferta, especificacoes)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
);
for (const p of seed) {
  insert.run(p.nome, p.descricao, p.preco, p.precoOriginal, p.imagem, p.fabricante, p.emOferta, p.especificacoes);
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
