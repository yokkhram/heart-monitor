const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// ให้ Express อ่าน JSON body และเสิร์ฟไฟล์จากโฟลเดอร์ public
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// เก็บค่าล่าสุดไว้ใน memory (หรือไฟล์)
let latestData = {
  heart_rate: 0,
  spo2: 0,
  timestamp: ''
};

// Endpoint ให้ ESP8266 ส่งข้อมูลมา
app.post('/upload', (req, res) => {
  const { bpm, spo2 } = req.body;

  if (typeof bpm === 'number' && typeof spo2 === 'number') {
    latestData = {
      heart_rate: bpm,
      spo2: spo2,
      timestamp: new Date().toLocaleTimeString()
    };

    // บันทึกลงไฟล์ (ไม่จำเป็นแต่ช่วย debug ได้)
    fs.writeFileSync('data.json', JSON.stringify(latestData, null, 2));

    res.sendStatus(200);
  } else {
    res.status(400).send('Invalid data: bpm and spo2 are required.');
  }
});

// Endpoint ให้หน้าเว็บดึงค่าล่าสุด
app.get('/data', (req, res) => {
  res.json(latestData);
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
