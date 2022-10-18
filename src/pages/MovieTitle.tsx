import React, { useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import {
  Container, createStyles,
  Image, MantineTheme,
  Skeleton,
  Stack
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { BaseInfo, Cast, Creators, Revenue } from '../constants/MovieTitle';
import {
  Casts,
  CreatorsSection,
  MovieHeader,
  MovieSubHeader,
  Revenues,
  Seasons,
  Trailers
} from '../components/MovieTitle';
import { Helmet } from 'react-helmet';
import BackBtn from '../components/BackBtn';
import { PhotoView } from 'react-photo-view';

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
  const [isLoading, setIsLoading] = useState(false);
  const [castData, setCastData] = useState<Cast>();
  const { classes } = useStyles();

  const headerOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY ?? '',
      'X-RapidAPI-Host': process.env.REACT_APP_API_HOST ?? ''
    }
  };

  /**
   * fetch data based on list type
   */
  const fetchMovieBaseInfo = (): void => {
    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fetch(`${process.env.REACT_APP_BASE_URL ?? ''}/titles/${id}?info=custom_info`, headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setBaseInfoData(response.results);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };

  /**
   * fetch data based on list type
   */
  const fetchMovieExtendedCast = (): void => {
    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fetch(`${process.env.REACT_APP_BASE_URL ?? ''}/titles/${id}?info=extendedCast`, headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setCastData(response.results);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };

  /**
   * fetch data based on list type
   */
  const fetchMovieRevenue = (): void => {
    setIsLoading(false);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fetch(`${process.env.REACT_APP_BASE_URL ?? ''}/titles/${id}?info=revenue_budget`, headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setRevenueData(response.results);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };

  /**
   * fetch data based on list type
   */
  const fetchCreators = (): void => {
    setIsLoading(false);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=creators_directors_writers`, headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setCreatorsData(response.results);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    const unsub = (): void => {
      void fetchMovieBaseInfo();
      void fetchCreators();
      void fetchMovieRevenue();
      void fetchMovieExtendedCast();
    };

    return () => {
      unsub();
    };
  }, [id]);

  return (
    <Wrapper>
      <Helmet>
        <title>Flick city - Title - {`${baseInfoData?.titleText.text ?? ''}`}</title>
      </Helmet>
      <Skeleton visible={isLoading} radius={0}>
        <PhotoView src={Boolean(baseInfoData?.primaryImage) ? baseInfoData?.primaryImage.url : 'https://img.freepik.com/free-vector/realistic-3d-cinema-film-strip-perspective-isolated_260559-136.jpg?w=900&t=st=1665596829~exp=1665597429~hmac=f4246a22f5b655d08befac083fa0d1d6055581e46c3a3728a36c83bc980b7c68'}>
          <Image
            radius={0}
            src={Boolean(baseInfoData?.primaryImage) ? baseInfoData?.primaryImage.url : 'https://img.freepik.com/free-vector/realistic-3d-cinema-film-strip-perspective-isolated_260559-136.jpg?w=900&t=st=1665596829~exp=1665597429~hmac=f4246a22f5b655d08befac083fa0d1d6055581e46c3a3728a36c83bc980b7c68'}
            alt={Boolean(baseInfoData?.primaryImage) ? baseInfoData?.primaryImage.caption.plainText : 'empty image'}
            height={450}
            className={classes.coverImage}
          />
        </PhotoView>
      </Skeleton>
      <Container py="xl">
        <Stack spacing="xl">
          <BackBtn />
          <MovieHeader data={baseInfoData} isLoading={isLoading}/>
          <MovieSubHeader data={baseInfoData} isLoading={isLoading}/>
          {Boolean(baseInfoData?.plot) &&
            <CreatorsSection creatorsData={creatorsData} baseInfo={baseInfoData} isLoading={isLoading}/>
          }
          {Boolean(baseInfoData?.episodes) &&
            <Seasons data={baseInfoData} isLoading={isLoading}/>
          }
          {Boolean(baseInfoData?.trailer) && <Trailers data={baseInfoData} isLoading={isLoading}/>}
          {(Boolean(revenueData?.openingWeekendGross) && Boolean(revenueData?.worldwideGross) && Boolean(revenueData?.lifetimeGross) && Boolean(revenueData?.productionBudget)) &&
            <Revenues data={revenueData} isLoading={isLoading}/>
          }
          {Boolean(castData?.cast.edges.length) &&
            <Casts cast={castData} credit={baseInfoData} isLoading={isLoading}/>
          }
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default MovieTitle;
