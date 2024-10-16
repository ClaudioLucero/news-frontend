import React from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import Card from './Card'; // Importa el componente Card
import '../styles/components/newsList.scss'; // Asegúrate de crear e importar estilos para NewsList

const NewsList = ({ news }) => {
    return (
        <div className="news-list">
            {news.map((item) => (
                <Card key={item.title} newsItem={item} /> // Llama al componente Card
            ))}
        </div>
    );
};

// Asigna un nombre de display al componente
NewsList.displayName = 'NewsList';

// Valida las props con PropTypes
NewsList.propTypes = {
    news: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            imageUrl: PropTypes.string, // Este puede ser opcional
            date: PropTypes.string.isRequired
        })
    ).isRequired
};

export default NewsList;
