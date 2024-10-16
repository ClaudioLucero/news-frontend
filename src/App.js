// src/App.js
import React from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header'; // Importar Header

function App() {
  return (
    <AppProvider>
      <div>
        <Header /> {/* Renderizar el Header */}
        <h1>Mi Aplicación React</h1>
      </div>
    </AppProvider>
  );
}

export default App;
