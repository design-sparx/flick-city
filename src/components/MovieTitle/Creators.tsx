import React from 'react';
import { Group, Text } from '@mantine/core';
import { Creator } from '../../constants/MovieTitle';

interface CreatorProps {
  data: Creator
}

const Creators = ({ data }: CreatorProps): JSX.Element => {
  return (
    <div>
      <Text weight={500}>{data.category.text}</Text>
      <Group spacing={2}>
        {data.credits.map(person => <Text key={person.name.id}>{person.name.nameText.text},</Text>)}
      </Group>
    </div>
  );
};

export default Creators;
