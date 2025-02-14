import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useMediaQuery } from "../../../hook/useMediaQuery";

import "./LastReleasePopular.css";
import Manga from "../../Manga/Manga";
import MangaSkeleton from "../../MangaSkeleton/MangaSkeleton";

const LastRelease = ({ mangas }) => {
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const large = useMediaQuery("(max-width: 940px)");
  const medium = useMediaQuery("(max-width: 736px)");
  const small = useMediaQuery("(max-width: 580px)");
  const mini = useMediaQuery("(max-width: 376px)");

  if (mini) {
    settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  } else if (small) {
    settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
  } else if (medium) {
    settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };
  } else if (large) {
    settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
  }

  return (
    <div className="LastRelease">
      <div className="LR-Container">
        <h1>Les dernières sorties</h1>
        {mangas ? (
          <Slider {...settings}>
            {mangas.map((manga) => (
              <Manga
                key={manga.id}
                id={manga.id}
                name={manga.name}
                image={manga.image}
                url={`/manga/${manga.id}`}
              />
            ))}
          </Slider>
        ) : (
          <Slider {...settings}>
            {Array.from(Array(5).keys()).map((item) => (
              <MangaSkeleton key={`item-${item}`} />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default LastRelease;
