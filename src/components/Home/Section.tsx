import { Badge, Box, Button, Group, Progress, Text } from '@mantine/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Carousel, Embla } from '@mantine/carousel';
import { Titles } from '../../constants/Titles';
import { MovieCard } from './index';

const { Slide } = Carousel;

interface SectionProps {
  title: string
  data: Titles | undefined
  children?: React.ReactNode
}

const Section = ({
  data,
  title
}: SectionProps): JSX.Element => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);

  const handleScroll = useCallback(() => {
    if (embla == null) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (embla != null) {
      embla.on('scroll', handleScroll);
      handleScroll();
    }
  }, [embla]);

  return (
    <Box py="lg">
      <Group position="apart" align="center">
        <Group align="center">
          <Text size="xl" weight={500}>{title}</Text>
          <Badge>{data?.entries}</Badge>
        </Group>
        <Button>view all</Button>
      </Group>
      <Progress
        value={scrollProgress}
        styles={{
          bar: { transitionDuration: '0ms' }
        }}
        size="xs"
        my="lg"
        mx="auto"
      />
      <Carousel
        dragFree
        slideSize="25%"
        slideGap="md"
        getEmblaApi={setEmbla}
        align="start"
        slidesToScroll={2}
      >
        {data?.results.map(d => <Slide key={d.id}><MovieCard data={d}/></Slide>)}
      </Carousel>
    </Box>
  );
};

export default Section;
