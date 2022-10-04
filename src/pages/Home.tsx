import React, { useEffect, useRef, useState } from 'react';
import Wrapper from './Wrapper';
import { BoxOfficeTitles } from '../constants/Titles';
import { Carousel } from '@mantine/carousel';
import HeroCard from '../components/HeroCard';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Autoplay from 'embla-carousel-autoplay';

const { Slide } = Carousel;

const Home = (): JSX.Element => {
  const [heroData, setHeroData] = useState<BoxOfficeTitles>();
  const autoplay = useRef(Autoplay({ delay: 2000 }));

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
    fetch('https://moviesdatabase.p.rapidapi.com/titles/?info=custom_info&list=top_boxoffice_last_weekend_10', headerOptions)
      .then(async response => await response.json())
      .then(response => setHeroData(response))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchHeroTitles();
  }, []);

  return (
    <Wrapper>
      <Carousel
        mx="auto"
        withIndicators
        controlSize={48}
        nextControlIcon={<BsChevronRight size={20}/>}
        previousControlIcon={<BsChevronLeft size={20}/>}
        loop
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
    </Wrapper>
  );
};

export default Home;
