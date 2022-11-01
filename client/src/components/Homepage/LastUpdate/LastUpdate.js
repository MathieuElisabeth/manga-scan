import React from 'react';
import Slider from "react-slick";
import { useMediaQuery } from '../../../hook/useMediaQuery'

import './LastUpdate.css'

import Manga from '../../Manga/Manga'
import MangaSkeleton from '../../MangaSkeleton/MangaSkeleton';

const MangaSlide = ({ mangas }) => {
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };

  const large = useMediaQuery('(max-width: 940px)')
  const medium = useMediaQuery('(max-width: 736px)')
  const small = useMediaQuery('(max-width: 580px)')
  const mini = useMediaQuery('(max-width: 376px)')



  if (mini) {
    settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
  }else if (small) {
    settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1
    };
  } else if (medium) {
    settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
  } else if (large) {
    settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
    };
  }


  return (
    <div className='NewManga'>
      <div className='NM-Container'>
        <h1>Manga Populaires</h1>
          {
            mangas ? (
              <Slider {...settings}>
              {mangas
                .sort((a,b) => b.views - a.views)
                .map((manga, index) => (
                <Manga 
                  key={index} 
                  name={manga.name} 
                  image={manga.image} 
                  url={`/manga/${manga.id}/10/1`} 
                />
              ))}
              </Slider>
              
            ) : (
              <Slider {...settings}>
                {
                  Array.from(Array(5).keys())
                    .map(item => (
                      <MangaSkeleton/>
                    ))
                }
              </Slider>
            )
          }
    
      </div>
    </div>
  )
}

export default MangaSlide;
