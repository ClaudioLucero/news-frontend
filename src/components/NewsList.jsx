import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Card from './Card';
import Loader from './Loader';
import '../styles/components/newsList.scss';

const NewsList = () => {
  const { news, fetchNews, loading, error, currentPage } = useAppContext();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      await fetchNews(currentPage); // Obtiene noticias para la página actual
      setHasFetched(true);
    };
    loadNews();
  }, [fetchNews, currentPage]); // Añade currentPage a la dependencia

  if (error) return <p>{error}</p>;

  return (
    <div className="news-list">
      {loading && <Loader />}
      {!loading && hasFetched && news.length === 0 ? (
        <p className="no-news-message">No hay noticias disponibles.</p>
      ) : (
        news.map((item) => <Card key={item._id} newsItem={item} />)
      )}
    </div>
  );
};

export default NewsList;
