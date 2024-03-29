import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  createStyles,
  Divider,
  Group,
  LoadingOverlay,
  MantineTheme,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
  UnstyledButton
} from '@mantine/core';
import React from 'react';
import { BoxOfficeTitle as MovieItem } from '../../constants/Titles';
import { BsPlay } from 'react-icons/bs';
import { secondsToTime } from '../../utils';
import { Link } from 'react-router-dom';
import { openModal } from '@mantine/modals';
import Video from '../Video';
import { ErrorType } from '../../constants/Error';
import { Error500Page } from '../../pages';
import { useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles((theme: MantineTheme) => ({
  root: {
    backgroundColor: '#252525',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',

    [theme.fn.smallerThan('md')]: {
      height: '100%'
    }
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
      marginRight: 0,
      maxWidth: '100%',
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.md
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
    color: theme.white,
    borderRadius: theme.radius.sm,

    '&:hover': {
      backgroundColor: theme.colors.dark[8],
      cursor: 'pointer'
    }
  }
}));

interface HeroCardProps {
  data: MovieItem
  isLoading: boolean
  error?: ErrorType
}

const HeroCard = ({
  data,
  isLoading,
  error
}: HeroCardProps): JSX.Element => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const {
    primaryImage,
    titleText,
    plot,
    releaseYear,
    runtime,
    ratingsSummary,
    genres,
    keywords,
    principalCast,
    trailer
  } = data;

  /**
   * handle open trailer video modal
   * @param url
   */
  const handleOpenVideoModal = (url: string): void => {
    openModal({
      title: (
        <Text weight={500} size="md">Watch {titleText.text} trailer</Text>
      ),
      centered: true,
      children: (
        <Box>
          <Video url={url} isLoading={isLoading} size={'md'}/>
        </Box>
      )
    });
  };

  return (
    <>
      {!Boolean(error?.error)
        ? <div
          className={classes.root}
          style={{
            backgroundImage: `linear-gradient(250deg, rgba(64, 64, 64, 0) 0%, #1d1d1d 70%), url(${primaryImage?.url})`
          }}
        >
          <LoadingOverlay visible={isLoading} overlayBlur={2}/>
          <Container size="lg">
            <div className={classes.inner}>
              <div className={classes.content}>
                <Stack mb={30}>
                  <Title className={classes.title}>
                    {titleText.text}
                  </Title>
                  <Group>
                    <Text>Runtime: {secondsToTime(runtime?.seconds)}</Text>
                    <Divider orientation="vertical"/>
                    <Text>Year of release: {releaseYear?.year}</Text>
                    {!isMobile &&
                      <>
                        <Divider orientation="vertical"/>
                        <Text>Ratings: {ratingsSummary?.aggregateRating}/10</Text>
                      </>
                    }
                  </Group>
                  {!isMobile &&
                    <>
                      <Group spacing="sm">
                        {genres?.genres.map((g) => <Badge key={`genre-${g.text}`} variant="filled">{g.text}</Badge>)}
                      </Group>
                      <Text>
                        {plot?.plotText?.plainText}
                      </Text>
                      <Group spacing="sm">
                        {keywords?.edges.map((k) =>
                          <Badge key={`keyword-${k.node.text}`} variant="filled">{k.node.text}</Badge>)}
                      </Group>
                      <SimpleGrid cols={2} spacing={0}>
                        {Boolean(principalCast) && principalCast[0]?.credits.map(p =>
                          <UnstyledButton
                            key={p.name.id}
                            className={classes.user}
                            component={Link}
                            to={`/actor/${p.name.id ?? ''}`}
                          >
                            <Group>
                              <Avatar
                                src={(Boolean(p.name.primaryImage)) ? p.name.primaryImage?.url : null}
                                radius="xl"/>
                              <div style={{ flex: 1 }}>
                                <Text size="xs" weight={500}>
                                  {p.name.nameText.text}
                                </Text>
                                <Group>
                                  {p.characters?.map(ch =>
                                    <Text key={`character-${ch.name}`} size="sm">{ch.name}</Text>)}
                                </Group>
                              </div>
                            </Group>
                          </UnstyledButton>
                        )}
                      </SimpleGrid>
                    </>
                  }
                </Stack>
                {!isMobile &&
                  (Boolean(trailer) &&
                    <Tooltip label="watch trailer">
                      <Button
                        size={isMobile ? 'md' : 'md'}
                        variant="white"
                        leftIcon={<BsPlay size={24}/>}
                        onClick={() => handleOpenVideoModal(trailer)}
                      >
                        Watch trailer
                      </Button>
                    </Tooltip>
                  )
                }
              </div>
            </div>
          </Container>
        </div>
        : <Error500Page/>
      }
    </>
  );
};

export default HeroCard;
