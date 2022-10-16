import React from 'react';
import 'video-react/dist/video-react.css';
import { Skeleton } from '@mantine/core';

interface VideoProps {
  url?: string
  isLoading: boolean
}

const Video = ({
  url,
  isLoading
}: VideoProps): JSX.Element => {
  return (
    <Skeleton visible={isLoading}>
      <iframe width="472" height="315" src={url}/>
    </Skeleton>
  );
};

export default Video;
