import React, { useCallback, useEffect, useRef, useState } from 'react';
import Wrapper from './Wrapper';
import { BoxOfficeTitles, Titles } from '../constants/Titles';
import { Carousel } from '@mantine/carousel';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Autoplay from 'embla-carousel-autoplay';
import { Container, Stack } from '@mantine/core';
import { HeroCard, Section } from '../components/Home';

const { Slide } = Carousel;

const Home = (): JSX.Element => {
  const [heroData, setHeroData] = useState<BoxOfficeTitles>();
  const [trailers, setTrailers] = useState<Titles>();
  const [popularMovies, setPopularMovies] = useState<Titles>();
  const [lowRatedMovies, setLowRatedMovies] = useState<Titles>();
  const [popularSeries, setPopularSeries] = useState<Titles>();
  const [topSeries, setTopSeries] = useState<Titles>();
  const [topMovies, setTopMovies] = useState<Titles>();
  const [boxOfficeMovies, setBoxOfficeMovies] = useState<Titles>();
  const [topEnglishMovies, setTopEnglishMovies] = useState<Titles>();
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
  const fetchHeroTitles = useCallback(async (): Promise<void> => {
    await fetch('https://moviesdatabase.p.rapidapi.com/titles/?info=custom_info&list=top_boxoffice_last_weekend_10', headerOptions)
      .then(async response => await response.json())
      .then(response => setHeroData(response))
      .catch(err => console.error(err));
  }, []);

  /**
   * fetch trailers data
   */
  const fetchTrailers = useCallback(async (): Promise<void> => {
    await fetch('https://moviesdatabase.p.rapidapi.com/titles?titleType=movie&info=mini_info&year=2022&genre=Action&page=2&limit=10&sort=year.incr', headerOptions)
      .then(async response => await response.json())
      .then(response => setTrailers(response))
      .catch(err => console.error(err));
  }, []);

  /**
   * fetch popular movies
   */
  const fetchPopularMovies = useCallback(async (): Promise<void> => {
    await fetch('https://moviesdatabase.p.rapidapi.com/titles/?list=most_pop_movies&info=mini_info&limit=15&sort=pos.incr&page=2', headerOptions)
      .then(async response => await response.json())
      .then(response => setPopularMovies(response))
      .catch(err => console.error(err));
  }, []);

  /**
   * fetch top box office movies
   */
  const fetchTopBoxOfficeMovies = useCallback(async (): Promise<void> => {
    fetch('https://moviesdatabase.p.rapidapi.com/titles/?list=top_boxoffice_200&info=mini_info&limit=15&sort=pos.incr&page=2', headerOptions)
      .then(async response => await response.json())
      .then(response => setBoxOfficeMovies(response))
      .catch(err => console.error(err));
  }, []);

  /**
   * fetch top rated movies
   */
  const fetchTopRatedMovies = useCallback(async (): Promise<void> => {
    fetch('https://moviesdatabase.p.rapidapi.com/titles/?list=top_rated_250&info=mini_info&limit=15&sort=pos.incr&page=2', headerOptions)
      .then(async response => await response.json())
      .then(response => setTopMovies(response))
      .catch(err => console.error(err));
  }, []);

  /**
   * fetch top rated movies - english
   */
  const fetchTopRatedMoviesEnglish = useCallback(async (): Promise<void> => {
    fetch('https://moviesdatabase.p.rapidapi.com/titles/?list=top_rated_english_250&info=custom_info&limit=15&sort=pos.incr&page=2', headerOptions)
      .then(async response => await response.json())
      .then(response => setTopEnglishMovies(response))
      .catch(err => console.error(err));
  }, []);

  /**
   * fetch top box office
   */
  const fetchLowRatedMovies = useCallback(async (): Promise<void> => {
    fetch('https://moviesdatabase.p.rapidapi.com/titles/?list=top_rated_lowest_100&info=mini_info&limit=15&sort=pos.incr&page=2', headerOptions)
      .then(async response => await response.json())
      .then(response => setLowRatedMovies(response))
      .catch(err => console.error(err));
  }, []);

  /**
   * fetch popular series
   */
  const fetchPopularSeries = useCallback(async (): Promise<void> => {
    fetch('https://moviesdatabase.p.rapidapi.com/titles/?list=most_pop_series&info=mini_info&limit=15&sort=pos.incr&page=2', headerOptions)
      .then(async response => await response.json())
      .then(response => setPopularSeries(response))
      .catch(err => console.error(err));
  }, []);

  /**
   * fetch top rated series
   */
  const fetchTopRatedSeries = useCallback(async (): Promise<void> => {
    fetch('https://moviesdatabase.p.rapidapi.com/titles/?list=top_rated_series_250&info=mini_info&limit=15&sort=pos.incr&page=2', headerOptions)
      .then(async response => await response.json())
      .then(response => setTopSeries(response))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetchHeroTitles().then(() => console.log('')).catch(e => console.log(e));
    fetchTrailers().then(() => console.log('')).catch(e => console.log(e));
    fetchPopularMovies().then(() => console.log('')).catch(e => console.log(e));
    fetchLowRatedMovies().then(() => console.log('')).catch(e => console.log(e));
    fetchPopularSeries().then(() => console.log('')).catch(e => console.log(e));
    fetchTopRatedSeries().then(() => console.log('')).catch(e => console.log(e));
    fetchTopRatedMovies().then(() => console.log('')).catch(e => console.log(e));
    fetchTopBoxOfficeMovies().then(() => console.log('')).catch(e => console.log(e));
    fetchTopRatedMoviesEnglish().then(() => console.log('')).catch(e => console.log(e));
    console.log(trailers);
  }, [fetchHeroTitles, fetchTrailers, fetchPopularSeries, fetchPopularMovies, fetchTopRatedMoviesEnglish, fetchTopRatedMovies, fetchTopRatedSeries, fetchTopBoxOfficeMovies]);

  return (
    <Wrapper>
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
        {heroData?.results.map(data => <Slide key={data.id}><HeroCard data={data}/></Slide>)}
      </Carousel>
      <Container fluid>
        <Stack>
          {Boolean(popularMovies) &&
            <Section title="popular movies" data={popularMovies}/>
          }
          {Boolean(boxOfficeMovies) &&
            <Section title="box movies" data={boxOfficeMovies}/>
          }
          {Boolean(topMovies) &&
            <Section title="top movies" data={topMovies}/>
          }
          {Boolean(topEnglishMovies) &&
            <Section title="top english movies" data={topEnglishMovies}/>
          }
          {Boolean(lowRatedMovies) &&
            <Section title="low movies" data={lowRatedMovies}/>
          }
          {Boolean(popularSeries) &&
            <Section title="popular series" data={popularSeries}/>
          }
          {Boolean(topSeries) &&
            <Section title="top series" data={topSeries}/>
          }
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default Home;
