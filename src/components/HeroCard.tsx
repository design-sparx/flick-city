import {
  Card,
  Group,
  Grid,
  Stack,
  Image,
  Text,
  Title,
  Badge,
  createStyles,
  MantineTheme,
  SimpleGrid,
  UnstyledButton,
  Avatar
} from '@mantine/core';
import React from 'react';
import { BoxOfficeTitle as MovieItem } from '../constants/Titles';

const { Col } = Grid;

const useStyles = createStyles((theme: MantineTheme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
    }
  }
}));

interface HeroCardProps {
  data: MovieItem
}

const HeroCard = ({ data }: HeroCardProps): JSX.Element => {
  const { classes } = useStyles();

  return (
    <Card>
      <Grid>
        <Col span={8}>
          <Stack>
            <Title>{data.titleText.text}</Title>
            <Group>
              <Text>{data.runtime?.seconds}</Text>
              <Text>{data.releaseYear?.year}</Text>
              <Text>{data.ratingsSummary?.aggregateRating}/10</Text>
            </Group>
            <Group>
              {data.genres?.genres.map((g) => <Badge key={`genre-${g.text}`}>{g.text}</Badge>)}
            </Group>
            <Text>{data.plot?.plotText?.plainText}</Text>
            <Group>
              {data.keywords?.edges.map((k) => <Badge key={`keyword-${k.node.text}`}>{k.node.text}</Badge>)}
            </Group>
            <SimpleGrid cols={4}>
              {data.principalCast[0].credits.map(p => <UnstyledButton key={p.name.id} className={classes.user}>
                <Group>
                  <Avatar src={(Boolean(p.name.primaryImage)) ? p.name.primaryImage?.url : null} radius="xl" />

                  <div style={{ flex: 1 }}>
                    <Text size="xs" weight={500}>
                      {p.name.nameText.text}
                    </Text>
                    <Group>
                      {p.characters?.map(ch => <Text key={`character-${ch.name}`}>{ch.name}</Text>)}
                    </Group>
                  </div>
                </Group>
              </UnstyledButton>)}
            </SimpleGrid>
          </Stack>
        </Col>
        <Col span={4}>
          <Image
            src={Boolean(data.primaryImage) ? data.primaryImage.url : null}
            withPlaceholder
            fit="contain"
          />
        </Col>
      </Grid>
    </Card>
  );
};

export default HeroCard;
