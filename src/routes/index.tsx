import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import {
  ActorPage,
  CategoryPage,
  Error404Page,
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
      path: 'titles',
      errorElement: <Error404Page/>,
      children: [
        {
          path: ':title',
          element: <Suspense fallback={<>...</>}><CategoryPage/></Suspense>
        }
      ]
    },
    {
      path: 'lists',
      errorElement: <Error404Page/>,
      children: [
        {
          path: ':listType',
          element: <Suspense fallback={<>...</>}><ListPage/></Suspense>
        },
        {
          path: '*',
          element: <Suspense fallback={<>...</>}><Error404Page/></Suspense>
        }
      ]
    },
    {
      path: 'title',
      errorElement: <Error404Page/>,
      children: [
        {
          path: ':id',
          element: <Suspense fallback={<>...</>}><MovieTitlePage/></Suspense>
        },
        {
          path: '*',
          element: <Suspense fallback={<>...</>}><Error404Page/></Suspense>
        }
      ]
    },
    {
      path: 'search',
      errorElement: <Error404Page/>,
      children: [
        {
          path: ':query',
          element: <Suspense fallback={<>...</>}><SearchPage/></Suspense>
        },
        {
          path: '*',
          element: <Suspense fallback={<>...</>}><Error404Page/></Suspense>
        }
      ]
    },
    {
      path: 'actor',
      errorElement: <Error404Page/>,
      children: [
        {
          path: ':actorId',
          element: <Suspense fallback={<>...</>}><ActorPage/></Suspense>
        },
        {
          path: '*',
          element: <Suspense fallback={<>...</>}><Error404Page/></Suspense>
        }
      ]
    },
    {
      path: 'upcoming',
      errorElement: <Error404Page/>,
      children: [
        {
          path: '',
          element: <Suspense fallback={<>...</>}><UpcomingPage/></Suspense>
        },
        {
          path: ':listType',
          element: <Suspense fallback={<>...</>}><UpcomingPage/></Suspense>
        },
        {
          path: '*',
          element: <Suspense fallback={<>...</>}><Error404Page/></Suspense>
        }
      ]
    }
  ]) as JSX.Element;
};

export default Router;
