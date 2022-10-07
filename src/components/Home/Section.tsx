import { Button, Container, Group, SimpleGrid, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import React from 'react';
import { Titles } from '../../constants/Titles';
import { MovieCard } from './index';

interface SectionProps {
  title: string
  description: string
  data?: Titles
  children?: React.ReactNode
}

const PRIMARY_COL_HEIGHT = 600;

const Section = ({
  data,
  description,
  title
}: SectionProps): JSX.Element => {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

  /**
   * @ts-expect-error
   */
  return (
    <Container fluid py="lg">
      <Group position="apart" align="end" py="lg">
        <Group align="center">
          <Stack spacing="xs">
            <Title order={1} transform="capitalize">{title}</Title>
            <Text>{description}</Text>
          </Stack>
        </Group>
        <Button>view all</Button>
      </Group>
      <SimpleGrid cols={5}>
        {data?.results.map((d) =>
          <MovieCard data={d} height={SECONDARY_COL_HEIGHT} key={d.id}/>
        )}
      </SimpleGrid>
    </Container>
  );
};

export default Section;
