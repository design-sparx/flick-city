import React from 'react';
import 'video-react/dist/video-react.css';

interface VideoProps {
  url?: string
}

const Video = ({ url }: VideoProps): JSX.Element => {
  return (
    <iframe width='472' height="315" src={url}/>
  );
};

export default Video;
