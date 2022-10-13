import React, { useEffect, useState } from 'react';
import {
  createStyles,
  Header,
  Group,
  Burger,
  TextInput,
  Text,
  Container
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { BsSearch } from 'react-icons/bs';
import { FcFilmReel } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router-dom';
import { useNavigateSearch } from '../hooks';

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
    position: 'sticky',
    boxShadow: theme.shadows.sm
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
    width: 500,
    [theme.fn.smallerThan('xs')]: {
      display: 'none'
    }
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    textTransform: 'capitalize',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
    }
  }
}));

interface AppBarProps {
  links: Array<{ link: string, label: string, list?: string }>
}

const AppBar = ({ links }: AppBarProps): JSX.Element => {
  const [opened, { toggle }] = useDisclosure(false);
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { classes } = useStyles();
  const { query } = useParams();
  const navigate = useNavigate();
  const navigateSearch = useNavigateSearch();

  /**
   * on enter pressed
   * @param event
   */
  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      navigate(`/search/${searchTerm}`);
    }
  };

  /**
   * handle link open/navigate
   */
  const handleLinkOpen = (linkObj: { link: string, label: string, list?: string }): void => {
    const {
      list,
      link
    } = linkObj;

    navigateSearch(link, { list });
  };

  useEffect(() => {
    setSearchTerm(query ?? '');
  }, [query]);

  return (
    <Header height="100%" className={classes.header}>
      <Container fluid>
        <div className={classes.inner}>
          <Group>
            {isMobile && <Burger opened={opened} onClick={toggle} size="sm"/>}
            <FcFilmReel size={28}/>
            <Text size="lg" weight={500} component="a" href="/">flickcity</Text>
          </Group>

          <TextInput
            icon={<BsSearch size={14}/>}
            placeholder="Search for movies, series, tv shows, people..."
            className={classes.search}
            onKeyDown={handleKeyDown}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            value={searchTerm}
          />

          <Group spacing={4} className={classes.links}>
            {links.map(link =>
              <a
                key={link.label}
                className={classes.link}
                onClick={() => handleLinkOpen(link)}
              >
                {link.label}
              </a>
            )}
          </Group>
        </div>
      </Container>
    </Header>
  );
};

export default AppBar;
