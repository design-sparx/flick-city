import React from 'react';
import 'video-react/dist/video-react.css';
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
  const height = size === 'sm' ? 315 : 430;
  const width = size === 'sm' ? 472 : 672;

  return (
    <Skeleton visible={isLoading}>
      <iframe width={width} height={height} src={url}/>
    </Skeleton>
  );
};

export default Video;
