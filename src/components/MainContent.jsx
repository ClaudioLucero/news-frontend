// src/components/MainContent.jsx
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import NewsList from './NewsList';
import NewsForm from './NewsForm';
import Loader from './Loader';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import Pagination from './Pagination';
import FilterBar from './FilterBar'; // Importa el nuevo componente
import '../styles/components/mainContent.scss';

const MainContent = () => {
  const { isDarkMode, loading } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNews(null);
  };

  return (
    <div
      role="main"
      className={`main-content ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
    >
      {/* Barra de filtros */}
      <FilterBar />

      {/* Loader */}
      {loading && <Loader />}
      {/* Lista de Noticias */}
      <NewsList setEditingNews={setEditingNews} openModal={openModal} />

      {/* Paginador */}
      <Pagination />

      {/* Botón flotante */}
      <button
        className="add-news-button"
        onClick={() => {
          setEditingNews({});
          openModal();
        }}
      >
        <AddCircleSharpIcon style={{ fontSize: '40px' }} />
      </button>

      {isModalOpen && (
        <NewsForm initialData={editingNews || {}} onClose={closeModal} />
      )}
    </div>
  );
};

export default MainContent;
