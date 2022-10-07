import { Box, Card, Center, createStyles, Group, Text } from '@mantine/core';
import React from 'react';
import { Title as MovieItem } from '../../constants/Titles';
import { IconCalendar } from '@tabler/icons';

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
      backgroundSize: 'cover',
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

interface MovieProps {
  data: MovieItem
  height: number
}

const MovieCard = ({
  data,
  height
}: MovieProps): JSX.Element => {
  const {
    classes,
    theme
  } = useStyles();
  const {
    primaryImage,
    titleText,
    titleType,
    releaseYear,
    position
  } = data;

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component="a"
      href={''}
      target="_blank"
      style={{ height }}
    >
      <div
        className={classes.image}
        style={{
          background: Boolean(primaryImage) ? `url(${primaryImage.url})` : 'radial-gradient(circle, rgba(13,19,50,1) 0%, rgba(28,38,55,1) 100%)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      />
      <div className={classes.overlay}/>
      <div className={classes.content}>
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
        <div>
          <Text size="lg" className={classes.title} weight={500}>
            {titleText.text}
          </Text>

          <Group position="apart" spacing="xs">
            <Text size="sm" className={classes.author}>
              {titleType.text}
            </Text>

            <Group>
              <Center>
                <IconCalendar size={16} stroke={1.5} color={theme.white}/>
                <Text size="sm" className={classes.bodyText}>
                  {Boolean(releaseYear) ? releaseYear.year : ''}
                </Text>
              </Center>
            </Group>
          </Group>
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;
