import { useState, useEffect } from 'react';
import React from 'react';
import { IoMenu } from "react-icons/io5";
import { FaMoon, FaArrowLeft } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";
import "./Navbar.css";

function Navbar() {

    const getThemeFromURL = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const theme = urlParams.get('theme');
        if (theme) {
          localStorage.setItem('theme', theme);
          return theme;
        }
        return localStorage.getItem('theme') || 'light'; // Varsayılan olarak light mode
      };
    
    const [isLightMode, setIsLightMode] = useState(getThemeFromURL() === 'light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNaltOpenSaglik, setIsNaltOpenSaglik] = useState(false);
    const [isNaltOpenMatematik, setIsNaltOpenMatematik] = useState(false);
    
    useEffect(() => {
        document.body.classList.toggle('light-mode', isLightMode);
        document.body.classList.toggle('dark-mode', !isLightMode);
    }, [isLightMode]);
    
    const handleThemeChange = () => {
        const newTheme = !isLightMode ? 'light' : 'dark';
        setIsLightMode(!isLightMode);
        localStorage.setItem('theme', newTheme);
    
        // URL'i güncelle ve tema parametresini ekle
        const url = new URL(window.location);
        url.searchParams.set('theme', newTheme);
        window.history.replaceState({}, '', url);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleNaltSaglik = () => {
        setIsNaltOpenSaglik(!isNaltOpenSaglik);
        setIsNaltOpenMatematik(false); // Diğer alt menüyü kapatır
    };

    const toggleNaltMatematik = () => {
        setIsNaltOpenMatematik(!isNaltOpenMatematik);
        setIsNaltOpenSaglik(false); // Diğer alt menüyü kapatır
    };

    return (
        <div>
            <div className='navBar'>
                <div className='hamburger-menu' onClick={toggleMenu}>
                    <IoMenu/>
                </div>
                <a href="https://hesap-kitap.vercel.app"><h1>Hesap<span className='kitap'>Kitap</span></h1></a>
                <div className='menu'>
                    <li>
                        <a className='title'>Sağlık</a>
                        <div className='nalt'>
                            <a href="https://boy-kilo-endeks.vercel.app">Boy Kilo Endeksi Hesap</a>
                            <a href="https://metabolizma-hesap.vercel.app">Metobalizma Hızı Hesap</a>
                        </div>
                    </li>
                    <li>
                        <a className='title'>Matematik</a>
                        <div className='nalt'>
                            <a href="https://alan-hesaplama-omega.vercel.app">Alan Hesaplama</a>
                            <a href="https://hacim-hesap.vercel.app/">Hacim Hesaplama</a>
                        </div>
                    </li>
                </div>
                <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                    <div className='backButton' onClick={toggleMenu}>
                        <FaArrowLeft/>
                    </div>
                    <li>
                        <a className='mTitle' onClick={toggleNaltSaglik}>Sağlık</a>
                        <div className={`mNalt ${isNaltOpenSaglik ? 'active' : ''}`}>
                            <a href="https://boy-kilo-endeks.vercel.app">Boy Kilo Endeksi Hesap</a>
                            <a href="https://metabolizma-hesap.vercel.app">Metobalizma Hızı Hesap</a>
                        </div>
                    </li>
                    <li>
                        <a className='mTitle' onClick={toggleNaltMatematik}>Matematik</a>
                        <div className={`mNalt ${isNaltOpenMatematik ? 'active' : ''}`}>
                            <a href="https://alan-hesaplama-omega.vercel.app">Alan Hesaplama</a>
                            <a href="https://hacim-hesap.vercel.app/">Hacim Hesaplama</a>
                        </div>
                    </li>
                </div>
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
                    <span><MdOutlineWbSunny/></span>
                    <span><FaMoon/></span>
                </label>
            </div>
        </div>
    )
}

export default Navbar;
