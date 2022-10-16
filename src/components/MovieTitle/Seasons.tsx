import { Card, Divider, Group, Paper, SimpleGrid, Skeleton, Text, Title } from '@mantine/core';
import React from 'react';
import { BaseInfo } from '../../constants/MovieTitle';

interface SeasonsProps {
  data?: BaseInfo
  isLoading: boolean
}

const Seasons = ({
  data,
  isLoading
}: SeasonsProps): JSX.Element => {
  return (
    <>
      <Card>
        <Skeleton visible={isLoading}>
          <Title order={3} my="md">Seasons ({data?.episodes?.seasons.length})</Title>
          <Group mb="md" position="apart">
            <Text>Total episodes: {data?.episodes?.totalEpisodes.total}</Text>
            <Text>From: {data?.episodes?.years[0].year} -
              To: {data?.episodes?.years[data?.episodes?.years.length - 1].year}</Text>
          </Group>
        </Skeleton>
        <SimpleGrid cols={4}>
          {data?.episodes?.seasons.map((season, index) =>
            <Paper key={index}>
              <Skeleton visible={isLoading}>
                <Text>Season {season.number}</Text>
                <Text>Episodes: {data?.episodes?.episodes.total}</Text>
              </Skeleton>
            </Paper>
          )}
        </SimpleGrid>
      </Card>
      <Divider/>
    </>
  );
};

export default Seasons;
