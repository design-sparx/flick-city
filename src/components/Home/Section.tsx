import { Button, Container, Group, SimpleGrid, Skeleton, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import React from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { Titles } from '../../constants/Titles';
import { MovieCard } from './index';
import { Link } from 'react-router-dom';

interface SectionProps {
  title: string
  description: string
  listType: string
  data?: Titles
  children?: React.ReactNode
  isLoading?: boolean
}

const PRIMARY_COL_HEIGHT = 600;

const Section = ({
  data,
  description,
  listType,
  title,
  isLoading
}: SectionProps): JSX.Element => {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

  return (
    <Container fluid py="lg" m={0}>
      <Group position="apart" align="end" py="lg">
        <Group align="center">
          <Stack spacing="xs">
            <Skeleton visible={isLoading}>
              <Title order={1} transform="capitalize">{title}</Title>
            </Skeleton>
            <Skeleton visible={isLoading}>
              <Text>{description}</Text>
            </Skeleton>
          </Stack>
        </Group>
        <Skeleton visible={isLoading} width={Boolean(isLoading) ? 300 : ''} height={40}>
          <Button
            variant="subtle"
            rightIcon={<BsChevronRight/>}
            component={Link} to={`/lists/${listType}`}
          >
            View All
          </Button>
        </Skeleton>
      </Group>
      <SimpleGrid cols={5}>
        {data?.results.map((d) =>
          <MovieCard data={d} height={SECONDARY_COL_HEIGHT} key={d.id} isRanking isLoading={isLoading}/>
        )}
      </SimpleGrid>
    </Container>
  );
};

export default Section;
