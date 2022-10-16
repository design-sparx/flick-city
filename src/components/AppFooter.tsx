import React from 'react';
import { createStyles, Container, Group, ActionIcon } from '@mantine/core';
import { FcFilmReel } from 'react-icons/fc';
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column'
    }
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md
    }
  }
}));

const AppFooter = (): JSX.Element => {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container fluid className={classes.inner}>
        <FcFilmReel size={28}/>
        <Group spacing='xs' className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <BsTwitter size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BsFacebook size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BsLinkedin size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BsInstagram size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BsGithub size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};

export default AppFooter;
