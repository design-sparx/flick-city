import React from 'react';
import { Button, Card, Divider, Group, SimpleGrid, Skeleton, Text } from '@mantine/core';
import { numberWithCommas, secondsToTime } from '../../utils';
import { BaseInfo } from '../../constants/MovieTitle';

interface SubHeaderProps {
  data?: BaseInfo
  isLoading: boolean
}

const SubHeader = ({ data, isLoading }: SubHeaderProps): JSX.Element => {
  return (
    <>
      <Card>
        <SimpleGrid cols={2} style={{ alignItems: 'start' }}>
          {Boolean(data?.genres.genres.length) &&
            <Skeleton visible={isLoading}>
              <Group spacing="xs">
                {data?.genres.genres.map(g => <Button key={g.id} compact variant="light">{g.text}</Button>)}
              </Group>
            </Skeleton>
          }
          <Skeleton visible={isLoading}>
            <Group position={Boolean(data?.genres.genres.length) ? 'right' : 'left'}>
              <Text>Release year: {data?.releaseYear.year}</Text>
              {Boolean(data?.runtime) && <Text>Runtime: {secondsToTime(data?.runtime.seconds)}</Text>}
              {Boolean(data?.ratingsSummary.voteCount) &&
                <Text>Ratings: {data?.ratingsSummary.aggregateRating},
                  ({numberWithCommas(data?.ratingsSummary.voteCount)})
                </Text>
              }
            </Group>
          </Skeleton>
        </SimpleGrid>
      </Card>
      <Divider/>
    </>
  );
};

export default SubHeader;
