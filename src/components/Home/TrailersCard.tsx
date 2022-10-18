import { Badge, Card, Group, Image, Text } from '@mantine/core';
import React from 'react';
import { Title as MovieItem } from '../../constants/Titles';

interface TrailerProps {
  data: MovieItem
}

const TrailersCard = ({ data }: TrailerProps): JSX.Element => {
  const { primaryImage, titleText, titleType } = data;
  return (
    <Card>
        <Card.Section>
          <Image
            src={Boolean(primaryImage) ? primaryImage.url : null}
            height={160}
            withPlaceholder
          />
          <Group position="apart">
            <Text weight={500}>{titleText.text}</Text>
            <Badge>{titleType.text}</Badge>
          </Group>
        </Card.Section>
    </Card>
  );
};

export default TrailersCard;
