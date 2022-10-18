import React, { useEffect, useState } from 'react';
import {
  createStyles,
  Header,
  Group,
  Burger,
  TextInput,
  Text,
  Container,
  useMantineTheme,
  ColorSwatch,
  ActionIcon, Popover, Tooltip, useMantineColorScheme, Drawer, Stack, Button, Divider
} from '@mantine/core';
import { upperFirst, useDisclosure, useMediaQuery } from '@mantine/hooks';
import { BsCheck2, BsMoonFill, BsSearch, BsSunFill } from 'react-icons/bs';
import { FcFilmReel } from 'react-icons/fc';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useNavigateSearch } from '../hooks';
import { IoIosColorWand } from 'react-icons/io';
import { showNotification } from '@mantine/notifications';

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
    position: 'sticky',
    boxShadow: theme.shadows.sm,

    [theme.fn.smallerThan('md')]: {
      paddingLeft: theme.spacing.xs,
      paddingRight: theme.spacing.xs,
      paddingTop: theme.spacing.sm
    }
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

    [theme.fn.smallerThan('md')]: {
      width: 400
    },
    [theme.fn.smallerThan('sm')]: {
      width: 200
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
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor
      }).background,
      color: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor
      }).color,
      cursor: 'pointer'
    }
  },

  active: {
    display: 'block',
    lineHeight: 1,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    cursor: 'pointer',
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor
    }).background,
    color: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor
    }).color
  },

  linkLabel: {
    marginRight: 5
  },

  burger: {
    [theme.fn.largerThan('lg')]: {
      display: 'none'
    }
  }
}));

interface AppBarProps {
  links: Array<{ link: string, label: string, list?: string }>
  onChange: (color: string) => void
  value: string
}

