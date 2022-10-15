import React from 'react';
import './App.css';
import { MantineProvider } from '@mantine/core';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <MantineProvider withNormalizeCSS withGlobalStyles>
          <Router />
        </MantineProvider>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

export default App;
