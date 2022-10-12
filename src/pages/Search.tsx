import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, SimpleGrid, Stack, Text } from '@mantine/core';
import Wrapper from './Wrapper';
import { MovieCard } from '../components/Home';
import { Titles } from '../constants/Titles';

const Search = (): JSX.Element => {
  const { query } = useParams();
  const [data, setData] = useState<Titles>();

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
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/title/${query}/?info=custom_info&limit=20`, headerOptions)
      .then(async response => await response.json())
      .then(response => setData(response))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    void fetchSearchData();
  }, [query]);

  console.log(data);

  return (
    <Wrapper>
      <Container fluid>
        <Stack>
          {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
          <Text size='lg' weight={500}>Search results for: {`"${query}"`}</Text>
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
