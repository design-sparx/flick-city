import {
  Text,
  Title,
  createStyles,
  MantineTheme,
  Container, Stack, Group, SimpleGrid, Avatar, UnstyledButton, Badge, Button, Divider
} from '@mantine/core';
import React from 'react';
import { BoxOfficeTitle as MovieItem } from '../../constants/Titles';
import { BsPlay } from 'react-icons/bs';

const useStyles = createStyles((theme: MantineTheme) => ({
  root: {
    backgroundColor: '#11284b',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start'
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column'
    }
  },

  image: {
    [theme.fn.smallerThan('md')]: {
      display: 'none'
    }
  },

  content: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    marginRight: theme.spacing.xl * 3,
    maxWidth: '60%',
    color: theme.white,

    [theme.fn.smallerThan('md')]: {
      marginRight: 0
    }
  },

  title: {
    color: theme.white,
    fontWeight: 900,
    lineHeight: 1.05,
    fontSize: 48,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      fontSize: 34,
      lineHeight: 1.15
    }
  },

  control: {
    paddingLeft: 50,
    paddingRight: 50,
    fontSize: 22,
    width: 'auto',

    [theme.fn.smallerThan('md')]: {
      width: '100%'
    }
  },

  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.sm,
    color: theme.white
  }
}));

interface HeroCardProps {
  data: MovieItem
}

const HeroCard = ({ data }: HeroCardProps): JSX.Element => {
  const { classes } = useStyles();
  const {
    primaryImage,
    titleText,
    plot,
    releaseYear,
    runtime,
    ratingsSummary,
    genres,
    keywords,
    principalCast
  } = data;

  return (
    <div
      className={classes.root}
      style={{
        backgroundImage: `linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(${primaryImage.url})`
      }}
    >
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Stack mb={30}>
              <Title className={classes.title}>
                {titleText.text}
              </Title>
              <Group>
                <Text>Time: {runtime?.seconds}</Text>
                <Divider orientation="vertical"/>
                <Text>Year of release: {releaseYear?.year}</Text>
                <Divider orientation="vertical"/>
                <Text>Ratings: {ratingsSummary?.aggregateRating}/10</Text>
              </Group>
              <Group>
                {genres?.genres.map((g) => <Badge key={`genre-${g.text}`}>{g.text}</Badge>)}
              </Group>
              <Text>
                {plot.plotText.plainText}
              </Text>
              <Group>
                {keywords?.edges.map((k) => <Badge key={`keyword-${k.node.text}`}>{k.node.text}</Badge>)}
              </Group>
              <SimpleGrid cols={2} spacing={0}>
                {principalCast[0].credits.map(p =>
                  <UnstyledButton key={p.name.id} className={classes.user}>
                    <Group>
                      <Avatar src={(Boolean(p.name.primaryImage)) ? p.name.primaryImage?.url : null} radius="xl"/>
                      <div style={{ flex: 1 }}>
                        <Text size="xs" weight={500}>
                          {p.name.nameText.text}
                        </Text>
                        <Group>
                          {p.characters?.map(ch => <Text key={`character-${ch.name}`} size="sm">{ch.name}</Text>)}
                        </Group>
                      </div>
                    </Group>
                  </UnstyledButton>
                )}
              </SimpleGrid>
            </Stack>
            <Button leftIcon={<BsPlay/>}>trailer</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroCard;
