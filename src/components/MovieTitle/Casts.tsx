import React from 'react';
import { Card, SimpleGrid, Skeleton, Title } from '@mantine/core';
import ActorCard from '../ActorCard';
import { BaseInfo, Cast } from '../../constants/MovieTitle';

interface CastsProps {
  cast?: Cast
  credit?: BaseInfo
  isLoading: boolean
}

const Casts = ({
  cast,
  credit,
  isLoading
}: CastsProps): JSX.Element => {
  return (
    <Card>
      <Skeleton visible={isLoading} mb="md">
        <Title order={3} my="md">Cast</Title>
      </Skeleton>
      <SimpleGrid cols={4}>
        {Boolean(credit?.principalCast) &&
          credit?.principalCast.map(cast =>
            cast.credits.map(credit => Boolean(credit.name.id) && <ActorCard key={credit.name.id} credit={credit} isLoading={isLoading}/>))
        }
        {Boolean(cast?.cast.edges) &&
          cast?.cast.edges.map(cast => Boolean(cast.node.name.id) && <ActorCard key={cast.node.name.id} cast={cast} isLoading={isLoading}/>)
        }
      </SimpleGrid>
    </Card>
  );
};

export default Casts;
