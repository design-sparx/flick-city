import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import {
  ActorPage,
  CategoryPage,
  Home404Page,
  HomePage,
  ListPage,
  MovieTitlePage,
  SearchPage,
  UpcomingPage
} from '../pages';

interface RouterProps {
  children?: React.ReactNode
}

const Router = ({ children }: RouterProps): JSX.Element => {
  return useRoutes([
    {
      path: '/',
      errorElement: <Home404Page/>,
      children: [
        {
          path: '',
          element: <Suspense fallback={<>...</>}><HomePage/></Suspense>,
          errorElement: <Home404Page/>
        }
      ]
    },
    {
      path: 'titles',
      errorElement: <Home404Page/>,
      children: [
        {
          path: ':title',
          element: <Suspense fallback={<>...</>}><CategoryPage/></Suspense>
        }
      ]
    },
    {
      path: 'lists',
      errorElement: <Home404Page/>,
      children: [{
        path: ':listType',
        element: <Suspense fallback={<>...</>}><ListPage/></Suspense>
      }]
    },
    {
      path: 'title',
      errorElement: <Home404Page/>,
      children: [{
        path: ':id',
        element: <Suspense fallback={<>...</>}><MovieTitlePage/></Suspense>
      }]
    },
    {
      path: 'search',
      errorElement: <Home404Page/>,
      children: [{
        path: ':query',
        element: <Suspense fallback={<>...</>}><SearchPage/></Suspense>
      }]
    },
    {
      path: 'actor',
      errorElement: <Home404Page/>,
      children: [{
        path: ':actorId',
        element: <Suspense fallback={<>...</>}><ActorPage/></Suspense>
      }]
    },
    {
      path: 'upcoming',
      errorElement: <Home404Page/>,
      children: [
        {
          path: '',
          element: <Suspense fallback={<>...</>}><UpcomingPage/></Suspense>
        },
        {
          path: ':listType',
          element: <Suspense fallback={<>...</>}><UpcomingPage/></Suspense>
        }
      ]
    }
  ]) as JSX.Element;
};

export default Router;