const AppBar = ({
  links,
  value,
  onChange
}: AppBarProps): JSX.Element => {
  const [opened, {
    toggle,
    close
  }] = useDisclosure(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [colorOpened, setColorOpened] = useState(false);
  const isMobile = useMediaQuery('(max-width: 800px)');
  const { classes } = useStyles();
  const { query } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const navigateSearch = useNavigateSearch();
  const theme = useMantineTheme();
  const colors = Object.keys(theme.colors).map((color) => ({
    swatch: theme.colors[color][6],
    color
  }));
  const {
    colorScheme,
    toggleColorScheme
  } = useMantineColorScheme();

  /**
   * swatches items
   */
  const swatches = colors.map(({
    color,
    swatch
  }) => (
    <ColorSwatch
      component="button"
      type="button"
      onClick={() => {
        onChange(color);
        showNotification({
          title: 'Color theme update',
          message: 'Your theme is awesome! 🤥',
          styles: (theme) => ({
            root: {
              backgroundColor: colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[2],
              borderColor: colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[2],

              '&::before': {
                backgroundColor: colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.gray[7]
              }
            },

            title: { color: colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.gray[7] },
            description: { color: colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.gray[7] },
            closeButton: {
              color: colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.gray[7],
              '&:hover': {
                backgroundColor: theme.colors.red[5],
                color: theme.white
              }
            }
          })
        });
      }}
      key={color}
      color={swatch}
      size={22}
      style={{
        color: theme.white,
        cursor: 'pointer'
      }}
    >
      {value === color && <BsCheck2 width={10}/>}
    </ColorSwatch>
  ));

  /**
   * resolve current location
   * @param href
   */
  const urlResolver = (href: string): boolean => {
    return location.pathname.includes(href);
  };

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
   * @param linkObj
   * @param requireList
   */
  const handleLinkOpen = (linkObj: { link: string, label: string, list?: string }, requireList: boolean): void => {
    const {
      list,
      link
    } = linkObj;

    requireList ? navigateSearch(`/titles${link}`, { list }) : navigateSearch(`/titles${link}`);
  };

  useEffect(() => {
    setSearchTerm(query ?? '');
  }, [query]);

  return (
    <Header height={isMobile ? 84 : '100%'} className={classes.header}>
      <Container fluid px={0}>
        <div className={classes.inner}>
          <Group
            spacing={isMobile ? 'xs' : 'md'}
            sx={{
              width: isMobile ? '100%' : 'auto'
            }}>
            <Group align="center">
              <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm"/>
              <FcFilmReel size={32}/>
              <Text size="xl" weight={500} component={Link} to="/">Flickcity</Text>
            </Group>
            <Tooltip label="search">
              <TextInput
                icon={<BsSearch size={14}/>}
                placeholder="Search for movies, series, tv shows, people..."
                className={classes.search}
                onKeyDown={handleKeyDown}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
                value={searchTerm}
                ml="sm"
              />
            </Tooltip>
          </Group>
          <Group spacing="xs" className={classes.links}>
            {links.map(link =>
              <Tooltip key={link.label} label={link.label}>
                <a
                  key={link.label}
                  className={urlResolver(link.link) ? classes.active : classes.link}
                  onClick={() => {
                    handleLinkOpen(link, Boolean(link.list));
                    close();
                  }}
                >
                  {link.label}
                </a>
              </Tooltip>
            )}
            <Tooltip label="Upcoming">
              <Link
                key="upcoming"
                className={classes.link}
                to="/upcoming"
              >
                Upcoming
              </Link>
            </Tooltip>
            <Tooltip label="switch to light/dark mode">
              <ActionIcon
                onClick={() => {
                  toggleColorScheme();
                  showNotification({
                    title: `${upperFirst(colorScheme === 'dark' ? 'light' : 'dark')} is on`,
                    message: `You just switched to ${colorScheme === 'dark' ? 'light' : 'dark'} mode. Hope you like it`,
                    styles: (theme) => ({
                      root: {
                        backgroundColor: colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[2],
                        borderColor: colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[2],

                        '&::before': { backgroundColor: colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.gray[7] }
                      },

                      title: { color: colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.gray[7] },
                      description: { color: colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.gray[7] },
                      closeButton: {
                        color: colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.gray[7],
                        '&:hover': {
                          backgroundColor: theme.colors.red[5],
                          color: theme.white
                        }
                      }
                    })
                  });
                }}
                size="lg"
                variant="filled"
                color="primary"
              >
                {colorScheme === 'light' ? <BsMoonFill/> : <BsSunFill/>}
              </ActionIcon>
            </Tooltip>
            <Popover
              opened={colorOpened}
              onClose={() => setColorOpened(false)}
              transitionDuration={0}
              width={152}
              position="bottom-end"
              withArrow
            >
              <Popover.Target>
                <Tooltip label="switch color scheme">
                  <ColorSwatch
                    component="button"
                    type="button"
                    color={theme.colors[value][6]}
                    onClick={() => setColorOpened((o) => !o)}
                    size={34}
                    radius="xs"
                    style={{
                      display: 'block',
                      cursor: 'pointer'
                    }}
                  >
                    <IoIosColorWand size={22} color="#fff"/>
                  </ColorSwatch>
                </Tooltip>
              </Popover.Target>
              <Popover.Dropdown>
                <Group spacing="xs">{swatches}</Group>
              </Popover.Dropdown>
            </Popover>
          </Group>
          <Drawer
            opened={opened}
            onClose={close}
            title="Menu"
            padding="sm"
            size="xl"
          >
            <Stack spacing="xs">
              {links.map(link =>
                <Tooltip key={link.label} label={link.label}>
                  <Button
                    component="a"
                    variant="subtle"
                    key={link.label}
                    className={urlResolver(link.link) ? classes.active : ''}
                    onClick={() => {
                      handleLinkOpen(link, Boolean(link.list));
                      close();
                    }}
                  >
                    {link.label}
                  </Button>
                </Tooltip>
              )}
              <Tooltip label="Upcoming">
                <Button
                  component="a"
                  variant="subtle"
                  key="upcoming"
                  href="/upcoming"
                >
                  Upcoming
                </Button>
              </Tooltip>
              <Divider />
              <Tooltip label="switch to light/dark mode">
                <Button
                  leftIcon={colorScheme === 'light' ? <BsMoonFill/> : <BsSunFill/>}
                  onClick={() => {
                    toggleColorScheme();
                    showNotification({
                      title: `${upperFirst(colorScheme === 'dark' ? 'light' : 'dark')} is on`,
                      message: `You just switched to ${colorScheme === 'dark' ? 'light' : 'dark'} mode. Hope you like it`,
                      styles: (theme) => ({
                        root: {
                          backgroundColor: colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[2],
                          borderColor: colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[2],

                          '&::before': { backgroundColor: colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.gray[7] }
                        },

                        title: { color: colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.gray[7] },
                        description: { color: colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.gray[7] },
                        closeButton: {
                          color: colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.gray[7],
                          '&:hover': {
                            backgroundColor: theme.colors.red[5],
                            color: theme.white
                          }
                        }
                      })
                    });
                  }}
                  variant="subtle"
                >
                  Switch to {colorScheme === 'light' ? 'dark' : 'light'} mode
                </Button>
              </Tooltip>
              <Group position="center">
                <Text>change color</Text>
                <Tooltip label="switch color scheme">
                  <ColorSwatch
                    component="button"
                    type="button"
                    color={theme.colors[value][6]}
                    onClick={() => setColorOpened((o) => !o)}
                    size={34}
                    radius="xs"
                    style={{
                      display: 'block',
                      cursor: 'pointer'
                    }}
                  >
                    <IoIosColorWand size={22} color="#fff"/>
                  </ColorSwatch>
                </Tooltip>
                <Group spacing="xs">{swatches}</Group>
              </Group>
            </Stack>
          </Drawer>
        </div>
      </Container>
    </Header>
  );
};

export default AppBar;
