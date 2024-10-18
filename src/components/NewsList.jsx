// src/components/NewsList.jsx
import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Card from './Card'; // Importa el componente Card
import Loader from './Loader'; // Importa el Loader
import '../styles/components/newsList.scss'; // Asegúrate de crear e importar estilos para NewsList

const NewsList = () => {
  const { news, fetchNews, loading, error } = useAppContext(); // Desestructura loading y error

  useEffect(() => {
    fetchNews(); // Llama a la función para obtener las noticias al montar el componente
  }, [fetchNews]);

  if (error) return <p>{error}</p>; // Mensaje de error si ocurre un problema

  return (
    <div className="news-list">
      {loading && <Loader />} {/* Muestra el Loader si está cargando */}
      {news.length === 0 ? (
        <p className="no-news-message">No hay noticias disponibles.</p> // Mensaje si no hay noticias
      ) : (
        news.map((item) => (
          <Card key={item._id} newsItem={item} /> // Llama al componente Card
        ))
      )}
    </div>
  );
};

export default NewsList;
