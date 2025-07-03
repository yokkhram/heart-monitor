const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

// ข้อมูลล่าสุด
let latestData = {
  heart_rate: 0,
  spo2: 0,
  timestamp: new Date().toLocaleString()
};

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// รับข้อมูลจาก NodeMCU
app.post("/upload.php", (req, res) => {
  const { heart_rate, spo2 } = req.body;
  if (heart_rate) {
    latestData.heart_rate = parseInt(heart_rate);

    if (spo2 !== undefined) {
      // ตรวจสอบว่ามี spo2 และเป็นตัวเลข
      const spo2Int = parseInt(spo2);
      if (!isNaN(spo2Int)) {
        latestData.spo2 = spo2Int;
      }
    }

    latestData.timestamp = new Date().toLocaleString();

    console.log("Received:", latestData);
    res.send("Data received successfully");
  } else {
    res.status(400).send("Invalid data: heart_rate required");
  }
});

// API สำหรับเว็บดึงข้อมูลไปแสดงผล
app.get("/data", (req, res) => {
  res.json(latestData);
});

// หน้าเว็บหลัก
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Run Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
