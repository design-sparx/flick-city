import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { CategoryPage, HomePage, ListPage, MovieTitlePage, SearchPage } from './pages';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <Routes>
          <Route path="">
            <Route path='/' element={<HomePage/>}/>
            <Route path=":title" element={<CategoryPage/>}/>
          </Route>
          <Route path="lists/:listType" element={<ListPage/>}/>
          <Route path="titles/:id" element={<MovieTitlePage/>}/>
          <Route path="search">
            <Route path=":query" element={<SearchPage/>}/>
          </Route>
        </Routes>
      </MantineProvider>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

export default App;
