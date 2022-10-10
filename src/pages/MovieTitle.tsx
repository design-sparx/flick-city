import React, { useCallback, useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Container,
  createStyles,
  Divider,
  Group,
  Image,
  MantineTheme,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { BaseInfo, Cast, Creators, Revenue } from '../constants/MovieTitle';
import ActorCard from '../components/Home/ActorCard';
import { numberWithCommas, secondsToTime } from '../utils';
import { BsEnvelope, BsFacebook, BsInstagram, BsLink, BsTwitter } from 'react-icons/bs';
import { CreatorsCard } from '../components/MovieTitle';
import Video from '../components/Video';

const useStyles = createStyles((theme: MantineTheme) => ({
  sectionCard: {
    padding: theme.spacing.md,
    border: `1px solid ${theme.colors.gray[3]}`
  },
  sectionTitle: {
    textTransform: 'capitalize',
    marginBottom: theme.spacing.md
  },
  revenueAmount: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 600
  }
}));

const MovieTitle = (): JSX.Element => {
  const { classes } = useStyles();
  const { id } = useParams();
  const [baseInfoData, setBaseInfoData] = useState<BaseInfo>();
  const [revenueData, setRevenueData] = useState<Revenue>();
  const [creatorsData, setCreatorsData] = useState<Creators>();
  const [castData, setCastData] = useState<Cast>();

  const headerOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4oMcDEyGMDmshx6PYmJkcJYSgoOhp198V0UjsnI7mPJqb4n5r8',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  /**
   * fetch data based on list type
   */
  const fetchMovieBaseInfo = useCallback(async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=custom_info`, headerOptions)
      .then(async response => await response.json())
      .then(response => setBaseInfoData(response.results))
      .catch(err => console.error(err));
  }, []);

  /**
   * fetch data based on list type
   */
  const fetchMovieExtendedCast = useCallback(async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=extendedCast`, headerOptions)
      .then(async response => await response.json())
      .then(response => setCastData(response.results))
      .catch(err => console.error(err));
  }, []);

  /**
   * fetch data based on list type
   */
  const fetchMovieRevenue = useCallback(async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=revenue_budget`, headerOptions)
      .then(async response => await response.json())
      .then(response => setRevenueData(response.results))
      .catch(err => console.error(err));
  }, []);

  /**
   * fetch data based on list type
   */
  const fetchCreators = useCallback(async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=creators_directors_writers`, headerOptions)
      .then(async response => await response.json())
      .then(response => setCreatorsData(response.results))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    void fetchMovieBaseInfo();
    void fetchCreators();
    void fetchMovieRevenue();
    void fetchMovieExtendedCast();
  }, [id]);

  return (
    <Wrapper>
      <Image
        radius={0}
        src={baseInfoData?.primaryImage.url}
        alt={baseInfoData?.primaryImage.caption.plainText}
        height={500}
      />
      <Container>
        <Stack>
          <Card>
            <SimpleGrid cols={2}>
              <Stack spacing={0}>
                <Title order={1}>{baseInfoData?.titleText.text}</Title>
                <Text size='lg' weight={500}>{baseInfoData?.releaseYear.year}</Text>
              </Stack>
              <Group spacing="xs" position="right">
                <Text>Share:</Text>
                <ActionIcon><BsFacebook/></ActionIcon>
                <ActionIcon><BsTwitter/></ActionIcon>
                <ActionIcon><BsInstagram/></ActionIcon>
                <ActionIcon><BsEnvelope/></ActionIcon>
                <ActionIcon><BsLink/></ActionIcon>
              </Group>
            </SimpleGrid>
          </Card>
          <Card>
            <Group position="apart" align="center">
              <Group spacing="xs">
                {baseInfoData?.genres.genres.map(g => <Button key={g.id} compact variant="light">{g.text}</Button>)}
              </Group>
              <Group>
                <Text>Release year: {baseInfoData?.releaseYear.year}</Text>
                <Text>Runtime: {secondsToTime(baseInfoData?.runtime.seconds)}</Text>
                <Text>Ratings: {baseInfoData?.ratingsSummary.aggregateRating},
                  ({numberWithCommas(baseInfoData?.ratingsSummary.voteCount)})</Text>
              </Group>
            </Group>
          </Card>
          <Divider/>
          <Card>
            <SimpleGrid cols={2}>
              <Stack>
                {Boolean(creatorsData?.directors.length) && (
                  creatorsData?.directors.map(creator =>
                    <CreatorsCard key={creator.category.text} data={creator}/>
                  )
                )}
                {creatorsData?.writers.map(creator =>
                  <div key={creator.totalCredits}>
                    <Text weight={500}>{creator.category.text}</Text>
                    <Group spacing={2}>
                      {creator.credits.map(person => <Text key={person.name.id}>{person.name.nameText.text},</Text>)}
                    </Group>
                  </div>
                )}
                {creatorsData?.creators.map(creator =>
                  <div key={creator.totalCredits}>
                    <Text weight={500}>{creator.category.text}</Text>
                    <Group spacing={2}>
                      {creator.credits.map(person => <Text key={person.name.id}>{person.name.nameText.text},</Text>)}
                    </Group>
                  </div>
                )}
              </Stack>
              <Paper>
                <Text weight={500}>Plot</Text>
                <Text>{baseInfoData?.plot.plotText.plainText}</Text>
                <Group mt="md">
                  {baseInfoData?.keywords.edges.map(keyword =>
                    <Badge key={keyword.node.text}>{keyword.node.text}</Badge>)}
                </Group>
              </Paper>
            </SimpleGrid>
          </Card>
          <Divider/>
          <Card>
            <Title order={3} className={classes.sectionTitle}>Trailer</Title>
            <Video url={baseInfoData?.trailer}/>
          </Card>
          <Divider/>
          <Card>
            <Title order={3} className={classes.sectionTitle}>Revenue</Title>
            <SimpleGrid cols={4}>
              <Paper className={classes.sectionCard}>
                <Text>Opening week</Text>
                <Group spacing={2}>
                  <Text className={classes.revenueAmount}>
                    {numberWithCommas(revenueData?.openingWeekendGross.gross?.total.amount)}
                  </Text>
                  <Text size="sm">{revenueData?.openingWeekendGross.gross?.total.currency}</Text>
                </Group>
              </Paper>
              <Paper className={classes.sectionCard}>
                <Text>Lifetime gross</Text>
                <Group spacing={2}>
                  <Text className={classes.revenueAmount}>
                    {numberWithCommas(revenueData?.lifetimeGross.total?.amount)}
                  </Text>
                  <Text size="sm">{revenueData?.lifetimeGross.total?.currency}</Text>
                </Group>
              </Paper>
              <Paper className={classes.sectionCard}>
                <Text>Worldwide gross</Text>
                <Group spacing={2}>
                  <Text className={classes.revenueAmount}>
                    {numberWithCommas(revenueData?.worldwideGross.total?.amount)}
                  </Text>
                  <Text size="sm">{revenueData?.worldwideGross.total?.currency}</Text>
                </Group>
              </Paper>
              <Paper className={classes.sectionCard}>
                <Text>Budget</Text>
                <Group spacing={2}>
                  <Text className={classes.revenueAmount}>
                    {numberWithCommas(revenueData?.productionBudget.budget?.amount)}
                  </Text>
                  <Text size="sm">{revenueData?.productionBudget.budget?.currency}</Text>
                </Group>
              </Paper>
            </SimpleGrid>
          </Card>
          <Divider/>
          <Card>
            <Title order={3} className={classes.sectionTitle}>Cast</Title>
            <SimpleGrid cols={4}>
              {baseInfoData?.principalCast.map((cast, index) =>
                cast.credits.map(credit => <ActorCard key={credit.name.id} credit={credit}/>))}
              {castData?.cast.edges.map(cast => <ActorCard key={cast.node.name.id} cast={cast}/>)}
            </SimpleGrid>
          </Card>
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default MovieTitle;
