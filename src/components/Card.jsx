import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../context/AppContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NewsForm from './NewsForm';
import ConfirmationDialog from './ConfirmationDialog';
import '../styles/components/card.scss';

const Card = ({ newsItem }) => {
  const { isDarkMode, deleteNews } = useAppContext(); // Obtiene el estado del contexto
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar la edición
  const [openDialog, setOpenDialog] = useState(false); // Estado para abrir/cerrar el diálogo
  const [dialogAction, setDialogAction] = useState(null); // Estado para determinar la acción (editar/eliminar)

  const handleEdit = () => {
    setDialogAction('edit');
    setOpenDialog(true); // Abre el diálogo de confirmación
  };

  const handleDelete = () => {
    setDialogAction('delete');
    setOpenDialog(true); // Abre el diálogo de confirmación
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Cierra el diálogo sin hacer nada
  };

  const handleConfirmDialog = async () => {
    if (dialogAction === 'delete') {
      await deleteNews(newsItem._id); // Llama a deleteNews con el id de la noticia
    } else if (dialogAction === 'edit') {
      setIsEditing(true); // Abre el formulario de edición
    }
    setOpenDialog(false); // Cierra el diálogo después de la acción
  };

  return (
    <>
      <div className={`card ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="image-container">
          {newsItem.imageUrl ? (
            <img src={newsItem.imageUrl} alt={newsItem.title} loading="lazy" />
          ) : (
            <img src="/image-news.png" alt="Default News" /> // Imagen por defecto
          )}
        </div>
        <div className="info">
          <div className="category-author">
            <span className="category">{newsItem.category}</span>
            <p className="date">
              {new Date(newsItem.date).toLocaleDateString()}
            </p>
          </div>
          <h2 className="title">{newsItem.title}</h2>
          <p className="description">{newsItem.description}</p>
          <span className="author">{newsItem.author}</span>

          {/* Íconos de Editar y Eliminar */}
          <div className="card-actions">
            <EditIcon
              data-testid="EditIcon"
              onClick={handleEdit}
              style={{ cursor: 'pointer', marginRight: '10px' }}
            />
            <DeleteIcon data-testid="DeleteIcon" onClick={handleDelete} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </div>

      {/* Dialogo de confirmación */}
      <ConfirmationDialog
        open={openDialog}
        title={
          dialogAction === 'delete'
            ? '¿Está seguro de que desea eliminar esta noticia?'
            : '¿Está seguro de que desea editar esta noticia?'
        }
        description={
          dialogAction === 'delete'
            ? 'Esta acción no se puede deshacer.'
            : 'Se abrirá el formulario para editar la noticia.'
        }
        confirmText={dialogAction === 'delete' ? 'Eliminar' : 'Editar'}
        cancelText="Cancelar"
        onConfirm={handleConfirmDialog}
        onCancel={handleCloseDialog}
      />

      {/* Renderiza el formulario si se está editando */}
      {isEditing && (
        <NewsForm initialData={newsItem} onClose={() => setIsEditing(false)} />
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
