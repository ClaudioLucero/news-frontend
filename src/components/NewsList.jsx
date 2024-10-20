import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Card from './Card';
import Loader from './Loader';
import '../styles/components/newsList.scss';

const NewsList = () => {
  const { news, fetchNews, loading, error } = useAppContext();
  const [hasFetched, setHasFetched] = useState(false); // Estado para verificar si las noticias han sido obtenidas

  useEffect(() => {
    const loadNews = async () => {
      await fetchNews(); // Llama a la función para obtener las noticias al montar el componente
      setHasFetched(true); // Marca que se ha intentado obtener noticias
    };
    loadNews();
  }, [fetchNews]);

  if (error) return <p>{error}</p>;
  return (
    <div className="news-list">
      {loading && <Loader />} {/* Muestra el Loader si está cargando */}
      {!loading && hasFetched && news.length === 0 ? ( // Solo muestra el mensaje si ya se han intentado obtener noticias
        <p className="no-news-message">No hay noticias disponibles.</p>
      ) : (
        news.map((item) => <Card key={item._id} newsItem={item} />)
      )}
    </div>
  );
};

export default NewsList;
