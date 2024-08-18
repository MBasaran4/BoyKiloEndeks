import React, { useState, useEffect } from 'react';
import './css/MainPage.css'; // Assuming you have this CSS file for styling
import { FaMoon } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaInstagram , FaYoutube , FaTwitter} from "react-icons/fa";

function MainPage() {
  const getThemeFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get('theme');
    if (theme) {
      localStorage.setItem('theme', theme);
      return theme;
    }
    return localStorage.getItem('theme') || 'light';
  };

  const [isLightMode, setIsLightMode] = useState(getThemeFromURL() === 'light');
  const [boy, setBoy] = useState('');
  const [kilo, setKilo] = useState('');
  const [sonuc, setSonuc] = useState('');
  const [durum, setDurum] = useState('');
  const [normal, setNormal] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light-mode', isLightMode);
    document.body.classList.toggle('dark-mode', !isLightMode);
  }, [isLightMode]);

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

  const handleThemeChange = () => {
    const newTheme = !isLightMode ? 'light' : 'dark';
    setIsLightMode(!isLightMode);
    localStorage.setItem('theme', newTheme);

    const url = new URL(window.location);
    url.searchParams.set('theme', newTheme);
    window.history.replaceState({}, '', url);
  };

  return (
    <div>
     <div className='navBar'>
        <a href="http://localhost:5173/"><h1>Hesap<span className='kitap'>Kitap</span></h1></a>
        <div className='menu'>
          <li>
            <a className='title'>Sağlık</a>
            <div className='nalt'>
              <a href="http://localhost:5174?theme={isLightMode ? 'light' : 'dark'}">Boy Kilo Endeksi Hesap</a>
              <a href="http://localhost:5175?theme={isLightMode ? 'light' : 'dark'}">Metobalizma Hızı Hesap</a>
              <a href="">Günlük Su İhtiyacı Hesap</a>
            </div>
          </li>
          <li>
            <a className='title'>Matematik</a>
            <div className='nalt'>
              <a href="">Karekök Hesap</a>
            </div>
          </li>
        </div>
        <div className="theme-switch">
          <input
            type="checkbox"
            id="theme-checkbox"
            checked={isLightMode}
            onChange={handleThemeChange}
          />
          <label htmlFor="theme-checkbox">
            <div></div>
            <span>
              <MdOutlineWbSunny/>
            </span>
            <span>
              <FaMoon/>
            </span>
          </label>
        </div>
      </div>
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
      <div className='endBar'>
        <h2>İletişim</h2>
        <div className='main'>
          <button className='card1'>
            <FaInstagram className='instagram'/>
          </button>
          <button className='card2'>
            <FaYoutube className='youtube'/>
          </button>
          <button className='card3'>
            <FaTwitter className='twitter'/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
