const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

let latestData = {
  heart_rate: 72,
  spo2: 98,
  timestamp: new Date().toLocaleString()
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/upload", (req, res) => {
  const { heart_rate, spo2 } = req.body;
  if (heart_rate && spo2) {
    latestData = {
      heart_rate: parseInt(heart_rate),
      spo2: parseInt(spo2),
      timestamp: new Date().toLocaleString()
    };
    res.send("Data received");
  } else {
    res.status(400).send("Invalid data");
  }
});

app.get("/data", (req, res) => {
  res.json(latestData);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
