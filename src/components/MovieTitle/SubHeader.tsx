import React from 'react';
import { Button, Card, Divider, Group, SimpleGrid, Text } from '@mantine/core';
import { numberWithCommas, secondsToTime } from '../../utils';
import { BaseInfo } from '../../constants/MovieTitle';

interface SubHeaderProps {
  data?: BaseInfo
}

const SubHeader = ({ data }: SubHeaderProps): JSX.Element => {
  return (
    <>
      <Card>
        <SimpleGrid cols={2} style={{ alignItems: 'start' }}>
          {Boolean(data?.genres.genres.length) &&
            <Group spacing="xs">
              {data?.genres.genres.map(g => <Button key={g.id} compact variant="light">{g.text}</Button>)}
            </Group>
          }
          <Group position={Boolean(data?.genres.genres.length) ? 'right' : 'left'}>
            <Text>Release year: {data?.releaseYear.year}</Text>
            {Boolean(data?.runtime) && <Text>Runtime: {secondsToTime(data?.runtime.seconds)}</Text>}
            {Boolean(data?.ratingsSummary.voteCount) &&
              <Text>Ratings: {data?.ratingsSummary.aggregateRating},
                ({numberWithCommas(data?.ratingsSummary.voteCount)})
              </Text>
            }
          </Group>
        </SimpleGrid>
      </Card>
      <Divider/>
    </>
  );
};

export default SubHeader;
