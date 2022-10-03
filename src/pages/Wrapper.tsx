import React, { useEffect, useState } from 'react';
import { Genres } from '../constants/Genres';
import AppBar from '../components/AppBar';

interface WrapperProps {
  children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps): JSX.Element => {
  const [genres, setGenres] = useState<Genres>();

  const headerOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4oMcDEyGMDmshx6PYmJkcJYSgoOhp198V0UjsnI7mPJqb4n5r8',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  /**
   * fetch genres
   */
  const fetchGenres = (): void => {
    fetch('https://moviesdatabase.p.rapidapi.com/titles/utils/genres', headerOptions)
      .then(async response => await response.json())
      .then(response => setGenres(response))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <>
      <AppBar links={genres}/>
      {children}
    </>);
};

export default Wrapper;
