import React from 'react';
import { Avatar, Card, Text, Skeleton, Stack, createStyles } from '@mantine/core';
import { SingleCast, SingleCredit } from '../constants/MovieTitle';
import { Link } from 'react-router-dom';

interface ActorProps {
  cast?: SingleCast
  credit?: SingleCredit
  isLoading?: boolean
}

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: 'none',

    '&:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor
      }).background,
      color: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor
      }).color,
      cursor: 'pointer'
    }
  }
}));

const ActorCard = ({
  cast,
  credit,
  isLoading
}: ActorProps): JSX.Element => {
  const { classes } = useStyles();
  const id = Boolean(cast?.node) ? cast?.node.name.id : credit?.name.id;

  return (
    <Skeleton visible={isLoading}>
      <Card
        radius="md"
        p="lg"
        component={Link}
        to={`/actor/${id ?? ''}`}
        className={classes.card}
      >
        {Boolean(cast)
          ? <>
            <Avatar src={Boolean(cast?.node.name.primaryImage) ? cast?.node.name.primaryImage.url : null} size={120}
                    radius={120} mx="auto"/>
            <Text align="center" weight={500} mt="md">
              {cast?.node.name.nameText.text}
            </Text>
            <Stack spacing={0}>
              {
                Boolean(cast?.node.characters) &&
                cast?.node.characters.map(c =>
                  <Text key={c.name} align="center" size="sm">{c.name}</Text>)
              }
            </Stack>
          </>
          : <>
            <Avatar
              src={Boolean(credit?.name.primaryImage) ? credit?.name.primaryImage.url : null} size={120}
              radius={120} mx="auto"
            />
            <Text align="center" weight={500} mt="md">
              {credit?.name.nameText.text}
            </Text>
            {Boolean(credit?.characters) &&
              <Stack spacing={0}>
                {credit?.characters.map(c =>
                  <Text key={c.name} align="center" size="sm">{c.name},</Text>
                )}
              </Stack>
            }
          </>
        }
      </Card>
    </Skeleton>
  );
};

export default ActorCard;
