// src/App.js
import React, { Fragment } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import MainContent from './components/MainContent';

function App() {
  return (
    <AppProvider>
      <Fragment>
        <Header />
        <MainContent />
      </Fragment>
    </AppProvider>
  );
}

export default App;
