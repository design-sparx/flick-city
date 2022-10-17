import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import Wrapper from './Wrapper';
import { Titles } from '../constants/Titles';
import { Button, Container, Group, SimpleGrid, Stack } from '@mantine/core';
import GenresList from '../components/GenresList';
import { MovieCard } from '../components/Home';
import { Genres } from '../constants/Genres';
import { Helmet } from 'react-helmet';
import BackBtn from '../components/BackBtn';
import { BsChevronDown } from 'react-icons/bs';
import ClearFiltersBtn from '../components/ClearFiltersBtn';
import NoData from '../components/NoData';

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
  const [isGenresLoading, setIsGenresLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const { title } = useParams();
  const [searchParams] = useSearchParams();
  const list = searchParams.get('list');
  const genre = searchParams.get('genre');
  const location = useLocation();

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
    setIsDataLoading(true);
    let filters = '';
    if (Boolean(list) && list !== 'undefined') {
      filters += `&list=${String(list) ?? ''}`;
    }

    if (Boolean(genre) && genre !== 'undefined') {
      filters += `&genre=${String(genre) ?? ''}`;
    }

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await fetch(`https://moviesdatabase.p.rapidapi.com/titles/?titleType=${title}&info=mini_info&limit=15&page=${pageNumber}${filters}`, headerOptions)
      .then(async response => await response.json())
      .then((response: Titles) => {
        setData({
          entries: response.entries,
          next: response.next,
          page: response.page,
          results: window.location.href !== previousUrl ? response.results : [...data.results, ...response.results]
        });
        setPreviousUrl(window.location.href);
        setIsDataLoading(false);
      })
      .catch(err => console.error(err));
  };

  /**
   * fetch genres
   */
  const fetchGenres = (): void => {
    setIsGenresLoading(true);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fetch('https://moviesdatabase.p.rapidapi.com/titles/utils/genres', headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setGenresData(response);
        setIsGenresLoading(false);
      })
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
      <Helmet>
        <title>Flick city - Category - {`${title ?? ''}`}</title>
      </Helmet>
      <Container fluid py="xl">
        <Stack spacing="xl">
          <Group>
            <BackBtn/>
            {Boolean(location.search) &&
              <ClearFiltersBtn/>
            }
          </Group>
          <GenresList genres={genresData} isLoading={isGenresLoading} handleReset={() => {
            setData({
              page: '',
              entries: 0,
              results: [],
              next: ''
            });
          }}/>
          {data.results.length > 0
            ? <>
              <SimpleGrid cols={5}>
                {Boolean(data.results) &&
                  data?.results.map((d) =>
                    <MovieCard data={d} height={300} key={d.id} isLoading={isDataLoading}/>
                  )
                }
              </SimpleGrid>
              <Button
                size="md"
                variant="subtle"
                onClick={increasePageCount}
                loading={isDataLoading} leftIcon={<BsChevronDown size={18}/>}
              >
                Load more
              </Button>
            </>
            : <NoData/>
          }
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default Category;
