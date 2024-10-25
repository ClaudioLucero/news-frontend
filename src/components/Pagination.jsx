// src/components/Pagination.jsx
import React from 'react';
import { useAppContext } from '../context/AppContext';
import '../styles/components/pagination.scss';

const Pagination = () => {
    const { totalPages, currentPage, fetchNews, isDarkMode } = useAppContext();

    const handlePageChange = (page) => {
        fetchNews(page);
    };

    if (totalPages <= 1) return null;

    return (
        <div className={`pagination ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            {currentPage > 1 && (
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Anterior
                </button>
            )}
            <span>
                Página {currentPage} de {totalPages}
            </span>
            {currentPage < totalPages && (
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Siguiente
                </button>
            )}
        </div>
    );
};

export default Pagination;
