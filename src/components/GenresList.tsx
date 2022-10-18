import { Button, Collapse, Divider, Group, Paper, Skeleton } from '@mantine/core';
import React, { useState } from 'react';
import { Genres } from '../constants/Genres';
import { useQueryParams } from 'use-query-params';
import { useSearchParams } from 'react-router-dom';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

interface GenresProps {
  genres?: Genres
  handleReset?: () => void
  isLoading: boolean
}

const GenresList = ({
  genres,
  handleReset,
  isLoading
}: GenresProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [queryParams, setQueryParams] = useQueryParams();
  const [params] = useSearchParams();
  const genre = params.get('genre');
  const [opened, setOpened] = useState(true);

  /**
   * set active button and disable
   * @param g
   */
  const handleActiveButton = (g: string): boolean => {
    return genre === g;
  };

  return (
    <Skeleton visible={isLoading} sx={{ width: 'auto' }}>
      <Paper>
        <Group>
          <Button
            mb="md"
            variant="light"
            onClick={() => setOpened((o) => !o)}
            leftIcon={opened ? <BsChevronUp size={18}/> : <BsChevronDown size={18}/>}>
            Filter by genre:
          </Button>
        </Group>
        <Collapse in={opened}>
          <Group spacing="xs" mb="md">
            {genres?.results.map(g => Boolean(g) &&
              <Button
                key={g}
                color="gray"
                compact
                variant="outline"
                onClick={() => {
                  if (handleReset != null) {
                    handleReset();
                  }
                  setQueryParams({ genre: g });
                }}
                disabled={handleActiveButton(g)}
              >
                {g}
              </Button>
            )}
          </Group>
          <Divider />
        </Collapse>
      </Paper>
    </Skeleton>
  );
};

export default GenresList;
