import React from 'react';
import { useAppContext } from '../context/AppContext';
import NewsList from './NewsList';
import '../styles/components/mainContent.scss';

const MainContent = () => {
  const { isDarkMode } = useAppContext();

  return (
    <div className={`main-content ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <NewsList /> {/* NewsList se encarga de traer los datos */}
    </div>
  );
};

export default MainContent;
