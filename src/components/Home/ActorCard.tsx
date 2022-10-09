import React from 'react';
import { Avatar, Text, Paper, Group } from '@mantine/core';
import { SingleCast } from '../../constants/MovieTitle';

interface ActorProps {
  data: SingleCast
}

const ActorCard = ({ data }: ActorProps): JSX.Element => {
  const { node } = data;
  const {
    name,
    characters
  } = node;
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white
      })}
    >
      <Avatar src={name.primaryImage.url} size={120} radius={120} mx="auto"/>
      <Text align="center" size="lg" weight={500} mt="md">
        {name.nameText.text}
      </Text>
      <Group position="center">
        {characters.map(c => <Text key={c.name} align="center" color="dimmed" size="sm">{c.name}</Text>)}
      </Group>
    </Paper>
  );
};

export default ActorCard;
