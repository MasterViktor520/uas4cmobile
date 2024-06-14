const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory storage for simplicity (you can replace this with a database)
let activities = [];

// Route for receiving "Pratikum" data
app.post('/api/tendik', (req, res) => {
  const { service, day, name, nim, class: className, prodi, keterangan, link } = req.body;
  if (!service || !day || !name || !nim || !className || !prodi || !keterangan || !link) {
    return res.status(400).send('Missing required fields');
  }

  activities.push({ service, day, name, nim, className, prodi, keterangan, link });
  res.status(200).send('Data received for Pratikum');
});

// Route for receiving "Materi" data
app.post('/api/mahasiswa', (req, res) => {
  const { service, day, name, nim, class: className, prodi, keterangan, link } = req.body;
  if (!service || !day || !name || !nim || !className || !prodi || !keterangan || !link) {
    return res.status(400).send('Missing required fields');
  }

  activities.push({ service, day, name, nim, className, prodi, keterangan, link });
  res.status(200).send('Data received for Materi');
});

// Route for fetching "Pratikum" data
app.get('/api/tendik', (req, res) => {
  const tendikActivities = activities.filter(activity => activity.service === 'Pratikum');
  res.status(200).json(tendikActivities);
});

// Route for fetching "Materi" data
app.get('/api/mahasiswa', (req, res) => {
  const mahasiswaActivities = activities.filter(activity => activity.service === 'Materi');
  res.status(200).json(mahasiswaActivities);
});

// Route for deleting data by NIM
app.delete('/delete', (req, res) => {
  const { nim } = req.body;
  activities = activities.filter(activity => activity.nim !== nim);
  res.status(200).send('Data deleted');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://192.168.65.131:${PORT}`);
});
