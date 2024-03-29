import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Autoplay from 'embla-carousel-autoplay';
import { Center, Container, Loader, Stack } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Wrapper from './Wrapper';
import { ErrorType } from '../constants/Error';
import { HeroCard, Section } from '../components/Home';
import { BoxOfficeTitles, Titles } from '../constants/Titles';

const { Slide } = Carousel;

const Home = (): JSX.Element => {
  const [heroData, setHeroData] = useState<BoxOfficeTitles>();
  const [popularMovies, setPopularMovies] = useState<Titles>();
  const [lowRatedMovies, setLowRatedMovies] = useState<Titles>();
  const [popularSeries, setPopularSeries] = useState<Titles>();
  const [topSeries, setTopSeries] = useState<Titles>();
  const [topMovies, setTopMovies] = useState<Titles>();
  const [boxOfficeMovies, setBoxOfficeMovies] = useState<Titles>();
  const [topEnglishMovies, setTopEnglishMovies] = useState<Titles>();
  const [isHeroLoading, setIsHeroLoading] = useState(false);
  const [isPopularMovieLoading, setIsPopularMovieLoading] = useState(false);
  const [isPopularSeriesLoading, setIsPopularSeriesLoading] = useState(false);
  const [isTopSeriesLoading, setIsTopSeriesLoading] = useState(false);
  const [isTopMoviesLoading, setIsTopMoviesLoading] = useState(false);
  const [isBoxOfficeLoading, setIsBoxOfficeLoading] = useState(false);
  const [isTopEnglishLoading, setIsTopEnglishLoading] = useState(false);
  const [isLowRatedLoading, setIsLowRatedLoading] = useState(false);
  const [heroError, setHeroError] = useState<ErrorType>();
  const [popularMovieError, setPopularMovieError] = useState<ErrorType>();
  const [popularSeriesError, setPopularSeriesError] = useState<ErrorType>();
  const [topSeriesError, setTopSeriesError] = useState<ErrorType>();
  const [topMoviesError, setTopMoviesError] = useState<ErrorType>();
  const [boxOfficeError, setBoxOfficeError] = useState<ErrorType>();
  const [topEnglishError, setTopEnglishError] = useState<ErrorType>();
  const [lowRatedError, setLowRatedError] = useState<ErrorType>();
  const autoplay = useRef(Autoplay({ delay: 30000 }));
  const navigate = useNavigate();

  const headerOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY ?? '',
      'X-RapidAPI-Host': process.env.REACT_APP_API_HOST ?? ''
    }
  };

  /**
   * fetch hero carousel data
   */
  const fetchHeroTitles = (): void => {
    setIsHeroLoading(true);
    try {
      fetch(`${process.env.REACT_APP_BASE_URL ?? ''}/titles/?info=custom_info&list=top_boxoffice_last_weekend_10`, headerOptions)
        .then(async response => await response.json())
        .then(response => {
          setHeroData(response);
          setIsHeroLoading(false);
        })
        .catch(err => {
          setHeroError({
            error: true,
            message: err
          });
          console.error(err);
          navigate('/500', { state: err });
        });
    } catch (e) {
      setHeroError({
        error: true,
        message: e
      });
      console.error(e);
      navigate('/500', { state: e });
    }
  };

  /**
   * fetch popular movies
   */
  const fetchPopularMovies = (): void => {
    setIsPopularMovieLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL ?? ''}/titles/?list=most_pop_movies&info=mini_info&limit=10&sort=pos.incr&page=1`, headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setPopularMovies(response);
        setIsPopularMovieLoading(false);
      })
      .catch(err => {
        console.error(err);
        setPopularMovieError({
          error: true,
          message: err
        });
        navigate('/500', { state: err });
      });
  };

  /**
   * fetch top box office movies
   */
  const fetchTopBoxOfficeMovies = (): void => {
    setIsBoxOfficeLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL ?? ''}/titles/?list=top_boxoffice_200&info=mini_info&limit=10&sort=pos.incr&page=1`, headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setBoxOfficeMovies(response);
        setIsBoxOfficeLoading(false);
      })
      .catch(err => {
        console.error(err);
        setBoxOfficeError({
          error: true,
          message: err
        });
        navigate('/500', { state: err });
      });
  };

  /**
   * fetch top rated movies
   */
  const fetchTopRatedMovies = (): void => {
    setIsTopMoviesLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL ?? ''}/titles/?list=top_rated_250&info=mini_info&limit=10&sort=pos.incr&page=1`, headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setTopMovies(response);
        setIsTopMoviesLoading(false);
      })
      .catch(err => {
        console.error(err);
        setTopMoviesError({
          error: true,
          message: err
        });
        navigate('/500', { state: err });
      });
  };

  /**
   * fetch top-rated movies - english
   */
  const fetchTopRatedMoviesEnglish = (): void => {
    setIsTopEnglishLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL ?? ''}/titles/?list=top_rated_english_250&info=custom_info&limit=10&sort=pos.incr&page=1`, headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setTopEnglishMovies(response);
        setIsTopEnglishLoading(false);
      })
      .catch(err => {
        console.error(err);
        setTopEnglishError({
          error: true,
          message: err
        });
        navigate('/500', { state: err });
      });
  };

  /**
   * fetch top box office
   */
  const fetchLowRatedMovies = (): void => {
    setIsLowRatedLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL ?? ''}/titles/?list=top_rated_lowest_100&info=mini_info&limit=10&sort=pos.incr&page=1`, headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setLowRatedMovies(response);
        setIsLowRatedLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLowRatedError({
          error: true,
          message: err
        });
        navigate('/500', { state: err });
      });
  };

  /**
   * fetch popular series
   */
  const fetchPopularSeries = (): void => {
    setIsPopularSeriesLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL ?? ''}/titles/?list=most_pop_series&info=mini_info&limit=10&sort=pos.incr&page=1`, headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setPopularSeries(response);
        setIsPopularSeriesLoading(false);
      })
      .catch(err => {
        console.error(err);
        setPopularSeriesError({
          error: true,
          message: err
        });
        navigate('/500', { state: err });
      });
  };

  /**
   * fetch top-rated series
   */
  const fetchTopRatedSeries = (): void => {
    setIsTopSeriesLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL ?? ''}/titles/?list=top_rated_series_250&info=mini_info&limit=10&sort=pos.incr&page=1`, headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setTopSeries(response);
        setIsTopSeriesLoading(false);
      })
      .catch(err => {
        console.error(err);
        setTopSeriesError({
          error: true,
          message: err
        });
        navigate('/500', { state: err });
      });
  };

  useEffect(() => {
    void fetchHeroTitles();
    void fetchPopularMovies();
    void fetchLowRatedMovies();
    void fetchPopularSeries();
    void fetchTopRatedSeries();
    void fetchTopRatedMovies();
    void fetchTopBoxOfficeMovies();
    void fetchTopRatedMoviesEnglish();
  }, []);

  console.log(Boolean(popularMovies?.results.length));

  return (
    <Wrapper>
      <Helmet>
        <title>Flick city - Home</title>
      </Helmet>
      {Boolean(heroData?.results.length)
        ? <Carousel
          mx="auto"
          withIndicators
          controlSize={48}
          nextControlIcon={<BsChevronRight size={20}/>}
          previousControlIcon={<BsChevronLeft size={20}/>}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          styles={{
            indicator: {
              width: 12,
              height: 4,
              transition: 'width 250ms ease',

              '&[data-active]': {
                width: 40
              }
            }
          }}
        >
          {heroData?.results.map(data => <Slide key={data.id}>
            <HeroCard data={data} isLoading={isHeroLoading} error={heroError}/></Slide>)}
        </Carousel>
        : <Center py="lg"><Loader size="lg"/> </Center>}
      <Container fluid px="xl">
        <Stack>
          {Boolean(popularMovies?.results.length) &&
            <Section title="popular movies" description="Most popular movies" listType="most_pop_movies"
                     data={popularMovies} isLoading={isPopularMovieLoading} error={popularMovieError}/>
          }
          {Boolean(boxOfficeMovies?.results.length) &&
            <Section title="box office movies" description="Top selling movies of all time" listType="top_boxoffice_200"
                     data={boxOfficeMovies} isLoading={isBoxOfficeLoading} error={boxOfficeError}/>
          }
          {Boolean(topMovies?.results.length) &&
            <Section title="top rated movies" description="Movies with highest user rating" listType="top_rated_250"
                     data={topMovies} isLoading={isTopMoviesLoading} error={topMoviesError}/>
          }
          {Boolean(topEnglishMovies?.results.length) &&
            <Section title="top english movies" description="English movies with highest user rating"
                     listType="top_rated_english_250" data={topEnglishMovies} isLoading={isTopEnglishLoading}
                     error={topEnglishError}/>
          }
          {Boolean(lowRatedMovies?.results.length) &&
            <Section title="low rated movies" description="Movies with lowest user rating"
                     listType="top_rated_lowest_100" data={lowRatedMovies} isLoading={isLowRatedLoading}
                     error={lowRatedError}/>
          }
          {Boolean(popularSeries?.results.length) &&
            <Section title="popular series" description="Most popular tv series" listType="most_pop_series"
                     data={popularSeries} isLoading={isPopularSeriesLoading} error={popularSeriesError}/>
          }
          {Boolean(topSeries?.results.length) &&
            <Section title="top series" description="Tv series with highest user rating" listType="top_rated_series_250"
                     data={topSeries} isLoading={isTopSeriesLoading} error={topSeriesError}/>
          }
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default Home;
