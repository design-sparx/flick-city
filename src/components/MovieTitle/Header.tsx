import React from 'react';
import { ActionIcon, Card, Group, SimpleGrid, Skeleton, Stack, Text, Title } from '@mantine/core';
import { BsEnvelope, BsFacebook, BsInstagram, BsLink, BsTwitter } from 'react-icons/bs';
import { BaseInfo } from '../../constants/MovieTitle';
import { useMediaQuery } from '@mantine/hooks';

interface MovieHeaderProps {
  data?: BaseInfo
  isLoading: boolean
}

const Header = ({
  data,
  isLoading
}: MovieHeaderProps): JSX.Element => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <Card>
      <SimpleGrid
        cols={2}
        sx={{ alignItems: isMobile ? 'start' : 'end' }}
        breakpoints={[
          {
            maxWidth: 'md',
            cols: 2,
            spacing: 'md'
          },
          {
            maxWidth: 'sm',
            cols: 2,
            spacing: 'sm'
          },
          {
            maxWidth: 'xs',
            cols: 1,
            spacing: 'sm'
          }
        ]}
      >
        <Stack spacing="xs">
          <Skeleton visible={isLoading}>
            <Title order={1}>{data?.titleText.text}</Title>
          </Skeleton>
          <Skeleton visible={isLoading}>
            <Text size="lg" weight={500}>{data?.releaseYear.year}</Text>
          </Skeleton>
        </Stack>
        <Skeleton visible={isLoading} height={Boolean(isLoading) ? 40 : ''}>
          <Group spacing="xs" position={isMobile ? 'left' : 'right'}>
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
