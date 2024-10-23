// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SnackbarNotification from '../components/SnackbarNotification';

// Crear el contexto de la aplicación
const AppContext = createContext();
const API = process.env.REACT_APP_API_NEWS;
const API_KEY = process.env.REACT_APP_API_KEY;

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Función para obtener noticias
  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API}/news`, {
        headers: {
          'x-api-key': API_KEY // Incluir la API Key en el header
        }
      });
      const data = response.data;

      if (Array.isArray(data)) {
        setNews(data);
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

  const addNews = async (newNews) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API}/news`, newNews, {
        headers: {
          'x-api-key': API_KEY // Incluir la API Key en el header
        }
      });
      setNews((prevNews) => [...prevNews, response.data]);
      showSnackbar('Noticia guardada exitosamente');
      return true;
    } catch (error) {
      showSnackbar('Error al agregar noticia', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editNews = async (id, updatedNews) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API}/news/${id}`, updatedNews, {
        headers: {
          'x-api-key': API_KEY // Incluir la API Key en el header
        }
      });
      setNews((prevNews) =>
        prevNews.map((newsItem) =>
          newsItem._id === id ? { ...newsItem, ...response.data } : newsItem
        )
      );
      showSnackbar('Noticia editada exitosamente');
      return true;
    } catch (error) {
      showSnackbar('Error al editar noticia', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API}/news/${id}`, {
        headers: {
          'x-api-key': API_KEY // Incluir la API Key en el header
        }
      });
      setNews((prevNews) => prevNews.filter((newsItem) => newsItem._id !== id));
      showSnackbar('Noticia eliminada exitosamente');
    } catch (error) {
      showSnackbar('Error al eliminar noticia', 'error');
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

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAppContext = () => useContext(AppContext);
