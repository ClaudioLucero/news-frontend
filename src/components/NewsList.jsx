import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Card from './Card'; // Importa el componente Card
import '../styles/components/newsList.scss'; // Asegúrate de crear e importar estilos para NewsList

const NewsList = () => {
    const { news, fetchNews } = useAppContext();

    useEffect(() => {
        fetchNews(); // Llama a la función para obtener las noticias al montar el componente
    }, [fetchNews]);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>{error}</p>;

    return (
        <div className="news-list">
            {news.map((item) => (
                <Card key={item.title} newsItem={item} /> // Llama al componente Card
            ))}
        </div>
    );
};

export default NewsList;
