// src/components/Header.jsx
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Switch } from '@mui/material';
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp';
import Brightness3SharpIcon from '@mui/icons-material/Brightness3Sharp';
import '../styles/components/header.scss';

const Header = () => {
  const { isDarkMode, toggleMode } = useAppContext(); //Estado y la función del contexto

  return (
    <header className={`header ${isDarkMode ? 'dark' : 'light'}`}>
      <h1 className="title">NewsApp</h1>{' '}
      <div className="mode-toggle">
        <Switch
          checked={isDarkMode}
          onChange={toggleMode}
          inputProps={{ 'aria-label': 'toggle dark mode' }}
        />
        {/* Muestra el ícono correspondiente según el estado */}
        {isDarkMode ? (
          <Brightness3SharpIcon fontSize="small" />
        ) : (
          <WbSunnySharpIcon fontSize="small" />
        )}
      </div>
    </header>
  );
};

export default Header;
