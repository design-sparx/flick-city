import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ActorPage, CategoryPage, Home404Page, HomePage, MovieTitlePage, SearchPage, UpcomingPage } from '../pages';

const Router = (): JSX.Element => {
  return useRoutes([
    {
      path: '/',
      errorElement: <Home404Page/>,
      children: [
        {
          path: '',
          element: <HomePage/>
        },
        {
          path: ':title',
          element: <CategoryPage/>
        }
      ]
    },
    {
      path: 'lists',
      errorElement: <Home404Page/>,
      children: [{
        path: ':listType',
        element: <CategoryPage/>
      }]
    },
    {
      path: 'titles',
      errorElement: <Home404Page/>,
      children: [{
        path: ':id',
        element: <MovieTitlePage/>
      }]
    },
    {
      path: 'search',
      errorElement: <Home404Page/>,
      children: [{
        path: ':query',
        element: <SearchPage/>
      }]
    },
    {
      path: 'actor',
      errorElement: <Home404Page/>,
      children: [{
        path: ':actorId',
        element: <ActorPage/>
      }]
    },
    {
      path: 'upcoming',
      errorElement: <Home404Page/>,
      children: [
        {
          path: '',
          element: <UpcomingPage/>
        },
        {
          path: ':listType',
          element: <UpcomingPage/>
        }
      ]
    }
  ]) as JSX.Element;
};

export default Router;
