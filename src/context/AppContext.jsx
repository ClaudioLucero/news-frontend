import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Snackbar } from '@mui/material'; // Asegúrate de importar desde @mui/material

// Crea el contexto
const AppContext = createContext();
const API = process.env.REACT_APP_API_NEWS;

// Crea un proveedor de contexto
export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estado para manejar el Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
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
      if (Array.isArray(data)) {
        setNews(data);
        showSnackbar('Noticias obtenidas exitosamente');
      } else {
        setError('Unexpected data format');
        showSnackbar('Formato de datos inesperado', 'error');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error fetching news';
      setError(errorMessage);
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para añadir noticia
  const addNews = async (newNews) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API}/news`, newNews);
      setNews((prevNews) => [...prevNews, response.data]);
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

  // Función para editar noticia
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
      const errorMessage =
        error.response?.data?.message || 'Error updating news';
      setError(errorMessage);
      showSnackbar(errorMessage, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar noticia
  const deleteNews = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API}/news/${id}`);
      setNews((prevNews) => prevNews.filter((newsItem) => newsItem._id !== id));
      showSnackbar('Noticia eliminada exitosamente');
      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error deleting news';
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
        error
      }}
    >
      {children}

      {/* Renderiza el Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity} // Esto necesita ser estilizado por Material UI
      />
    </AppContext.Provider>
  );
};

// Valida las props con PropTypes
AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Crea un hook para usar el contexto
export const useAppContext = () => {
  return useContext(AppContext);
};
