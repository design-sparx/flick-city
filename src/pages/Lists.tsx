import React, { useEffect, useRef, useState } from 'react';
import Wrapper from './Wrapper';
import { Titles } from '../constants/Titles';
import { Button, Center, Container, Loader, SimpleGrid, Skeleton, Stack, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { MovieCard } from '../components/Home';
import { ListTypes } from '../constants/ListTypes';
import { Helmet } from 'react-helmet';
import BackBtn from '../components/BackBtn';
import { BsChevronDown } from 'react-icons/bs';
import NoData from '../components/NoData';

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
  const bottomRef = useRef<any>(null);

  const headerOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY ?? '',
      'X-RapidAPI-Host': process.env.REACT_APP_API_HOST ?? ''
    }
  };

  /**
   * fetch data based on list type
   * @param pageNumber
   */
  const fetchListData = (pageNumber: number): void => {
    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fetch(`${process.env.REACT_APP_BASE_URL ?? ''}/titles/?info=mini_info&list=${listType}&sort=pos.incr&limit=15&page=${pageNumber}`, headerOptions)
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

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data]);

  return (
    <Wrapper>
      <Helmet>
        <title>Flick city - List - {`${listType ?? ''}`}</title>
      </Helmet>
      <Container fluid p="xl">
        <Stack>
          <BackBtn />
          <Skeleton visible={isLoading} width={Boolean(isLoading) ? 300 : ''} height={Boolean(isLoading) ? 40 : ''}>
            <Title mb="xl">{listTitle}</Title>
          </Skeleton>
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
            : <Center py="xl"><Loader size="xl" /></Center>
          }
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default List;
