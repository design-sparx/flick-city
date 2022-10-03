import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { HomePage } from './pages';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  );
};

export default App;
