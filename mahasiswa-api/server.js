const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let dataStore = [];

// Endpoint untuk menambah data
app.post('/submit', (req, res) => {
  const data = req.body;
  dataStore.push(data);
  res.status(200).json({ message: 'Data received successfully', data });
});

// Endpoint untuk menghapus data berdasarkan NIM
app.delete('/delete', (req, res) => {
  const nim = req.body.nim;
  dataStore = dataStore.filter(item => item.nim !== nim);
  res.status(200).json({ message: 'Data deleted successfully' });
});

// Endpoint untuk mendapatkan semua submissions
app.get('/submissions', (req, res) => {
  res.status(200).json(dataStore);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://192.168.65.131:${PORT}`);
});
