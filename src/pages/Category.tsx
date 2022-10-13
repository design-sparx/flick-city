import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Wrapper from './Wrapper';
import { Titles } from '../constants/Titles';
import { Container, SimpleGrid, Stack } from '@mantine/core';
import GenresList from '../components/GenresList';
import { MovieCard } from '../components/Home';
import { Genres } from '../constants/Genres';

const Category = (): JSX.Element => {
  const [data, setData] = useState<Titles>();
  const [genresData, setGenresData] = useState<Genres>();
  const { title } = useParams();
  const [searchParams] = useSearchParams();
  const list = searchParams.get('list');

  const headerOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4oMcDEyGMDmshx6PYmJkcJYSgoOhp198V0UjsnI7mPJqb4n5r8',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };
  /**
   * fetch category data
   */
  const fetchCategoryData = useCallback(async (): Promise<any> => {
    let filters = '';
    if (Boolean(list) && list !== 'undefined') {
      filters += `&list=${list ?? ''}`;
    }

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await fetch(`https://moviesdatabase.p.rapidapi.com/titles/?titleType=${title}&info=mini_info&limit=20${filters}`, headerOptions)
      .then(async response => await response.json())
      .then(response => setData(response))
      .catch(err => console.error(err));
  }, [list]);

  /**
   * fetch genres
   */
  const fetchGenres = useCallback(async (): Promise<any> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await fetch('https://moviesdatabase.p.rapidapi.com/titles/utils/genres', headerOptions)
      .then(async response => await response.json())
      .then(response => setGenresData(response))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    void fetchGenres();
  }, []);

  useEffect(() => {
    void fetchCategoryData();
  }, [list, title]);

  return (
    <Wrapper>
      <Container fluid py="lg">
        <Stack>
          <GenresList genres={genresData}/>
          <SimpleGrid cols={5}>
            {data?.results.map((d) =>
              <MovieCard data={d} height={300} key={d.id}/>
            )}
          </SimpleGrid>
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default Category;
