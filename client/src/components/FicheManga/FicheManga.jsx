import React, { useEffect, useState } from "react";

import "./FicheManga.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { mangaInfo } from "../../actions/mangaInfo";
import { addBookmark, removeBookmark } from "../../actions/user";
import { api } from "../../utils/api";

const FicheManga = ({ match, location }) => {
  const {
    params: { mangaId },
  } = match;
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const manga = useSelector((state) => state.mangaInfo);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (manga.name === "") {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/manga/${mangaId}`)
        .then((res) => {
          dispatch(mangaInfo(res.data));
        });
    }
  }, []);

  const chapterFilterHandler = (event) => {
    setSearch(event.target.value);
  };

  const handleFavorite = () => {
    if (!user.username || !manga._id) {
      console.log("Invalid request");
      return;
    }
    api
      .post(`${import.meta.env.VITE_API_URL}/api/user/bookmarks`, {
        mangaId: manga._id,
      })
      .then((res) => {
        if (user.bookmarks.indexOf(manga._id) !== -1) {
          dispatch(removeBookmark(manga._id));
        } else {
          dispatch(addBookmark(manga._id));
        }
      });
  };

  return (
    <div className="FicheManga">
      <Navbar navClasse="scrolled" />
      <div className="FM-Header">
        <div className="FM-HeaderManga">
          <div className="FM-MangaCover">
            <img src={`data:image/jpeg; base64, ${manga.thumbnail}`} alt="" />
          </div>
          {/* <p>Dernier chapitre:</p>
            <p>{manga.lastScan}</p> */}
        </div>
        <div className="FM-HeaderInfo">
          <div className="InfoList">
            <h3>{manga.name}</h3>
            <ul>
              <li>Statut: {manga.in_progress ? "En cours" : "Fini"}</li>
              <li>Date: {manga.year}</li>
              <li>Type(s): {manga.type}</li>
              <li>Genre(s): {manga.genres.join(", ")}</li>
              <li>Artiste(s): {manga.artiste}</li>
              <li>Auteur(s): {manga.author}</li>
              <li>Adaptation animé: {manga.is_anime ? "Oui" : "Non"}</li>
            </ul>
          </div>
          <div className="Resume">
            <h2>Synopsis:</h2>
            <p>{manga.description}</p>
            <div className="SpecialTools">
              <Link
                to={`/manga/${manga.slug}/1/1`}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <button className="Btn-StartRead">Commencer à lire</button>
              </Link>
              <div>
                <div onClick={handleFavorite}>
                  <i
                    className={`${
                      user?.bookmarks.indexOf(manga._id) !== -1 ? "fas" : "far"
                    } fa-bookmark`}
                    title="À lire"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="FM-Main">
        <h1>Liste des Chapitres</h1>
        <div className="FM-Input">
          <input
            onChange={chapterFilterHandler}
            type="text"
            placeholder="Chercher un chapitre..."
          />
          <i className="fas fa-search"></i>
        </div>
        <div className="ChapterList">
          {Array.from({ length: 10 }, (_, i) => i + 1)
            .filter((chap) => chap.toString().includes(search))
            .map((m, i) => (
              <Link
                key={i}
                to={`/manga/${manga.slug}/${m}/1`}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <div className="ChapterBox">
                  <p>
                    Chap.<span>{m}</span>
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FicheManga;
