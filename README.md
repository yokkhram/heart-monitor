# heart-monitor
# Health Monitor Web

โปรเจกต์เว็บแสดงข้อมูล Heart Rate และ SpO₂ แบบเรียลไทม์ จากเซ็นเซอร์ MAX30102

## วิธีใช้งาน

1. เชื่อมต่อ NodeMCU กับเซ็นเซอร์ MAX30102  
2. อัปโหลดโค้ด Arduino ให้ส่งข้อมูลไปยังเว็บเซิร์ฟเวอร์  
3. รันเว็บเซิร์ฟเวอร์ (Node.js / PHP / etc.)  
4. เปิดเว็บเบราว์เซอร์ที่ [[`http://localhost:3000`](https://heart-monitor-lgzg.onrender.com)](https://heart-monitor-lgzg.onrender.com) หรือ URL ที่ตั้งค่าไว้

## สถานะโปรเจกต์

- ทำงานได้บนมือถือและเดสก์ท็อป  
- แสดงกราฟข้อมูลแบบเรียลไทม์  
- รองรับการรับข้อมูลจากเซ็นเซอร์ผ่าน HTTP POST


