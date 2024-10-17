// src/components/MainContent.jsx
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import NewsList from './NewsList';
import NewsForm from './NewsForm'; // Importamos el formulario
import '../styles/components/mainContent.scss';

const MainContent = () => {
  const { isDarkMode } = useAppContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null); // Para manejar la noticia que se edita

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNews(null); // Limpiamos el estado de edición al cerrar
  };

  const handleAddOrEditNews = (newData) => {
    // Aquí puedes manejar la lógica para agregar o editar las noticias en el contexto
    if (editingNews) {
      // Lógica para editar noticia
      console.log("Editar noticia:", newData);
    } else {
      // Lógica para agregar noticia
      console.log("Agregar nueva noticia:", newData);
    }
  };

  return (
    <div className={`main-content ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <NewsList setEditingNews={setEditingNews} openModal={openModal} />

      <button className="add-news-button" onClick={() => {
        setEditingNews({}); // Pasamos un objeto vacío para nueva noticia
        openModal();
      }}>
        Agregar Noticia
      </button>

      {isModalOpen && (
        <NewsForm
          initialData={editingNews || {}} // Pasa un objeto vacío si no hay noticia para editar
          onSubmit={handleAddOrEditNews}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default MainContent;
