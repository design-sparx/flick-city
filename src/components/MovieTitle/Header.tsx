import React from 'react';
import { ActionIcon, Card, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { BsEnvelope, BsFacebook, BsInstagram, BsLink, BsTwitter } from 'react-icons/bs';
import { BaseInfo } from '../../constants/MovieTitle';

interface MovieHeaderProps {
  data?: BaseInfo
}

const Header = ({ data }: MovieHeaderProps): JSX.Element => {
  return (
    <Card>
      <SimpleGrid cols={2}>
        <Stack spacing={0}>
          <Title order={1}>{data?.titleText.text}</Title>
          <Text size="lg" weight={500}>{data?.releaseYear.year}</Text>
        </Stack>
        <Group spacing="xs" position="right">
          <Text>Share:</Text>
          <ActionIcon><BsFacebook/></ActionIcon>
          <ActionIcon><BsTwitter/></ActionIcon>
          <ActionIcon><BsInstagram/></ActionIcon>
          <ActionIcon><BsEnvelope/></ActionIcon>
          <ActionIcon><BsLink/></ActionIcon>
        </Group>
      </SimpleGrid>
    </Card>
  );
};

export default Header;
