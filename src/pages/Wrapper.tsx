import React from 'react';
import AppBar from '../components/AppBar';
import { NavLinks } from '../data/NavLinks';

interface WrapperProps {
  children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps): JSX.Element => {
  return (
    <>
      <AppBar links={NavLinks.links}/>
      {children}
    </>
  );
};

export default Wrapper;
