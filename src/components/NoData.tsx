import React from 'react';
import { Center, Group, Image, List, Stack, Text } from '@mantine/core';

const NoData = (): JSX.Element => {
  return (
    <div>
      <Center>
        <Stack>
          <Group align="end">
            <Text size="lg" weight={500}>We could not find any results</Text>
            <Image width={60} src="https://cdn-icons-png.flaticon.com/512/7465/7465679.png"/>
          </Group>
          <List>
            <List.Item>Check your spelling</List.Item>
            <List.Item>Enter similar words</List.Item>
            <List.Item>Select another genre</List.Item>
          </List>
        </Stack>
      </Center>
    </div>
  );
};

export default NoData;
