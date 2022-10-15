import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Wrapper from './Wrapper';
import { Titles } from '../constants/Titles';
import { Button, Container, SimpleGrid, Stack } from '@mantine/core';
import GenresList from '../components/GenresList';
import { MovieCard } from '../components/Home';
import { Genres } from '../constants/Genres';

const Category = (): JSX.Element => {
  const [data, setData] = useState<Titles>({
    page: '',
    entries: 0,
    results: [],
    next: ''
  });
  const [genresData, setGenresData] = useState<Genres>();
  const [page, setPage] = useState(1);
  const [previousUrl, setPreviousUrl] = useState('');
  const { title } = useParams();
  const [searchParams] = useSearchParams();
  const list = searchParams.get('list');
  const genre = searchParams.get('genre');

  const headerOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4oMcDEyGMDmshx6PYmJkcJYSgoOhp198V0UjsnI7mPJqb4n5r8',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };
  /**
   * fetch category data
   * @param pageNumber
   */
  const fetchCategoryData = async (pageNumber: number): Promise<void> => {
    let filters = '';
    if (Boolean(list) && list !== 'undefined') {
      filters += `&list=${String(list) ?? ''}`;
    }

    if (Boolean(genre) && genre !== 'undefined') {
      filters += `&genre=${String(genre) ?? ''}`;
    }

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await fetch(`https://moviesdatabase.p.rapidapi.com/titles/?titleType=${title}&info=mini_info&limit=10&page=${pageNumber}${filters}`, headerOptions)
      .then(async response => await response.json())
      .then((response: Titles) => {
        setData({
          entries: response.entries,
          next: response.next,
          page: response.page,
          results: window.location.href !== previousUrl ? response.results : [...data.results, ...response.results]
        });
        setPreviousUrl(window.location.href);
      })
      .catch(err => console.error(err));
  };

  console.log(data);
  /**
   * fetch genres
   */
  const fetchGenres = (): void => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fetch('https://moviesdatabase.p.rapidapi.com/titles/utils/genres', headerOptions)
      .then(async response => await response.json())
      .then(response => setGenresData(response))
      .catch(err => console.error(err));
  };

  /**
   * increase page count
   */
  const increasePageCount = (): void => {
    setPage(page + 1);
  };

  useEffect(() => {
    const unsub = (): void => fetchGenres();

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    void fetchCategoryData(page);
  }, [genre, page, list]);

  return (
    <Wrapper>
      <Container fluid py="lg">
        <Stack spacing="lg">
          <GenresList genres={genresData} handleReset={() => {
            setData({
              page: '',
              entries: 0,
              results: [],
              next: ''
            });
          }}/>
          <SimpleGrid cols={5}>
            {Boolean(data?.results) &&
              data?.results.map((d) =>
                <MovieCard data={d} height={300} key={d.id}/>
              )
            }
          </SimpleGrid>
          <Button size="md" variant="outline" onClick={increasePageCount}>Load more</Button>
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default Category;
