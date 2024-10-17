// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'; // Importa Axios

// Crea el contexto
const AppContext = createContext();
const API = process.env.REACT_APP_API_NEWS;
console.log(API);
// Crea un proveedor de contexto
export const AppProvider = ({ children }) => {
  console.log(`${API}/news`);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para alternar el modo oscuro
  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Función para obtener noticias
  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null); // Reinicia el error en cada llamada

    try {
      const response = await axios.get(`${API}/news`);
      const data = response.data;
      if (Array.isArray(data)) {
        setNews(data);
      } else {
        setError('Unexpected data format'); // O cualquier otro manejo de error que consideres necesario
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error fetching news'; // Usa el mensaje de error del servidor si está disponible
      setError(errorMessage);
      console.error('Error fetching news:', error);
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
      setNews((prevNews) => [...prevNews, response.data]); // Añade la nueva noticia al estado
      setLoading(false); // Finaliza el estado de carga
      return true; // Devuelve true si se creó correctamente
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding news';
      setError(errorMessage);
      setLoading(false);
      console.error('Error adding news:', error);
      return false; // Devuelve false si hubo un error
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
      setLoading(false);
      return true; // Devuelve true si se actualizó correctamente
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error updating news';
      setError(errorMessage);
      setLoading(false);
      console.error('Error updating news:', error);
      return false; // Devuelve false si hubo un error
    }
  };

  // Función para eliminar noticia
  const deleteNews = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API}/news/${id}`);
      setNews((prevNews) => prevNews.filter((newsItem) => newsItem._id !== id));
      setLoading(false);
      return true; // Devuelve true si se eliminó correctamente
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error deleting news';
      setError(errorMessage);
      setLoading(false);
      console.error('Error deleting news:', error);
      return false; // Devuelve false si hubo un error
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
