// src/components/FilterBar.jsx
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import '../styles/components/filterBar.scss';

const FilterBar = () => {
  const { fetchNews, currentPage, setSortOrder, sortOrder, isDarkMode } =
    useAppContext();

  const categories = process.env.REACT_APP_NEWS_CATEGORIES.split(',');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchNews(currentPage, 10, sortOrder, selectedCategory);
  }, [selectedCategory, sortOrder, currentPage, fetchNews]);

  // Función para limpiar los filtros
  const clearFilters = () => {
    setSelectedCategory('');
    setSortOrder('date_desc'); // Valor por defecto (p.ej., "Más Nuevos")
  };

  return (
    <div className={`filter-bar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="filter-bar-item">
        <FilterAltIcon />
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="filter-bar-item">
        <span>Ordenar:</span>
        <button
          onClick={() => setSortOrder('date_desc')}
          className={`sort-button ${sortOrder === 'date_desc' ? 'active' : ''}`}
        >
          Más Nuevos
        </button>
        <button
          onClick={() => setSortOrder('date_asc')}
          className={`sort-button ${sortOrder === 'date_asc' ? 'active' : ''}`}
        >
          Más Viejos
        </button>
      </div>

      {/* Botón para limpiar filtros */}
      <div className="filter-bar-item">
        <button className="clear-filters-button" aria-label="Limpiar filtros" onClick={clearFilters}>
          <FilterAltOffIcon style={{ marginRight: '5px' }} />
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
