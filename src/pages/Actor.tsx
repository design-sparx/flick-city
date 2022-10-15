import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from './Wrapper';
import { Badge, Card, Container, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { Actor as ActorType } from '../constants/Actor';
import { Titles } from '../constants/Titles';
import { MovieCard } from '../components/Home';

const Actor = (): JSX.Element => {
  const [data, setData] = useState<ActorType>();
  const [moviesData, setMoviesData] = useState<Titles>();
  const { actorId } = useParams();

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
  const fetchActorData = useCallback(async (): Promise<any> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await fetch(`https://moviesdatabase.p.rapidapi.com/actors/${actorId}`, headerOptions)
      .then(async response => await response.json())
      .then(response => setData(response))
      .catch(err => console.error(err));
  }, []);

  /**
   * fetch actor movie titles
   * requires titleIds: string
   */
  const fetchActorMovies = useCallback(async (): Promise<any> => {
    let idsQuery = '';
    data?.results.knownForTitles.split(',').forEach((title: string, index: number) => {
      idsQuery += `idsList[${index}]=${title}&`;
    });
    await fetch(`https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?${idsQuery}`, headerOptions)
      .then(async response => await response.json())
      .then(response => setMoviesData(response))
      .catch(err => console.error(err));
  }, [data]);

  useEffect(() => {
    void fetchActorData();
  }, [actorId]);

  useEffect(() => {
    void fetchActorMovies();
  }, [data]);

  return (
    <Wrapper>
      <Container>
        <Card
          withBorder
          p="md"
          mt="xl"
        >
          <Stack>
            <Text size="xl" weight={600}>Actor information</Text>
            <Group spacing={4}>
              <Text>Name:</Text>
              <Text weight={500}>{data?.results.primaryName}</Text>
            </Group>
            <Group spacing={4}>
              <Text>Year of birth:</Text>
              <Text weight={500}>{data?.results.birthYear}</Text>
            </Group>
            <Group spacing="sm">
              <Text>Professions: </Text>
              <Group spacing='xs'>
                {data?.results.primaryProfession.split(',').map(prof =>
                  <Badge key={prof}>{prof}</Badge>
                )}
              </Group>
            </Group>
            <Stack>
              {Boolean(moviesData?.results) &&
                <>
                  <Text>Appeared in: </Text>
                  <SimpleGrid cols={4}>
                    {moviesData?.results.map(movie => <MovieCard key={movie.id} data={movie} height={250}/>)}
                  </SimpleGrid>
                </>
              }
            </Stack>
          </Stack>
        </Card>
      </Container>
    </Wrapper>
  );
};

export default Actor;
