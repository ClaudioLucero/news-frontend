import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/newsForm.scss';
import Loader from './Loader'; // Importa el componente de carga
import { useAppContext } from '../context/AppContext';
import CloseIcon from '@mui/icons-material/Close';

const NewsForm = ({ initialData = {}, onClose }) => {
  const { isDarkMode, addNews, loading } = useAppContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    author: '',
    imageUrl: ''
  });

  const categories = process.env.REACT_APP_NEWS_CATEGORIES.split(','); // Obtener las categorías del .env
  const formRef = useRef(null);

  useEffect(() => {
    if (initialData) {
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
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addNews(formData);
    if (success) {
      onClose();
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
          <h2>{initialData.title ? 'Editar Noticia' : 'Agregar Noticia'}</h2>

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
          />

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
            {initialData.title ? 'Guardar Cambios' : 'Agregar Noticia'}
          </button>
        </form>
      </div>
    </div>
  );
};

NewsForm.propTypes = {
  initialData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    author: PropTypes.string,
    imageUrl: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default NewsForm;
