import React, { useEffect, useRef, useState } from 'react';
import Wrapper from './Wrapper';
import { BoxOfficeTitles, Titles } from '../constants/Titles';
import { Carousel } from '@mantine/carousel';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Autoplay from 'embla-carousel-autoplay';
import { Container, Stack } from '@mantine/core';
import { HeroCard, Section } from '../components/Home';
import { Helmet } from 'react-helmet';

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
  const autoplay = useRef(Autoplay({ delay: 30000 }));

  const headerOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4oMcDEyGMDmshx6PYmJkcJYSgoOhp198V0UjsnI7mPJqb4n5r8',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  /**
   * fetch hero carousel data
   */
  const fetchHeroTitles = (): void => {
    setIsHeroLoading(true);
    fetch('https://moviesdatabase.p.rapidapi.com/titles/?info=custom_info&list=top_boxoffice_last_weekend_10', headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setHeroData(response);
        setIsHeroLoading(false);
      })
      .catch(err => console.error(err));
  };

  /**
   * fetch popular movies
   */
  const fetchPopularMovies = (): void => {
    setIsPopularMovieLoading(true);
    fetch('https://moviesdatabase.p.rapidapi.com/titles/?list=most_pop_movies&info=mini_info&limit=10&sort=pos.incr&page=1', headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setPopularMovies(response);
        setIsPopularMovieLoading(false);
      })
      .catch(err => console.error(err));
  };

  /**
   * fetch top box office movies
   */
  const fetchTopBoxOfficeMovies = (): void => {
    setIsBoxOfficeLoading(true);
    fetch('https://moviesdatabase.p.rapidapi.com/titles/?list=top_boxoffice_200&info=mini_info&limit=10&sort=pos.incr&page=1', headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setBoxOfficeMovies(response);
        setIsBoxOfficeLoading(false);
      })
      .catch(err => console.error(err));
  };

  /**
   * fetch top rated movies
   */
  const fetchTopRatedMovies = (): void => {
    setIsTopMoviesLoading(true);
    fetch('https://moviesdatabase.p.rapidapi.com/titles/?list=top_rated_250&info=mini_info&limit=10&sort=pos.incr&page=1', headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setTopMovies(response);
        setIsTopMoviesLoading(false);
      })
      .catch(err => console.error(err));
  };

  /**
   * fetch top-rated movies - english
   */
  const fetchTopRatedMoviesEnglish = (): void => {
    setIsTopEnglishLoading(true);
    fetch('https://moviesdatabase.p.rapidapi.com/titles/?list=top_rated_english_250&info=custom_info&limit=10&sort=pos.incr&page=1', headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setTopEnglishMovies(response);
        setIsTopEnglishLoading(false);
      })
      .catch(err => console.error(err));
  };

  /**
   * fetch top box office
   */
  const fetchLowRatedMovies = (): void => {
    setIsLowRatedLoading(true);
    fetch('https://moviesdatabase.p.rapidapi.com/titles/?list=top_rated_lowest_100&info=mini_info&limit=10&sort=pos.incr&page=1', headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setLowRatedMovies(response);
        setIsLowRatedLoading(false);
      })
      .catch(err => console.error(err));
  };

  /**
   * fetch popular series
   */
  const fetchPopularSeries = (): void => {
    setIsPopularSeriesLoading(true);
    fetch('https://moviesdatabase.p.rapidapi.com/titles/?list=most_pop_series&info=mini_info&limit=10&sort=pos.incr&page=1', headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setPopularSeries(response);
        setIsPopularSeriesLoading(false);
      })
      .catch(err => console.error(err));
  };

  /**
   * fetch top-rated series
   */
  const fetchTopRatedSeries = (): void => {
    setIsTopSeriesLoading(true);
    fetch('https://moviesdatabase.p.rapidapi.com/titles/?list=top_rated_series_250&info=mini_info&limit=10&sort=pos.incr&page=1', headerOptions)
      .then(async response => await response.json())
      .then(response => {
        setTopSeries(response);
        setIsTopSeriesLoading(false);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    const unsub = (): void => {
      void fetchHeroTitles();
      void fetchPopularMovies();
      void fetchLowRatedMovies();
      void fetchPopularSeries();
      void fetchTopRatedSeries();
      void fetchTopRatedMovies();
      void fetchTopBoxOfficeMovies();
      void fetchTopRatedMoviesEnglish();
    };

    return () => {
      unsub();
    };
  }, []);

  return (
    <Wrapper>
      <Helmet>
        <title>Flick city - Home</title>
      </Helmet>
      <Carousel
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
        {heroData?.results.map(data => <Slide key={data.id}><HeroCard data={data} isLoading={isHeroLoading}/></Slide>)}
      </Carousel>
      <Container fluid px="xl">
        <Stack>
          {Boolean(popularMovies) &&
            <Section title="popular movies" description="Most popular movies" listType="most_pop_movies"
                     data={popularMovies} isLoading={isPopularMovieLoading}/>
          }
          {Boolean(boxOfficeMovies) &&
            <Section title="box office movies" description="Top selling movies of all time" listType="top_boxoffice_200"
                     data={boxOfficeMovies} isLoading={isBoxOfficeLoading}/>
          }
          {Boolean(topMovies) &&
            <Section title="top rated movies" description="Movies with highest user rating" listType="top_rated_250"
                     data={topMovies} isLoading={isTopMoviesLoading}/>
          }
          {Boolean(topEnglishMovies) &&
            <Section title="top english movies" description="English movies with highest user rating"
                     listType="top_rated_english_250" data={topEnglishMovies} isLoading={isTopEnglishLoading}/>
          }
          {Boolean(lowRatedMovies) &&
            <Section title="low rated movies" description="Movies with lowest user rating"
                     listType="top_rated_lowest_100" data={lowRatedMovies} isLoading={isLowRatedLoading}/>
          }
          {Boolean(popularSeries) &&
            <Section title="popular series" description="Most popular tv series" listType="most_pop_series"
                     data={popularSeries} isLoading={isPopularSeriesLoading}/>
          }
          {Boolean(topSeries) &&
            <Section title="top series" description="Tv series with highest user rating" listType="top_rated_series_250"
                     data={topSeries} isLoading={isTopSeriesLoading}/>
          }
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default Home;
