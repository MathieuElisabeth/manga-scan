import React, { useEffect, useState } from "react";

import "./MyMangas.css";

import Manga from "../../Manga/Manga";
import { useSelector } from "react-redux";
import { api } from "../../../utils/api";

const MyMangas = () => {
  const user = useSelector((state) => state.user);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    api
      .get(
        `${import.meta.env.VITE_API_URL}/api/user/bookmarks`
      )
      .then((res) => {
        setBookmarks(res.data);
      });
  }, []);
  return (
    <div className="MyMangas">
      <div className="MY-Mangas">
        <h1>Mes Mangas</h1>
        <div className="MY-Fav">
          {/* <h2>Favoris</h2> */}
          <div className="MangaFav">
            {bookmarks?.map((manga, index) => (
              <Manga
                key={index}
                id={manga.id}
                name={manga.name}
                image={manga.image}
                url={`/manga/${manga.id}`}
              />
            ))}
          </div>
        </div>
        {/* <div className='MY-Read'>
          <h2>À lire</h2>
          <div className='MangaToRead'>
            {MangaRead.map((manga, index) =>
              <Manga key={index} id={manga.id} name={manga.name} image={manga.image} url={`/manga/${manga.id}`} />
              )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MyMangas;
