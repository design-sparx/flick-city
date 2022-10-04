import { Card, Image, Text } from '@mantine/core';
import React from 'react';
import { Title as MovieItem } from '../../constants/Titles';

interface MovieProps {
  data: MovieItem
}

const MovieCard = ({ data }: MovieProps): JSX.Element => {
  const { primaryImage, titleText, titleType } = data;
  return (
    <Card>
      <Card.Section mb="md">
        <Image
          src={Boolean(primaryImage) ? primaryImage.url : null}
          height={160}
          withPlaceholder
          fit="cover"
        />
      </Card.Section>
      <Text weight={500} size="lg">{titleText.text}</Text>
      <Text size="sm">{titleType.text}</Text>
    </Card>
  );
};

export default MovieCard;
