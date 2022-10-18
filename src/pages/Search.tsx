import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Button, Center, Container, Group, Loader, SimpleGrid, Skeleton, Stack, Text } from '@mantine/core';
import Wrapper from './Wrapper';
import { MovieCard } from '../components/Home';
import { Titles } from '../constants/Titles';
import { Genres } from '../constants/Genres';
import GenresList from '../components/GenresList';
import { Helmet } from 'react-helmet';
import BackBtn from '../components/BackBtn';
import ClearFiltersBtn from '../components/ClearFiltersBtn';
import { BsChevronDown } from 'react-icons/bs';
import NoData from '../components/NoData';

const Search = (): JSX.Element => {
  const { query } = useParams();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<Titles>({
    page: '',
    results: [],
    next: '',
    entries: 0
  });
  const [genresData, setGenresData] = useState<Genres>();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [previousUrl, setPreviousUrl] = useState('');
  const [isGenresLoading, setIsGenresLoading] = useState(false);
  const genre = searchParams.get('genre');
  const location = useLocation();
  const bottomRef = useRef<any>(null);

  const headerOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY ?? '',
      'X-RapidAPI-Host': process.env.REACT_APP_API_HOST ?? ''
    }
  };

  /**
   * fetch search data
   */
  const fetchSearchData = (pageNumber: number): void => {
    setIsLoading(true);
    let filters = '';
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    Boolean(genre) && (filters += `&genre=${genre}`);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fetch(`${process.env.REACT_APP_BASE_URL ?? ''}/titles/search/title/${query}/?info=mini_info&limit=15&page=${pageNumber}${filters}`, headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setData({
          page: response.page,
          results: window.location.href !== previousUrl ? response.results : [...data.results, ...response.results],
          next: response.next,
          entries: response.entries
        });
        setPreviousUrl(window.location.href);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };

  /**
   * fetch genres
   */
  const fetchGenres = (): void => {
    setIsGenresLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL ?? ''}/titles/utils/genres`, headerOptions)
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
    void fetchGenres();
  }, []);

  useEffect(() => {
    void fetchSearchData(page);
  }, [genre, query, page]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data]);

  return (
    <Wrapper>
      <Helmet>
        <title>Flick city - Search - {`${query ?? ''}`}</title>
      </Helmet>
      <Container fluid py="xl">
        <Stack spacing="xl">
          <Group position="apart">
            <BackBtn/>
            {Boolean(location.search) &&
              <ClearFiltersBtn/>
            }
          </Group>
          <Skeleton visible={isLoading}>
            {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
            <Text size="lg" weight={500}>Search results for: {`"${query}"`}</Text>
          </Skeleton>
          <GenresList genres={genresData} isLoading={isGenresLoading}/>
          {!isLoading
            ? (data.results.length > 0
                ? <>
                  <SimpleGrid
                    cols={5}
                    breakpoints={[
                      {
                        maxWidth: 'md',
                        cols: 2,
                        spacing: 'md'
                      },
                      {
                        maxWidth: 'sm',
                        cols: 2,
                        spacing: 'sm'
                      },
                      {
                        maxWidth: 'xs',
                        cols: 1,
                        spacing: 'sm'
                      }
                    ]}
                  >
                    {Boolean(data.results) &&
                      data?.results.map((d) =>
                        <MovieCard data={d} height={300} key={d.id} isLoading={isLoading}/>
                      )
                    }
                  </SimpleGrid>
                  <Button
                    size="md"
                    variant="light"
                    onClick={increasePageCount}
                    loading={isLoading} leftIcon={<BsChevronDown size={18}/>}
                    ref={bottomRef}
                  >
                    Load more
                  </Button>
                </>
                : <NoData/>
              )
            : <Center py="xl"><Loader size="xl"/></Center>
          }
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default Search;
