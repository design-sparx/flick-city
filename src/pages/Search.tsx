import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Container, SimpleGrid, Stack, Text } from '@mantine/core';
import Wrapper from './Wrapper';
import { MovieCard } from '../components/Home';
import { Titles } from '../constants/Titles';
import { Genres } from '../constants/Genres';
import GenresList from '../components/GenresList';

const Search = (): JSX.Element => {
  const { query } = useParams();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<Titles>();
  const [genresData, setGenresData] = useState<Genres>();
  const genre = searchParams.get('genre');

  const headerOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4oMcDEyGMDmshx6PYmJkcJYSgoOhp198V0UjsnI7mPJqb4n5r8',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  /**
   * fetch search data
   */
  const fetchSearchData = useCallback(async (): Promise<any> => {
    let filters = '';
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    Boolean(genre) && (filters += `&genre=${genre}`);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/title/${query}/?info=custom_info&limit=20${filters}`, headerOptions)
      .then(async response => await response.json())
      .then(response => setData(response))
      .catch(err => console.error(err));
  }, [genre]);

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
    void fetchSearchData();
  }, [genre, query]);

  return (
    <Wrapper>
      <Container fluid py="lg">
        <Stack>
          {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
          <Text size='lg' weight={500}>Search results for: {`"${query}"`}</Text>
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

export default Search;
