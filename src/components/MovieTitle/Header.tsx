import React from 'react';
import { ActionIcon, Card, Group, SimpleGrid, Skeleton, Stack, Text, Title } from '@mantine/core';
import { BsEnvelope, BsFacebook, BsInstagram, BsLink, BsTwitter } from 'react-icons/bs';
import { BaseInfo } from '../../constants/MovieTitle';

interface MovieHeaderProps {
  data?: BaseInfo
  isLoading: boolean
}

const Header = ({
  data,
  isLoading
}: MovieHeaderProps): JSX.Element => {
  return (
    <Card>
      <SimpleGrid cols={2} style={{ alignItems: 'end' }}>
        <Stack spacing="xs">
          <Skeleton visible={isLoading}>
            <Title order={1}>{data?.titleText.text}</Title>
          </Skeleton>
          <Skeleton visible={isLoading}>
            <Text size="lg" weight={500}>{data?.releaseYear.year}</Text>
          </Skeleton>
        </Stack>
        <Skeleton visible={isLoading} height={Boolean(isLoading) ? 40 : ''}>
          <Group spacing="xs" position="right">
              <Text>Share:</Text>
              <ActionIcon><BsFacebook/></ActionIcon>
              <ActionIcon><BsTwitter/></ActionIcon>
              <ActionIcon><BsInstagram/></ActionIcon>
              <ActionIcon><BsEnvelope/></ActionIcon>
              <ActionIcon><BsLink/></ActionIcon>
          </Group>
        </Skeleton>
      </SimpleGrid>
    </Card>
  );
};

export default Header;
