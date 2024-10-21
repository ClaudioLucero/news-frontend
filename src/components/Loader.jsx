import React from 'react';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

import '..//styles/components/loader.scss';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader">
        <HourglassBottomIcon color="inherit" size={100} />
      </div>
    </div>
  );
};

export default Loader;
