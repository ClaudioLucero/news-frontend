import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import '../styles/components/pagination.scss';

const Pagination = () => {
  const { totalPages, currentPage, fetchNews, isDarkMode, setCurrentPage, loading } = useAppContext();

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Asegúrate de que la página esté dentro del rango
    setCurrentPage(page);
    fetchNews(page); // Traer la nueva página
  };

  // Llamar a fetchNews cuando cambia currentPage
  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage, fetchNews]);

  if (totalPages <= 1) return null; // Si solo hay una página, no mostrar el paginador

  return (
    <div className={`pagination ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {currentPage > 1 && (
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={loading}
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
          disabled={loading}
        >
          Siguiente
        </button>
      )}
    </div>
  );
};

export default Pagination;
