const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

// ข้อมูลล่าสุด เริ่มต้นเป็น 0 และ timestamp ว่าง
let latestData = {
  heart_rate: 0,
  spo2: 0,
  timestamp: ""
};

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// รับข้อมูลจาก NodeMCU
app.post("/upload.php", (req, res) => {
  const { heart_rate, spo2 } = req.body;
  if (heart_rate && spo2) {
    latestData = {
      heart_rate: parseInt(heart_rate),
      spo2: parseInt(spo2),
      timestamp: new Date().toLocaleString()
    };
    console.log("Received:", latestData);
    res.send("Data received successfully");
  } else {
    // ล้างข้อมูลถ้าไม่ได้รับค่า
    latestData = {
      heart_rate: 0,
      spo2: 0,
      timestamp: ""
    };
    res.status(400).send("Invalid data");
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
