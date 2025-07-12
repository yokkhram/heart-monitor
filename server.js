const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let latestData = { bpm: 0, spo2: 0 };

// รับค่าจาก ESP8266
app.post('/upload', (req, res) => {
  const { bpm, spo2 } = req.body;
  if (typeof bpm === 'number' && typeof spo2 === 'number') {
    latestData = { bpm, spo2 };
    fs.writeFileSync('data.json', JSON.stringify(latestData));
    res.sendStatus(200);
  } else {
    res.status(400).send('Invalid data');
  }
});

// ให้เว็บดึงค่าล่าสุด
app.get('/data', (req, res) => {
  res.json(latestData);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
