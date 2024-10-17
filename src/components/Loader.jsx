// src/components/Loader.jsx
import React from 'react';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import '../styles/components/loader.scss'; // Asegúrate de importar el archivo SCSS

const Loader = () => {
    return (
        <div className="loader-overlay">
            <div className="loader">
                <HourglassBottomIcon fontSize="large" />
            </div>
        </div>
    );
};

export default Loader;
