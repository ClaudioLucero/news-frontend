import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NewsForm from './NewsForm'; // Importa el componente NewsForm
import PropTypes from 'prop-types'; // Importa PropTypes
import '../styles/components/card.scss'; // Asegúrate de crear e importar los estilos

const Card = ({ newsItem }) => {
  const { isDarkMode, deleteNews } = useAppContext(); // Obtiene el estado del contexto
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar la edición

  const handleEdit = () => {
    setIsEditing(true); // Abre el formulario de edición
  };

  const handleCloseForm = () => {
    setIsEditing(false); // Cierra el formulario
  };

  const handleDelete = async () => {
    const success = await deleteNews(newsItem._id); // Llama a deleteNews con el id de la noticia
    if (success) {
      alert('Noticia eliminada correctamente'); // Mensaje de éxito
    } else {
      alert('Error al eliminar la noticia'); // Mensaje de error
    }
  };

  return (
    <>
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

          {/* Íconos de Editar y Eliminar */}
          <div className="card-actions">
            <EditIcon onClick={handleEdit} style={{ cursor: 'pointer', marginRight: '10px' }} />
            <DeleteIcon onClick={handleDelete} style={{ cursor: 'pointer' }} /> {/* Agregar el evento onClick aquí */}
          </div>
        </div>
      </div>

      {/* Renderiza el formulario si se está editando */}
      {isEditing && (
        <NewsForm initialData={newsItem} onClose={handleCloseForm} />
      )}
    </>
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
    date: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired // Asegúrate de incluir el id de la noticia
  }).isRequired
};

export default Card;
