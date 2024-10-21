import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import '..//styles/components/loader.scss';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader">
        <CircularProgress color="inherit" size={100} />
      </div>
    </div>
  );
};

export default Loader;
