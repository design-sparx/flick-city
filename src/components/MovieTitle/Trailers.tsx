import React from 'react';
import { Card, Divider, Title } from '@mantine/core';
import Video from '../Video';
import { BaseInfo } from '../../constants/MovieTitle';

interface TrailersProps {
  data?: BaseInfo
}

const Trailers = ({ data }: TrailersProps): JSX.Element => {
  return (
    <>
      <Card>
        <Title order={3} py="md">Trailer</Title>
        <Video url={data?.trailer}/>
      </Card>
      <Divider/>
    </>
  );
};

export default Trailers;
