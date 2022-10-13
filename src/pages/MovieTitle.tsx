import React, { useCallback, useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import {
  Container, createStyles,
  Image, MantineTheme,
  Stack
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { BaseInfo, Cast, Creators, Revenue } from '../constants/MovieTitle';
import { Casts, CreatorsSection, MovieHeader, MovieSubHeader, Revenues, Seasons, Trailers } from '../components/MovieTitle';

const useStyles = createStyles((theme: MantineTheme) => ({
  coverImage: {
    marginBottom: theme.spacing.md
  }
}));

const MovieTitle = (): JSX.Element => {
  const { id } = useParams();
  const [baseInfoData, setBaseInfoData] = useState<BaseInfo>();
  const [revenueData, setRevenueData] = useState<Revenue>();
  const [creatorsData, setCreatorsData] = useState<Creators>();
  const [castData, setCastData] = useState<Cast>();
  const { classes } = useStyles();

  const headerOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4oMcDEyGMDmshx6PYmJkcJYSgoOhp198V0UjsnI7mPJqb4n5r8',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  /**
   * fetch data based on list type
   */
  const fetchMovieBaseInfo = useCallback(async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=custom_info`, headerOptions)
      .then(async response => await response.json())
      .then(response => setBaseInfoData(response.results))
      .catch(err => console.error(err));
  }, []);

  /**
   * fetch data based on list type
   */
  const fetchMovieExtendedCast = useCallback(async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=extendedCast`, headerOptions)
      .then(async response => await response.json())
      .then(response => setCastData(response.results))
      .catch(err => console.error(err));
  }, []);

  /**
   * fetch data based on list type
   */
  const fetchMovieRevenue = useCallback(async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=revenue_budget`, headerOptions)
      .then(async response => await response.json())
      .then(response => setRevenueData(response.results))
      .catch(err => console.error(err));
  }, []);

  /**
   * fetch data based on list type
   */
  const fetchCreators = useCallback(async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=creators_directors_writers`, headerOptions)
      .then(async response => await response.json())
      .then(response => setCreatorsData(response.results))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    void fetchMovieBaseInfo();
    void fetchCreators();
    void fetchMovieRevenue();
    void fetchMovieExtendedCast();
  }, [id]);

  return (
    <Wrapper>
      <Image
        radius={0}
        src={baseInfoData?.primaryImage.url}
        alt={baseInfoData?.primaryImage.caption.plainText}
        height={400}
        className={classes.coverImage}
      />
      <Container>
        <Stack>
          <MovieHeader data={baseInfoData}/>
          <MovieSubHeader data={baseInfoData}/>
          {Boolean(baseInfoData?.plot) &&
            <CreatorsSection creatorsData={creatorsData} baseInfo={baseInfoData}/>
          }
          {Boolean(baseInfoData?.episodes) &&
            <Seasons data={baseInfoData}/>
          }
          {Boolean(baseInfoData?.trailer) && <Trailers data={baseInfoData}/>}
          {(Boolean(revenueData?.openingWeekendGross) && Boolean(revenueData?.worldwideGross) && Boolean(revenueData?.lifetimeGross) && Boolean(revenueData?.productionBudget)) &&
            <Revenues data={revenueData}/>
          }
          {Boolean(castData?.cast.edges.length) &&
            <Casts cast={castData} credit={baseInfoData}/>
          }
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default MovieTitle;
