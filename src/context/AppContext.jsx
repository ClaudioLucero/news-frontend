// src/context/AppContext.jsx
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes

// Crea el contexto
const AppContext = createContext();

// Crea un proveedor de contexto
export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para el modo
  const [news, setNews] = useState([]); // Estado para almacenar las noticias

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode); // Función para alternar el modo
  };

  const fetchNews = async () => {
    try {
      // // Aquí puedes hacer la llamada a tu API para obtener las noticias
      // const response = await fetch('URL_DE_TU_API'); // Reemplaza con la URL de tu API
      // const data = await response.json();
      // setNews(data); // Establece las noticias en el estado
      const hardcodedNews = [
        {
          title: 'Título de noticia 1',
          description: 'Descripción de la noticia 1.',
          category: 'Deportes',
          author: 'Autor 1',
          imageUrl: 'http://ejemplo.com/imagen1.jpg',
          date: '2024-10-14T21:08:09.919Z'
        },
        {
          title: 'Título de noticia 2',
          description: 'Descripción de la noticia 2.',
          category: 'Tecnología',
          author: 'Autor 2',
          imageUrl: 'http://ejemplo.com/imagen2.jpg',
          date: '2024-10-15T21:08:09.919Z'
        },
        {
          title: 'Título de noticia 3',
          description: 'Descripción de la noticia 3.',
          category: 'Salud',
          author: 'Autor 3',
          imageUrl: 'http://ejemplo.com/imagen3.jpg',
          date: '2024-10-16T21:08:09.919Z'
        }
      ];

      setNews(hardcodedNews); // Establece las noticias en el estado
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  return (
    <AppContext.Provider value={{ isDarkMode, toggleMode, news, fetchNews }}>
      {children}
    </AppContext.Provider>
  );
};

// Valida las props con PropTypes
AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Crea un hook para usar el contexto
export const useAppContext = () => {
  return useContext(AppContext);
};
