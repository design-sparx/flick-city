import { Button, Group, Paper } from '@mantine/core';
import React from 'react';
import { Genres } from '../constants/Genres';
import { useQueryParams } from 'use-query-params';
import { useSearchParams } from 'react-router-dom';

interface GenresProps {
  genres?: Genres
  handleReset?: () => void
}

const GenresList = ({ genres, handleReset }: GenresProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [queryParams, setQueryParams] = useQueryParams();
  const [params] = useSearchParams();
  const genre = params.get('genre');

  /**
   * set active button and disable
   * @param g
   */
  const handleActiveButton = (g: string): boolean => {
    return genre === g;
  };

  return (
    <Paper>
      <Group spacing="xs">
        {genres?.results.map(g => Boolean(g) &&
          <Button
            key={g}
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
    </Paper>
  );
};

export default GenresList;
