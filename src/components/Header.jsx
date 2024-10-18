// src/components/Header.jsx
import React from 'react';
import { useAppContext } from '../context/AppContext'; // Importa el contexto
import { Switch } from '@mui/material'; // Importa el componente Switch de Material-UI
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp'; // Ícono para modo diurno
import Brightness3SharpIcon from '@mui/icons-material/Brightness3Sharp'; // Ícono para modo nocturno
import '../styles/components/header.scss';

const Header = () => {
  const { isDarkMode, toggleMode } = useAppContext(); // Obtén el estado y la función del contexto

  return (
    <header className={`header ${isDarkMode ? 'dark' : 'light'}`}>
      <h1 className="title">NewsApp</h1> {/* El título ahora está alineado a la izquierda */}
      <div className="mode-toggle">
        <Switch
          checked={isDarkMode}
          onChange={toggleMode}
          inputProps={{ 'aria-label': 'toggle dark mode' }} // Asegúrate de incluir accesibilidad
        />
        {/* Muestra el ícono correspondiente según el estado */}
        {isDarkMode ? (
          <Brightness3SharpIcon fontSize="small" /> // Ícono para modo nocturno
        ) : (
          <WbSunnySharpIcon fontSize="small" /> // Ícono para modo diurno
        )}
      </div>
    </header>
  );
};

export default Header;
