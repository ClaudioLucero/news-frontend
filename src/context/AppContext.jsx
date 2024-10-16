// src/context/AppContext.jsx
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes

// Crea el contexto
const AppContext = createContext();

// Crea un proveedor de contexto
export const AppProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false); // Estado para el modo

    const toggleMode = () => {
        setIsDarkMode((prevMode) => !prevMode); // Función para alternar el modo
    };

    return (
        <AppContext.Provider value={{ isDarkMode, toggleMode }}>
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
