import React from 'react';
import { Card, Divider, Group, Paper, SimpleGrid, Text, Title } from '@mantine/core';
import { numberWithCommas } from '../../utils';
import { Revenue } from '../../constants/MovieTitle';

interface RevenueProps {
  data?: Revenue
}

const Revenues = ({ data }: RevenueProps): JSX.Element => {
  return (
    <>
      <Card>
        <Title order={3} my="mg">Revenue</Title>
        <SimpleGrid cols={4}>
          <Paper withBorder p="md">
            <Text mb="xs">Opening week</Text>
            <Group spacing={2}>
              <Text weight={500}>
                {numberWithCommas(data?.openingWeekendGross.gross?.total.amount)}
              </Text>
              <Text size="sm">{data?.openingWeekendGross.gross?.total.currency}</Text>
            </Group>
          </Paper>
          <Paper withBorder p="md">
            <Text mb="xs">Lifetime gross</Text>
            <Group spacing={2}>
              <Text weight={500}>
                {numberWithCommas(data?.lifetimeGross.total?.amount)}
              </Text>
              <Text size="sm">{data?.lifetimeGross.total?.currency}</Text>
            </Group>
          </Paper>
          <Paper withBorder p="md">
            <Text mb="xs">Worldwide gross</Text>
            <Group spacing={2}>
              <Text weight={500}>
                {numberWithCommas(data?.worldwideGross.total?.amount)}
              </Text>
              <Text size="sm">{data?.worldwideGross.total?.currency}</Text>
            </Group>
          </Paper>
          <Paper withBorder p="md">
            <Text mb="xs">Budget</Text>
            <Group spacing={2}>
              <Text weight={500}>
                {numberWithCommas(data?.productionBudget.budget?.amount)}
              </Text>
              <Text size="sm">{data?.productionBudget.budget?.currency}</Text>
            </Group>
          </Paper>
        </SimpleGrid>
      </Card>
      <Divider/>
    </>
  );
};

export default Revenues;
