import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { mangaInfo } from "../../actions/mangaInfo";

import "./Manga.css";

const Manga = ({ id, name, image, url }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const redirectToManga = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/manga/${id}`).then((res) => {
      dispatch(mangaInfo(res.data));
      history.push(url);
    });
  };
  return (
    <div className="MangaCard" onClick={redirectToManga}>
      <div className="MangaContainer">
        <div className="MangaImage">
          <img src={`data:image/jpeg; base64, ${image}`} alt="" />
        </div>
        <div className="MangaInfo">
          <h3>{name}</h3>
        </div>
      </div>
    </div>
  );
};

export default Manga;
