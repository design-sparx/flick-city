import { Carousel } from '@mantine/carousel';
import { Badge, Box, Button, Grid, Group, SimpleGrid, Skeleton, Text, useMantineTheme } from '@mantine/core';
import React from 'react';
import { Titles } from '../../constants/Titles';
import { useMediaQuery } from '@mantine/hooks';
import { MovieCard } from './index';

interface SectionProps {
  title: string
  data: Titles | undefined
  children?: React.ReactNode
}

const { Slide } = Carousel;
const PRIMARY_COL_HEIGHT = 600;

const Section = ({
  data,
  title
}: SectionProps): JSX.Element => {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  return (
    <Box py="lg">
      <Group position="apart" align="center">
        <Group align="center">
          <Text size="xl" weight={500}>{title}</Text>
          <Badge>{data?.entries}</Badge>
        </Group>
        <Button>view all</Button>
      </Group>
      <SimpleGrid cols={2} spacing="md" breakpoints={[{
        maxWidth: 'sm',
        cols: 1
      }]}>
        <Carousel
          slideSize="100%"
          breakpoints={[{
            maxWidth: 'sm',
            slideSize: '100%',
            slideGap: 2
          }]}
          slideGap="xl"
          align="start"
          slidesToScroll={mobile ? 1 : 1}
          loop
          height={PRIMARY_COL_HEIGHT}
        >
          {data?.results.map(d => <Slide key={d.id}><MovieCard data={d} height={PRIMARY_COL_HEIGHT}/></Slide>)}
        </Carousel>
        <Grid gutter="md">
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false}/>
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false}/>
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false}/>
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false}/>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Box>
  );
};

export default Section;
