import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ActorPage, CategoryPage, HomePage, ListPage, MovieTitlePage, SearchPage } from './pages';
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
          <Route path="lists">
            <Route path=":listType" element={<ListPage/>}/>
          </Route>
          <Route path="titles/:id" element={<MovieTitlePage/>}/>
          <Route path="search">
            <Route path=":query" element={<SearchPage/>}/>
          </Route>
          <Route path='actor'>
            <Route path=":actorId" element={<ActorPage/>}/>
          </Route>
        </Routes>
      </MantineProvider>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

export default App;
