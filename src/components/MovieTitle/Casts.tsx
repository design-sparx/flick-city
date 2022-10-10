import React from 'react';
import { Card, SimpleGrid, Title } from '@mantine/core';
import ActorCard from '../Home/ActorCard';
import { BaseInfo, Cast } from '../../constants/MovieTitle';

interface CastsProps {
  cast?: Cast
  credit?: BaseInfo
}

const Casts = ({ cast, credit }: CastsProps): JSX.Element => {
  return (
    <Card>
      <Title order={3} my="md">Cast</Title>
      <SimpleGrid cols={4}>
        {credit?.principalCast.map(cast =>
          cast.credits.map(credit => Boolean(credit.name.id) && <ActorCard key={credit.name.id} credit={credit}/>))}
        {cast?.cast.edges.map(cast => Boolean(cast.node.name.id) && <ActorCard key={cast.node.name.id} cast={cast}/>)}
      </SimpleGrid>
    </Card>
  );
};

export default Casts;
