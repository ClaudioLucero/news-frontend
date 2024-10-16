// src/components/Header.jsx
import React from 'react';
import { useAppContext } from '../context/AppContext'; // Importa el contexto
import '../styles/components/header.scss';

const Header = () => {
  const { isDarkMode, toggleMode } = useAppContext(); // Obtén el estado y la función del contexto

  return (
    <header className={`header ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>NewsApp</h1>
      <button className="mode-toggle" onClick={toggleMode}>
        {isDarkMode ? '🌙' : '☀️'}
      </button>
      <span className="mode-info">
        {isDarkMode ? 'Modo Nocturno Activado' : 'Modo Diurno Activado'}
      </span>
    </header>
  );
};

export default Header;
