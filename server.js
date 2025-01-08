// server.js
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
console.log("here");
const app = express();
app.use(bodyParser.json());
console.log("here 2");
const PORT = process.env.PORT || 5000;

// Middleware to handle CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust '*' to your specific origin if needed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
console.log("here 3");

// Create
app.post('/livro', async (req, res) => {
  const { nome, autor, ano, estoque } = req.body;
  try {
    const conn = await pool.getConnection();
    const result = await conn.query("INSERT INTO livros (nome, autor, ano, estoque) VALUES (?, ?, ?, ?)", [nome, autor, ano, estoque]);
    conn.release();
    res.status(201).json({ id: String(result.insertId) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read
app.get('/livro', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM livros");
    conn.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/livro/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM livros WHERE id = ?", [id]);
    conn.release();
    if (rows[0]==null) { throw new Error("Livro não existente"); }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
app.put('/livro/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, autor, ano, estoque } = req.body;
  try {
    const conn = await pool.getConnection();
    await conn.query("UPDATE livros SET nome = ?, autor = ?, ano = ?, estoque = ? WHERE id = ?", [nome, autor, ano, estoque, id]);
    conn.release();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
app.delete('/livro/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await pool.getConnection();
    await conn.query("DELETE FROM livros WHERE id = ?", [id]);
    conn.release();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/reserva', async (req, res) => {
  const { cpf, duracao, livroid } = req.body;
  try {
    const conn = await pool.getConnection();
    const result = await conn.query("INSERT INTO reservas (cpf, duracao, livroid) VALUES (?, ?, ?)", [cpf, duracao, livroid]);
    conn.release();
    res.status(201).json({ id: String(result.insertId) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/reserva', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT reservas.id,cpf,duracao,livroid,nome FROM reservas,livros WHERE livros.id=reservas.livroid");
    conn.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/reserva/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query(`SELECT reservas.id,clientes.cpf,clientes.nome,clientes.email,clientes.celular,clientes.endereco,duracao,livroid,livros.nome as livronome FROM reservas,livros,clientes WHERE livros.id=reservas.livroid AND reservas.id=${id} AND clientes.cpf=reservas.cpf`);
    conn.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
app.delete('/reserva/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await pool.getConnection();
    await conn.query("DELETE FROM reservas WHERE id = ?", [id]);
    conn.release();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/cliente', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM clientes");
    conn.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/cliente', async (req, res) => {
  const { nome, email, cpf, celular, endereco } = req.body;
  try {
    const conn = await pool.getConnection();
    const result = await conn.query("INSERT INTO clientes (nome, email, cpf, celular, endereco) VALUES (?, ?, ?, ?, ?)", [nome, email, cpf, celular, endereco]);
    conn.release();
    res.status(201).json({ id: String(result.insertId) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
app.delete('/cliente/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await pool.getConnection();
    await conn.query("DELETE FROM clientes WHERE id = ?", [id]);
    conn.release();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/cliente/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, celular, endereco } = req.body;
  try {
    const conn = await pool.getConnection();
    await conn.query("UPDATE clientes SET nome = ?, email = ?, cpf = ?, celular = ?, endereco = ? WHERE id = ?", [nome, email, cpf, celular, endereco, id]);
    conn.release();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
