const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let latestData = {
  heart_rate: 0,
  wave: 0,
  timestamp: ''
};

app.post('/upload', (req, res) => {
  const { bpm, wave } = req.body;

  if (typeof bpm === 'number' && typeof wave === 'number') {
    latestData = {
      heart_rate: bpm > 20 ? bpm : 0,
      wave: wave,
      timestamp: new Date().toLocaleTimeString()
    };

    fs.writeFileSync('data.json', JSON.stringify(latestData, null, 2));
    res.sendStatus(200);
  } else {
    res.status(400).send('Invalid data: bpm and wave are required.');
  }
});

app.get('/data', (req, res) => {
  res.json(latestData);
});

app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
