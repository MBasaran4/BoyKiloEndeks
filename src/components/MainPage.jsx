import React, { useState, useEffect } from 'react';
import './MainPage.css'; // Assuming you have this CSS file for styling
import { FaInstagram , FaYoutube , FaTwitter} from "react-icons/fa";
import { Analytics } from "@vercel/analytics/react"
import Navbar from './Navbar';

function MainPage() {
  const [boy, setBoy] = useState('');
  const [kilo, setKilo] = useState('');
  const [sonuc, setSonuc] = useState('');
  const [durum, setDurum] = useState('');
  const [normal, setNormal] = useState('');
  const [loading, setLoading] = useState(false);

  const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const hesapla = async () => {
    setSonuc('');
    setDurum('');
    setNormal('');
    setLoading(true);

    const boyValue = parseFloat(boy) / 100;
    const kiloValue = parseFloat(kilo);

    const endeks = kiloValue / (boyValue * boyValue);
    const min = boyValue * boyValue * 18.5;
    const max = boyValue * boyValue * 24.9;

    if (!isNaN(endeks)) {
      await pause(1000);
      setSonuc(`Boy Kilo Endeksiniz: ${endeks.toFixed(2)}`);
    } else {
      if (isNaN(boyValue)) {
        setSonuc(
          isNaN(kiloValue)
            ? 'Lütfen geçerli boy ve kilo girin!!'
            : 'Lütfen geçerli boy girin!!'
        );
      } else {
        setSonuc('Lütfen geçerli kilo girin!!');
      }
    }

    setLoading(false);

    if (endeks < 18.5) {
      setDurum('Kilonuz Zayıf');
    } else if (endeks < 24.9) {
      setDurum('Kilonuz Normal');
    } else if (endeks < 29.9) {
      setDurum('Kilonuz Fazla');
    } else if (endeks >= 30) {
      setDurum('Kilonuz Aşırı Fazla');
    }

    if (endeks > 0) {
      setNormal(`Kilonuzun olması gereken aralığı: ${min.toFixed(1)} - ${max.toFixed(1)}`);
    }
  };
  return (
    <>
      <Analytics/>
      <Navbar/>
      <h1 className='title'>BOY KİLO ENDEKSİ</h1>
      <form id="bkeForm">
        <div className="form">
          <input
            className="input"
            placeholder="Boy (cm)"
            type="number"
            step="1"
            value={boy}
            onChange={(e) => setBoy(e.target.value)}
            required
          />
          <br />
          <br />
          <span className="input-border"></span>
        </div>
        <div className="form">
          <input
            className="input"
            placeholder="Kilo (kg)"
            type="number"
            step="0.1"
            value={kilo}
            onChange={(e) => setKilo(e.target.value)}
            required
          />
          <br />
          <br />
          <span className="input-border"></span>
        </div>
        <button className="button" type="button" onClick={hesapla} disabled={loading}>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            'Hesapla'
          )}
        </button>
      </form>
      {loading && <div className="loader"></div>}
      <div className="sonuc">
        <div id="sonuc">{sonuc}</div>
        <div id="durum">{durum}</div>
        <div id="normal">{normal}</div>
      </div>
    </>
  );
}

export default MainPage;
