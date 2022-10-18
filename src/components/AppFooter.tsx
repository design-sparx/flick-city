import React from 'react';
import { createStyles, Container, Group, ActionIcon, Text } from '@mantine/core';
import { FcFilmReel } from 'react-icons/fc';
import { BsFacebook, BsGithub, BsGlobe2, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 30,
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
        <Group>
          <FcFilmReel size={28}/>
          <Text weight={500}>Flickcity</Text>
        </Group>
        <Group spacing='xs' className={classes.links} position="right" noWrap>
          <ActionIcon size="lg" component='a' target="_blank" href="https://lnk.bio/kelvink96" color="primary" variant="light">
            <BsGlobe2 size={18} />
          </ActionIcon>
          <ActionIcon size="lg" component='a' target="_blank" href="https://twitter.com/kelvink_96" color="primary" variant="light">
            <BsTwitter size={18} />
          </ActionIcon>
          <ActionIcon size="lg" component='a' target="_blank" href="https://www.facebook.com/kelvinkk96" color="primary" variant="light">
            <BsFacebook size={18} />
          </ActionIcon>
          <ActionIcon size="lg" component='a' target="_blank" href="https://www.linkedin.com/in/kelvink96/" color="primary" variant="light">
            <BsLinkedin size={18} />
          </ActionIcon>
          <ActionIcon size="lg" component='a' target="_blank" href="https://www.instagram.com/kelvink_96/" color="primary" variant="light">
            <BsInstagram size={18} />
          </ActionIcon>
          <ActionIcon size="lg" component='a' target="_blank" href="https://github.com/kelvink96" color="primary" variant="light">
            <BsGithub size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};

export default AppFooter;
