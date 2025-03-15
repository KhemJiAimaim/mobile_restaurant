import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ ใช้ named import ตามเวอร์ชันใหม่
import Cookies from 'js-cookie';

export default function ReadQrcode() {
  const { token } = useParams(); // 🔹 ดึงค่า token จาก URL
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token); // 🔹 ถอดรหัส JWT
        Cookies.set('token', token, { expires: 1 }); // 🔹 เก็บ JWT ลง Cookie (หมดอายุใน 1 วัน)
        console.log("Decoded JWT:", decoded); // 🔹 แสดงค่าที่ถอดรหัสใน Console
        navigate('/'); // 🔹 Redirect ไปหน้าแรก
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, [token, navigate]);

  return <div>กำลังตรวจสอบ QR Code...</div>;
}
