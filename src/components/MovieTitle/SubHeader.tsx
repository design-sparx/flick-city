import React from 'react';
import { Badge, Card, Divider, Group, Grid, Skeleton, Text, Col } from '@mantine/core';
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
          {Boolean(data?.genres) &&
            <Col sm={12} lg={6}>
              <Skeleton visible={isLoading}>
                <Group spacing="xs">
                  {data?.genres.genres.map(g => <Badge key={g.id} variant="filled">{g.text}</Badge>)}
                </Group>
              </Skeleton>
            </Col>
          }
          <Col sm={12} lg={6}>
            <Skeleton visible={isLoading}>
              <Group>
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
