// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SnackbarNotification from '../components/SnackbarNotification';

// Crear el contexto de la aplicación
const AppContext = createContext();
const API = process.env.REACT_APP_API_NEWS;


export const AppProvider = ({ children }) => {
  // Estado para el modo oscuro
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Estado para almacenar las noticias
  const [news, setNews] = useState([]);
  // Estado para manejar la carga de datos
  const [loading, setLoading] = useState(false);
  // Estado para manejar errores
  const [error, setError] = useState(null);

  // Estado para el Snackbar que muestra mensajes al usuario
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Función para mostrar el Snackbar
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // Función para cerrar el Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Función para alternar el modo oscuro
  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Función para obtener noticias
  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API}/news`);
      const data = response.data;

      // Verificar si los datos son un array
      if (Array.isArray(data)) {
        setNews(data);
        // Mostrar un mensaje según el número de noticias
        showSnackbar(data.length === 0 ? 'No hay noticias para mostrar' : 'Noticias obtenidas exitosamente');
      } else {
        setError('Formato de datos inesperado');
        showSnackbar('Formato de datos inesperado', 'error');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error fetching news';
      setError(errorMessage);
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para añadir una noticia
  const addNews = async (newNews) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API}/news`, newNews);
      setNews((prevNews) => [...prevNews, response.data]); // Añadir la nueva noticia al estado
      showSnackbar('Noticia guardada exitosamente');
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding news';
      setError(errorMessage);
      showSnackbar(errorMessage, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función para editar una noticia existente
  const editNews = async (id, updatedNews) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API}/news/${id}`, updatedNews);
      setNews((prevNews) =>
        prevNews.map((newsItem) =>
          newsItem._id === id ? { ...newsItem, ...response.data } : newsItem
        )
      );
      showSnackbar('Noticia editada exitosamente');
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error updating news';
      setError(errorMessage);
      showSnackbar(errorMessage, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar una noticia
  const deleteNews = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API}/news/${id}`);
      setNews((prevNews) => prevNews.filter((newsItem) => newsItem._id !== id));
      showSnackbar('Noticia eliminada exitosamente');
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error deleting news';
      setError(errorMessage);
      showSnackbar(errorMessage, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleMode,
        news,
        fetchNews,
        addNews,
        editNews,
        deleteNews,
        loading,
        error,
      }}
    >
      {children}
      <SnackbarNotification
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </AppContext.Provider>
  );
};

// Validar las propiedades del proveedor
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook para usar el contexto en otros componentes
export const useAppContext = () => useContext(AppContext);
