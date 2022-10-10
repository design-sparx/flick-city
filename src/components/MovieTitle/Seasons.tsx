import { Card, Divider, Group, Paper, SimpleGrid, Text, Title } from '@mantine/core';
import React from 'react';
import { BaseInfo } from '../../constants/MovieTitle';

interface SeasonsProps {
  data?: BaseInfo
}

const Seasons = ({ data }: SeasonsProps): JSX.Element => {
  return (
    <>
      <Card>
        <Title order={3} my="md">Seasons ({data?.episodes?.seasons.length})</Title>
        <Group mb="md" position="apart">
          <Text>Total episodes: {data?.episodes?.totalEpisodes.total}</Text>
          <Text>From: {data?.episodes?.years[0].year} -
            To: {data?.episodes?.years[data?.episodes?.years.length - 1].year}</Text>
        </Group>
        <SimpleGrid cols={4}>
          {data?.episodes?.seasons.map((season, index) =>
            <Paper key={index}>
              <Text>Season {season.number}</Text>
              <Text>Episodes: {data?.episodes?.episodes.total}</Text>
            </Paper>
          )}
        </SimpleGrid>
      </Card>
      <Divider/>
    </>
  );
};

export default Seasons;
