import React from 'react';
import { Badge, Card, Divider, Group, Paper, SimpleGrid, Skeleton, Stack, Text, Title } from '@mantine/core';
import { CreatorsCard } from './index';
import { BaseInfo, Creators } from '../../constants/MovieTitle';

interface CreatorsSectionProps {
  creatorsData?: Creators
  baseInfo?: BaseInfo
  isLoading: boolean
}

const CreatorsSection = ({ creatorsData, baseInfo, isLoading }: CreatorsSectionProps): JSX.Element => {
  return (
    <>
      <Card>
        <SimpleGrid
          cols={2}
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
          <Skeleton visible={isLoading}>
            <Paper sx={{ background: 'none' }}>
              <Title order={4} my="sm">Plot</Title>
              <Text>{baseInfo?.plot.plotText.plainText}</Text>
              <Group mt="md">
                {baseInfo?.keywords.edges.map(keyword =>
                  <Badge key={keyword.node.text} variant="filled">{keyword.node.text}</Badge>)}
              </Group>
            </Paper>
          </Skeleton>
          <Skeleton visible={isLoading}>
            <Stack>
              {Boolean(creatorsData?.directors.length) && (
                creatorsData?.directors.map(creator =>
                  <CreatorsCard key={creator.category.text} data={creator}/>
                )
              )}
              {creatorsData?.writers.map(creator =>
                <CreatorsCard key={creator.category.text} data={creator}/>
              )}
              {creatorsData?.creators.map(creator =>
                <CreatorsCard key={creator.category.text} data={creator}/>
              )}
            </Stack>
          </Skeleton>
        </SimpleGrid>
      </Card>
      <Divider/>
    </>
  );
};

export default CreatorsSection;
