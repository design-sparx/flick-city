import React from 'react';
import { createStyles, Header, Group, Burger, TextInput, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FaFilm, FaSearch } from 'react-icons/fa';
import { Genres } from '../constants/Genres';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none'
    }
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none'
    }
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
    }
  }
}));

interface AppBarProps {
  links?: Genres
}

const AppBar = ({ links }: AppBarProps): JSX.Element => {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  return (
    <Header height={56} className={classes.header} mb={30}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm"/>
          <FaFilm size={28}/>
          <Text size="lg" weight={500}>flickcity</Text>
        </Group>

        <Group spacing={5} className={classes.links}>
          <a
            key='home'
            href='/home'
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            home
          </a>
          <a
            key='movies'
            href='/movies'
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            movies
          </a>
          <a
            key='series'
            href='/series'
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            series
          </a>
          <TextInput
            className={classes.search}
            placeholder="Search"
            icon={<FaSearch size={16}/>}
          />
        </Group>
      </div>
    </Header>
  );
};

export default AppBar;
