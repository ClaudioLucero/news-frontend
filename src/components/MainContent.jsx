// src/components/MainContent.jsx
import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import '../styles/components/mainContent.scss'; // Asegúrate de importar los estilos

const MainContent = () => {
    const { isDarkMode, news, fetchNews } = useAppContext(); // Obtiene el estado del contexto

    useEffect(() => {
        fetchNews(); // Llama a la función para obtener las noticias al montar el componente
    }, [fetchNews]);

    return (
        <div className={`main-content ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            {news.map((item) => (
                <div key={item.title} className="news-item">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <p>{item.category}</p>
                    <p>{item.author}</p>
                    <img src={item.imageUrl} alt={item.title} />
                    <p>{new Date(item.date).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default MainContent;
