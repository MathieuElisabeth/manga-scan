import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import "./ScanPage.css";
import Navbar from "../Navbar/Navbar";
import ScrollView from "./ScrollView/ScrollView";
import axios from "axios";

const ScanPage = withRouter(({ match, location, history }) => {
  const {
    params: { mangaId, chapter, page },
  } = match;
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(page));

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/manga/${mangaId}/${chapter}`)
      .then((res) => {
        const myImages = [...res.data];
        setPages(myImages);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setCurrentPage(parseInt(page));
  }, [page, chapter]);

  const previousPageHandler = () => {
    if (currentPage - 1 === 0) {
      if (chapter === "1") {
        history.push(`/manga/${mangaId}`);
      } else {
        history.push(`/manga/${mangaId}/${parseInt(chapter) - 1}/1`);
      }
    } else {
      history.push(`/manga/${mangaId}/${chapter}/${currentPage - 1}`);
    }
  };

  const nextPageHandler = () => {
    if (currentPage + 1 > pages.length) {
      if (chapter === "10") {
        history.push(`/manga/${mangaId}`);
      } else {
        history.push(`/manga/${mangaId}/${parseInt(chapter) + 1}/1`);
      }
    } else {
      history.push(`/manga/${mangaId}/${chapter}/${currentPage + 1}`);
    }
  };

  const handleKeyDown = (e) => {
    if (!toggleView) {
      if (e.keyCode === 37) {
        // left arrow
        previousPageHandler();
      } else if (e.keyCode === 39) {
        // right arrow
        nextChapterHandler();
      }
    }
  };

  const changePageHandler = (evt) => {
    history.push(`/manga/${mangaId}/${chapter}/${evt.target.value}`);
  };

  const backToMangaHandler = () => {
    history.push(`/manga/${mangaId}`);
  };

  const prevChapterHandler = () => {
    history.push(`/manga/${mangaId}/${parseInt(chapter) - 1}/1`);
  };

  const nextChapterHandler = () => {
    history.push(`/manga/${mangaId}/${parseInt(chapter) + 1}/1`);
  };

  const [toggleView, setToggleView] = useState(false);

  const toggleViewScroll = () => {
    setToggleView((prevSate) => !prevSate);
  };

  return (
    <div className="ScanPage" onKeyDown={handleKeyDown} tabIndex="0">
      <Navbar navClasse="scrolled" />
      <div className="Btn-Toggle">
        <button className="BackToManga" onClick={backToMangaHandler}>
          <i className="far fa-arrow-alt-circle-left"></i>Retour
        </button>
        <label className="switch">
          <input type="checkbox" onClick={toggleViewScroll} />
          <span className="slider round"></span>
        </label>
      </div>
      {!toggleView ? (
        <>
          <div className="Page">
            <div className="Pa-Container">
              <div className="MangaTools">
                <button
                  className="Btn-Chapter"
                  onClick={prevChapterHandler}
                  disabled={chapter === 1}
                >
                  chapitre précédent
                </button>
                <div>
                  <label htmlFor="page-select">Page:</label>
                  <select
                    name="page"
                    id="page-select"
                    onChange={changePageHandler}
                  >
                    <option value="">{page}</option>
                    {Array.from({ length: pages.length }, (_, i) => i + 1).map(
                      (p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <button
                  className="Btn-Chapter"
                  onClick={nextChapterHandler}
                  disabled={chapter === 10}
                >
                  chapitre suivant
                </button>
              </div>

              <div className="SinglePage">
                <div className="LayerPage">
                  <div className="PrevPage" onClick={previousPageHandler}></div>
                  <div className="NextPage" onClick={nextPageHandler}></div>
                </div>
                {pages && (
                  <img
                    src={`data:image/jpeg; base64, ${pages[currentPage - 1]}`}
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>
          <button className="Btn-Prev" onClick={previousPageHandler}>
            <i class="fas fa-arrow-left"></i>
          </button>

          <button className="Btn-Next" onClick={nextPageHandler}>
            <i class="fas fa-arrow-right"></i>
          </button>
        </>
      ) : (
        <ScrollView
          manga={mangaId}
          chapter={chapter}
          pages={pages}
          nextChap={nextChapterHandler}
          prevChap={prevChapterHandler}
        />
      )}
    </div>
  );
});

export default ScanPage;
