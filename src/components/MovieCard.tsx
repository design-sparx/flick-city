import { Box, Card, Center, createStyles, Group, Skeleton, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Title as MovieItem } from '../constants/Titles';
import { IconCalendar } from '@tabler/icons';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme, _params, getRef) => {
  const image = getRef('image');

  return {
    card: {
      position: 'relative',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

      [`&:hover .${image}`]: {
        transform: 'scale(1.03)'
      }
    },

    image: {
      ref: image,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transition: 'transform 500ms ease'
    },

    overlay: {
      position: 'absolute',
      top: '20%',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)'
    },

    content: {
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      zIndex: 1
    },

    title: {
      color: theme.white,
      marginBottom: 5
    },

    bodyText: {
      color: theme.white,
      marginLeft: 7
    },

    author: {
      color: theme.white
    }
  };
});

/**
 * is ranking param check if card is used for ranking movies
 */
interface MovieProps {
  data: MovieItem
  height: number
  isRanking?: boolean
  isLoading?: boolean
}

const MovieCard = ({
  data,
  height,
  isRanking,
  isLoading
}: MovieProps): JSX.Element => {
  const {
    classes,
    theme
  } = useStyles();
  const [pictureUrl, setPictureUrl] = useState('');
  const {
    primaryImage,
    titleText,
    titleType,
    releaseYear,
    position,
    id
  } = data;

  useEffect(() => {
    setPictureUrl(Boolean(primaryImage) ? primaryImage.url : 'https://img.freepik.com/free-vector/realistic-3d-cinema-film-strip-perspective-isolated_260559-136.jpg?w=900&t=st=1665596829~exp=1665597429~hmac=f4246a22f5b655d08befac083fa0d1d6055581e46c3a3728a36c83bc980b7c68');
  }, [primaryImage]);

  return (
    <Skeleton visible={isLoading}>
      <Card
        p="lg"
        shadow="lg"
        className={classes.card}
        radius="md"
        component={Link}
        to={`/title/${id}`}
        style={{ height }}
      >
        <div
          className={classes.image}
          style={{
            backgroundImage: `url(${pictureUrl})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        />
        <div className={classes.overlay}/>
        <div className={classes.content}>
          {Boolean(isRanking) &&
            <Box
              component="span"
              color={theme.white}
              px="sm"
              py={2}
              sx={{
                position: 'absolute',
                top: 0,
                background: 'white',
                borderRadius: theme.radius.md,
                fontWeight: 500,
                boxShadow: theme.shadows.md
              }}
            >
              {position}
            </Box>
          }
          <div>
            <Text size="lg" className={classes.title} weight={500} lineClamp={2}>
              {titleText.text}
            </Text>

            <Group position="apart" spacing="xs">
              <Text size="sm" className={classes.author}>
                {titleType.text}
              </Text>

              {Boolean(releaseYear) &&
                <Group>
                  <Center>
                    <IconCalendar size={16} stroke={1.5} color={theme.white}/>
                    <Text size="sm" className={classes.bodyText}>
                      {Boolean(releaseYear) ? releaseYear.year : ''}
                    </Text>
                  </Center>
                </Group>
              }
            </Group>
          </div>
        </div>
      </Card>
    </Skeleton>
  );
};

export default MovieCard;
