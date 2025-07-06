const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

let heartRate = 0;
let spo2 = 0;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// รับค่าจาก ESP8266
app.post("/upload", (req, res) => {
  heartRate = parseInt(req.body.heart_rate) || 0;
  spo2 = parseInt(req.body.spo2) || 0;
  console.log("Received:", heartRate, spo2);
  res.sendStatus(200);
});

// หน้าเว็บ
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// API ให้ client เอาค่าไปแสดงแบบเรียลไทม์
app.get("/data", (req, res) => {
  res.json({ heart_rate: heartRate, spo2: spo2 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
