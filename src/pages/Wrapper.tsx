import { MantineProvider } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import AppBar from '../components/AppBar';
import AppFooter from '../components/AppFooter';
import { NavLinks } from '../data/NavLinks';

interface WrapperProps {
  children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps): JSX.Element => {
  const [primaryColor, setPrimaryColor] = useState(localStorage.getItem('preferred-color') ?? 'blue');

  useEffect(() => {
    localStorage.setItem('preferred-color', primaryColor);
  }, [primaryColor]);

  return (
    <>
      <MantineProvider inherit theme={{ primaryColor }}>
        <AppBar
          links={NavLinks.links}
          onChange={setPrimaryColor}
          value={primaryColor}
        />
        {children}
        <AppFooter/>
      </MantineProvider>
    </>
  );
};

export default Wrapper;
