// src/components/MainContent.jsx
import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import NewsList from './NewsList';
import '../styles/components/mainContent.scss';

const MainContent = () => {
  const { isDarkMode, news, fetchNews } = useAppContext();

  useEffect(() => {
    fetchNews(); // Llama a la función para obtener las noticias al montar el componente
  }, [fetchNews]); // Ahora fetchNews está memorizado y no causará un bucle infinito

  return (
    <div className={`main-content ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <NewsList news={news} />
    </div>
  );
};

export default MainContent;
