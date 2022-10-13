import React from 'react';
import { Avatar, Card, Text, Stack } from '@mantine/core';
import { SingleCast, SingleCredit } from '../constants/MovieTitle';

interface ActorProps {
  cast?: SingleCast
  credit?: SingleCredit
}

const ActorCard = ({
  cast,
  credit
}: ActorProps): JSX.Element => {
  const id = Boolean(cast?.node) ? cast?.node.name.id : credit?.name.id;

  return (
    <Card
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white
      })}
      component='a'
      href={`/actor/${id ?? ''}`}
    >
      {Boolean(cast)
        ? <>
          <Avatar src={Boolean(cast?.node.name.primaryImage) ? cast?.node.name.primaryImage.url : null} size={120}
                  radius={120} mx="auto"/>
          <Text align="center" weight={500} mt="md">
            {cast?.node.name.nameText.text}
          </Text>
          <Stack spacing={0}>
            {
              Boolean(cast?.node.characters) &&
              cast?.node.characters.map(c =>
                <Text key={c.name} align="center" color="dimmed" size="sm">{c.name}</Text>)
            }
          </Stack>
        </>
        : <>
          <Avatar src={Boolean(credit?.name.primaryImage) ? credit?.name.primaryImage.url : null} size={120}
                  radius={120} mx="auto"/>
          <Text align="center" weight={500} mt="md">
            {credit?.name.nameText.text}
          </Text>
          {Boolean(credit?.characters) &&
            <Stack spacing={0}>
              {credit?.characters.map(c => <Text key={c.name} align="center" color="dimmed" size="sm">{c.name},</Text>)}
            </Stack>
          }
        </>
      }
    </Card>
  );
};

export default ActorCard;
