import { Button, Group, Paper } from '@mantine/core';
import React from 'react';
import { Genres } from '../constants/Genres';
import { useSearchParams } from 'react-router-dom';

interface GenresProps {
  genres?: Genres
}

const GenresList = ({ genres }: GenresProps): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleActiveButton = (g: string): boolean => {
    return searchParams.get('genre') === g;
  };

  return (
    <Paper>
      <Group spacing="xs">
        {genres?.results.map(g => Boolean(g) &&
          <Button
            key={g}
            compact
            variant="outline"
            onClick={() => setSearchParams({ genre: g })}
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
