import React, { useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import { Titles } from '../constants/Titles';
import { Button, Container, SimpleGrid, Skeleton, Stack, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { MovieCard } from '../components/Home';
import { ListTypes } from '../constants/ListTypes';

const List = (): JSX.Element => {
  const { listType } = useParams();
  const [data, setData] = useState<Titles>({
    entries: 0,
    results: [],
    next: '',
    page: ''
  });
  const [page, setPage] = useState(1);
  const [listTitle, setListTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const headerOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4oMcDEyGMDmshx6PYmJkcJYSgoOhp198V0UjsnI7mPJqb4n5r8',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  /**
   * fetch data based on list type
   * @param pageNumber
   */
  const fetchListData = (pageNumber: number): void => {
    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fetch(`https://moviesdatabase.p.rapidapi.com/titles/?info=mini_info&list=${listType}&sort=pos.incr&limit=15&page=${pageNumber}`, headerOptions)
      .then(async response => await response.json())
      .then((response: Titles) => {
        setData({
          page: response.page,
          results: [...data?.results, ...response.results],
          next: response.next,
          entries: response.entries
        });
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };

  /**
   * logic for getting list title
   */
  const refineListTitle = (): void => {
    switch (listType) {
      case ListTypes.most_pop_movies:
        setListTitle('Most popular movies');
        break;
      case ListTypes.most_pop_series:
        setListTitle('Most popular TV series');
        break;
      case ListTypes.top_boxoffice_200:
        setListTitle('Box office movies');
        break;
      case ListTypes.top_rated_250:
        setListTitle('Top rated movies');
        break;
      case ListTypes.top_rated_english_250:
        setListTitle('Top rated english movies');
        break;
      case ListTypes.top_rated_lowest_100:
        setListTitle('Low rated movies');
        break;
      case ListTypes.top_rated_series_250:
        setListTitle('Top rated TV series');
        break;
      default:
        setListTitle('empty list type');
    }
  };

  /**
   * increase page count
   */
  const increasePageCount = (): void => {
    setPage(page + 1);
  };

  useEffect(() => {
    void fetchListData(page);

    refineListTitle();
  }, [listTitle, page]);

  return (
    <Wrapper>
      <Container fluid p="xl">
        <Stack>
          <Skeleton visible={isLoading} width={Boolean(isLoading) ? 300 : ''} height={Boolean(isLoading) ? 40 : ''}>
            <Title mb="xl">{listTitle}</Title>
          </Skeleton>
          <SimpleGrid cols={5}>
            {data?.results.map(d => <MovieCard key={d.id} data={d} height={300} isLoading={isLoading}/>)}
          </SimpleGrid>
          <Button size="md" variant="outline" onClick={increasePageCount} loading={isLoading}>Load more</Button>
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default List;
