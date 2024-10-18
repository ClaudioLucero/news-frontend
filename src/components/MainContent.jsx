import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import NewsList from './NewsList';
import NewsForm from './NewsForm';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'; // Importamos el ícono
import '../styles/components/mainContent.scss';

const MainContent = () => {
  const { isDarkMode } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNews(null);
  };

  const handleAddOrEditNews = (newData) => {
    if (editingNews) {
      console.log('Editar noticia:', newData);
    } else {
      console.log('Agregar nueva noticia:', newData);
    }
  };

  return (
    <div className={`main-content ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <NewsList setEditingNews={setEditingNews} openModal={openModal} />

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
        <NewsForm
          initialData={editingNews || {}}
          onSubmit={handleAddOrEditNews}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default MainContent;
