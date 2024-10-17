// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// Crea el contexto
const AppContext = createContext();

// Crea un proveedor de contexto
export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [news, setNews] = useState([]);

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const fetchNews = useCallback(async () => {
    try {
      // Aquí puedes hacer la llamada a tu API para obtener las noticias
      const hardcodedNews = [
        {
          title: 'Título de noticia 1',
          description: 'Descripción de la noticia 1.',
          category: 'Deportes',
          author: 'Autor 1',
          imageUrl: '',
          date: '2024-10-14T21:08:09.919Z'
        },
        {
          title: 'Título de noticia 2',
          description: 'Descripción de la noticia 2.',
          category: 'Tecnología',
          author: 'Autor 2',
          imageUrl:
            'https://t4.ftcdn.net/jpg/02/09/53/11/360_F_209531103_vL5MaF5fWcdpVcXk5yREBk3KMcXE0X7m.jpg',
          date: '2024-10-15T21:08:09.919Z'
        },
        {
          title: 'Título de noticia 3',
          description: 'Descripción de la noticia 3.',
          category: 'Salud',
          author: 'Autor 3',
          imageUrl:
            'https://t4.ftcdn.net/jpg/02/09/53/11/360_F_209531103_vL5MaF5fWcdpVcXk5yREBk3KMcXE0X7m.jpg',
          date: '2024-10-16T21:08:09.919Z'
        }
      ];

      setNews(hardcodedNews);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }, []);

  // Función para añadir noticia
  const addNews = (newNews) => {
    setNews((prevNews) => [...prevNews, newNews]);
  };

  // Función para editar noticia
  const editNews = (updatedNews) => {
    setNews((prevNews) =>
      prevNews.map((newsItem) =>
        newsItem.title === updatedNews.title ? updatedNews : newsItem
      )
    );
  };

  return (
    <AppContext.Provider
      value={{ isDarkMode, toggleMode, news, fetchNews, addNews, editNews }}
    >
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
