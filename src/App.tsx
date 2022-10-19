import React, { useState } from 'react';
import './App.css';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import Router from './routes';
import { HashRouter } from 'react-router-dom';
import RouteTransition from './components/RouteTransition';
import { ModalsProvider } from '@mantine/modals';
import VideoModal from './components/VideoModal';
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider } from 'react-photo-view';
import { useColorScheme } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';

const App = (): JSX.Element => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme): void =>
    setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <HashRouter basename='/'>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            withNormalizeCSS
            withGlobalStyles
            theme={{
              colorScheme,
              primaryColor: 'dark'
            }}
          >
            <ModalsProvider modals={{ videoModal: VideoModal }}>
              <NotificationsProvider position="top-center">
                <PhotoProvider>
                  <RouteTransition>
                    <Router/>
                  </RouteTransition>
                </PhotoProvider>
              </NotificationsProvider>
            </ModalsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryParamProvider>
    </HashRouter>
  );
};

export default App;
