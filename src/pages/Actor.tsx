import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from './Wrapper';
import {
  Card,
  Container,
  createStyles,
  Group,
  SimpleGrid,
  Skeleton,
  Stack,
  Text
} from '@mantine/core';
import { Actor as ActorType } from '../constants/Actor';
import { Titles } from '../constants/Titles';
import { MovieCard } from '../components/Home';
import { Helmet } from 'react-helmet';
import BackBtn from '../components/BackBtn';

const useStyles = createStyles(() => ({
  dFlex: {
    display: 'flex',
    gap: '6px'
  }
}));

const Actor = (): JSX.Element => {
  const { classes } = useStyles();
  const [data, setData] = useState<ActorType>();
  const [moviesData, setMoviesData] = useState<Titles>();
  const [isLoading, setIsLoading] = useState(false);
  const { actorId } = useParams();

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
  const fetchActorData = (): void => {
    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fetch(`${process.env.REACT_APP_BASE_URL ?? ''}/actors/${actorId}`, headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setData(response);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };

  /**
   * fetch actor movie titles
   * requires titleIds: string
   */
  const fetchActorMovies = (): void => {
    setIsLoading(true);
    let idsQuery = '';
    data?.results.knownForTitles.split(',').forEach((title: string, index: number) => {
      idsQuery += `idsList[${index}]=${title}&`;
    });
    fetch(`${process.env.REACT_APP_BASE_URL ?? ''}/titles/x/titles-by-ids?${idsQuery}`, headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setMoviesData(response);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchActorData();
  }, [actorId]);

  useEffect(() => {
    const unsub = (): void => {
      fetchActorMovies();
    };

    return () => {
      unsub();
    };
  }, [data]);

  return (
    <Wrapper>
      <Helmet>
        <title>Flick city - Actor - {`${data?.results.primaryName ?? ''}`}</title>
      </Helmet>
      <Container py="xl">
        <BackBtn/>
        <Card
          withBorder
          p="md"
          mt="xl"
        >
          <Stack spacing="xl">
            <Skeleton visible={isLoading} className={classes.dFlex}>
              <Text size="xl" weight={600}>Actor information</Text>
            </Skeleton>
            <Group spacing={4}>
              <Skeleton visible={isLoading} className={classes.dFlex}>
                <Text>Name:</Text>
                <Text weight={500}>{data?.results.primaryName}</Text>
              </Skeleton>
            </Group>
            <Group spacing={4}>
              <Skeleton visible={isLoading} className={classes.dFlex}>
                <Text>Year of birth:</Text>
                <Text weight={500}>{data?.results.birthYear}</Text>
              </Skeleton>
            </Group>
            {Boolean(Number(data?.results.deathYear)) &&
              <Group spacing={4}>
                <Skeleton visible={isLoading} className={classes.dFlex}>
                  <Text>Year of death:</Text>
                  <Text weight={500}>{data?.results.deathYear}</Text>
                </Skeleton>
              </Group>
            }
            <Group spacing="sm">
              <Skeleton visible={isLoading} className={classes.dFlex}>
                <Text>Professions: </Text>
                {data?.results.primaryProfession.split(',').map(prof =>
                  <Text key={prof} weight={500} transform="capitalize">{prof}, </Text>
                )}
              </Skeleton>
            </Group>
            <Stack>
              {Boolean(moviesData?.results) &&
                <>
                  <Skeleton visible={isLoading}>
                    <Text>Appeared in: </Text>
                  </Skeleton>
                  <SimpleGrid cols={4}>
                    {moviesData?.results.map(movie =>
                      <MovieCard key={movie.id} data={movie} height={250} isLoading={isLoading}/>
                    )}
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
