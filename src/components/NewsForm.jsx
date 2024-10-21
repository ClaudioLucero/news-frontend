import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/newsForm.scss';
import Loader from './Loader';
import { useAppContext } from '../context/AppContext';
import CloseIcon from '@mui/icons-material/Close';

const MAX_DESCRIPTION_LENGTH = 100; // Definir la longitud máxima de la descripción

const NewsForm = ({ initialData = {}, onClose }) => {
  const { isDarkMode, addNews, editNews, loading } = useAppContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    author: '',
    imageUrl: ''
  });

  const categories = process.env.REACT_APP_NEWS_CATEGORIES.split(','); // Obtener las categorías del .env
  const formRef = useRef(null);

  // Cargar los datos iniciales si los hay (para editar)
  useEffect(() => {
    if (initialData && initialData._id) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || '',
        author: initialData.author || '',
        imageUrl: initialData.imageUrl || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: '',
        author: '',
        imageUrl: ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'description' && value.length > MAX_DESCRIPTION_LENGTH) {
      // Limitar la longitud de la descripción
      return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData._id) {
        // Si hay un ID, es una edición
        const success = await editNews(initialData._id, formData);
        if (success) {
          onClose(); // Cerrar el formulario después de editar
        }
      } else {
        // Si no hay ID, es una nueva noticia
        const success = await addNews(formData);
        if (success) {
          onClose(); // Cerrar el formulario después de agregar
        }
      }
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  const handleOutsideClick = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className={`modal-overlay ${isDarkMode ? 'dark' : 'light'}`}
      onClick={handleOutsideClick}
    >
      {loading && <Loader />}
      <div className={`news-form-modal ${isDarkMode ? 'dark' : 'light'}`}>
        <form className="news-form" onSubmit={handleSubmit} ref={formRef}>
          <CloseIcon
            className="close-icon"
            onClick={onClose}
            style={{
              cursor: 'pointer',
              position: 'absolute',
              right: '10px',
              top: '10px'
            }}
          />
          <h2>{initialData._id ? 'Editar Noticia' : 'Agregar Noticia'}</h2>

          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            maxLength={MAX_DESCRIPTION_LENGTH} // Limitar longitud
          />
          <div className="limit-description">
            {`${formData.description.length}/${MAX_DESCRIPTION_LENGTH} caracteres`}
          </div>

          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label htmlFor="author">Autor:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />

          <label htmlFor="imageUrl">URL de Imagen:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {initialData._id ? 'Guardar Cambios' : 'Agregar Noticia'}
          </button>
        </form>
      </div>
    </div>
  );
};

NewsForm.propTypes = {
  initialData: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    author: PropTypes.string,
    imageUrl: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired
};

export default NewsForm;
