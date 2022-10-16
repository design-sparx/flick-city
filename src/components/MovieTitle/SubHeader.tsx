import React from 'react';
import { Button, Card, Divider, Group, Grid, Skeleton, Text, Col } from '@mantine/core';
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
        <Grid style={{ alignItems: 'start' }}>
          <Col span={4}>
            {Boolean(data?.genres) &&
              <Skeleton visible={isLoading}>
                <Group spacing="xs">
                  {data?.genres.genres.map(g => <Button key={g.id} compact variant="light">{g.text}</Button>)}
                </Group>
              </Skeleton>
            }
          </Col>
          <Col span={8}>
            <Skeleton visible={isLoading}>
              <Group position={Boolean(data?.genres) ? 'right' : 'left'}>
                <Text>Release year: {data?.releaseYear.year}</Text>
                {Boolean(data?.runtime) && <Text>Runtime: {secondsToTime(data?.runtime.seconds)}</Text>}
                {Boolean(data?.ratingsSummary.voteCount) &&
                  <Text>Ratings: {data?.ratingsSummary.aggregateRating} -
                    ({numberWithCommas(data?.ratingsSummary.voteCount)})
                  </Text>
                }
              </Group>
            </Skeleton>
          </Col>
        </Grid>
      </Card>
      <Divider/>
    </>
  );
};

export default SubHeader;
