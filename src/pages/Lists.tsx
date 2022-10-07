import React, { useCallback, useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import { Titles } from '../constants/Titles';
import { Container, SimpleGrid, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { MovieCard } from '../components/Home';
import { ListTypes } from '../constants/ListTypes';

const Home = (): JSX.Element => {
  const { listType } = useParams();
  const [data, setData] = useState<Titles>();
  const [listTitle, setListTitle] = useState('');

  const headerOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4oMcDEyGMDmshx6PYmJkcJYSgoOhp198V0UjsnI7mPJqb4n5r8',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  console.log(listType);

  /**
   * fetch data based on list type
   */
  const fetchListData = useCallback(async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await fetch(`https://moviesdatabase.p.rapidapi.com/titles/?info=mini_info&list=${listType}&sort=pos.incr&limit=20`, headerOptions)
      .then(async response => await response.json())
      .then(response => setData(response))
      .catch(err => console.error(err));
  }, []);

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

  useEffect(() => {
    fetchListData().then(() => {
    }).catch(e => console.log(e));

    refineListTitle();
  }, [listTitle]);

  return (
    <Wrapper>
      <Container fluid p="xl">
        <Title mb="xl">{listTitle}</Title>
        <SimpleGrid cols={5}>
          {data?.results.map(d => <MovieCard key={d.id} data={d} height={300}/>)}
        </SimpleGrid>
      </Container>
    </Wrapper>
  );
};

export default Home;
