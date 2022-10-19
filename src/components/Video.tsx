import React from 'react';
import { MantineSize, Skeleton } from '@mantine/core';

interface VideoProps {
  url?: string
  isLoading?: boolean
  size?: MantineSize
}

const Video = ({
  url,
  isLoading,
  size
}: VideoProps): JSX.Element => {
  return (
    <Skeleton visible={isLoading}>
      <iframe width='400' height='315' src={url}/>
    </Skeleton>
  );
};

export default Video;
