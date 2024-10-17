import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Card from './Card'; // Importa el componente Card
import '../styles/components/newsList.scss'; // Asegúrate de crear e importar estilos para NewsList

const NewsList = () => {
  const { news, fetchNews, loading, error } = useAppContext(); // Desestructura loading y error

  useEffect(() => {
    fetchNews(); // Llama a la función para obtener las noticias al montar el componente
  }, [fetchNews]);

  if (loading) return <p>Loading...</p>; // Mensaje mientras se carga
  if (error) return <p>{error}</p>; // Mensaje de error si ocurre un problema

  return (
    <div className="news-list">
      {news.length === 0 ? (
        <p>No hay noticias disponibles.</p> // Mensaje si no hay noticias
      ) : (
        news.map((item) => (
          <Card key={item.title} newsItem={item} /> // Llama al componente Card
        ))
      )}
    </div>
  );
};

export default NewsList;
