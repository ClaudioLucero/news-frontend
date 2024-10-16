import React from 'react';
import { useAppContext } from '../context/AppContext';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import PropTypes from 'prop-types'; // Importa PropTypes
import '../styles/components/card.scss'; // Asegúrate de crear e importar los estilos

const Card = ({ newsItem }) => {
    const { isDarkMode } = useAppContext(); // Obtiene el estado del contexto

    return (
        <div className={`card ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="image-container">
                {newsItem.imageUrl ? (
                    <img src={newsItem.imageUrl} alt={newsItem.title} />
                ) : (
                    <ImageSearchIcon style={{ fontSize: '100px' }} /> // Icono de Material UI si no hay imagen
                )}
            </div>
            <div className="info">
                <div className="category-author">
                    <span className="category">{newsItem.category}</span>
                    <p className="date">{new Date(newsItem.date).toLocaleDateString()}</p>
                </div>
                <h2 className="title">{newsItem.title}</h2>
                <p className="description">{newsItem.description}</p>

                <span className="author">{newsItem.author}</span>
            </div>
        </div>
    );
};

// Asigna un nombre de display al componente
Card.displayName = 'Card';

// Valida las props con PropTypes
Card.propTypes = {
    newsItem: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        imageUrl: PropTypes.string, // Este puede ser opcional
        date: PropTypes.string.isRequired
    }).isRequired
};

export default Card;
