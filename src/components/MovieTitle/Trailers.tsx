import React from 'react';
import { Card, Divider, Skeleton, Title } from '@mantine/core';
import Video from '../Video';
import { BaseInfo } from '../../constants/MovieTitle';

interface TrailersProps {
  data?: BaseInfo
  isLoading: boolean
}

const Trailers = ({
  data,
  isLoading
}: TrailersProps): JSX.Element => {
  return (
    <>
      <Card>
        <Skeleton visible={isLoading}>
          <Title order={3} py="md">Trailer</Title>
          <Video url={data?.trailer} isLoading={isLoading}/>
        </Skeleton>
      </Card>
      <Divider/>
    </>
  );
};

export default Trailers;
