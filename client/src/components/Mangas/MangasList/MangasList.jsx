import React, { useState, useEffect } from "react";

import "./MangasList.css";
import Manga from "../../Manga/Manga";
import axios from "axios";

const genresManga = [
  "Action",
  "Art Martial",
  "Aventure",
  "Comédie",
  "Drame",
  "Ecchi",
  "Fantastique",
  "Fantasy",
  "Historique",
  "Horreur",
  "Mature",
  "Mystère",
  "Psychologique",
  "Romance",
  "School Life",
  "Science-fiction",
  "Slice of Life",
  "Sport",
  "Surnaturel",
  "Thriller",
  "Tragique",
];

const typesManga = ["Seinen", "Shōnen", "Shojo", "Yaoi", "Yuri"];

const MangasList = ({ mangas }) => {
  const [mangaList, setMangaList] = useState(mangas);
  const [search, setSearch] = useState("");
  const [filterShow, setFilterShow] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [activeFilterType, setActiveFilterType] = useState([]);
  const [activeFilterGenre, setActiveFilterGenre] = useState([]);
  const [activeFilterYear, setActiveFilterYear] = useState([]);
  const [activeFilterStatut, setActiveFilterStatut] = useState([]);
  const regex = new RegExp(search, "i");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/manga`).then((res) => {
      setMangaList(res.data);
    });
  }, []);

  const mangaFilterHandler = (event) => {
    setSearch(event.target.value);
  };

  const onFilterTypeChange = (filter) => {
    const t = filter.target.name;
    if (activeFilterType.includes(t)) {
      const filterIndex = activeFilterType.indexOf(t);
      let newFilter = [...activeFilterType];
      newFilter.splice(filterIndex, 1);
      setActiveFilterType(newFilter);
    } else {
      const filterType = [...activeFilterType, t];
      setActiveFilterType(filterType);
    }
  };

  const onFilterGenreChange = (filter) => {
    const g = filter.target.name;
    if (activeFilterGenre.includes(g)) {
      const filterIndex = activeFilterGenre.indexOf(g);
      const newFilter = [...activeFilterGenre];
      newFilter.splice(filterIndex, 1);
      setActiveFilterGenre(newFilter);
    } else {
      const filterGenre = [...activeFilterGenre, g];
      setActiveFilterGenre(filterGenre);
    }
  };

  const onFilterYearChange = (filter) => {
    const y = filter.target.value;
    const filterYear = [y];
    setActiveFilterYear(filterYear);
  };

  const onFilterStatutChange = (filter) => {
    const s = filter.target.value;
    if (activeFilterStatut.includes(s)) {
      const filterIndex = activeFilterStatut.indexOf(s);
      const newFilter = [...activeFilterStatut];
      newFilter.splice(filterIndex, 1);
      setActiveFilterStatut(newFilter);
    } else {
      const filterStatut = [...activeFilterStatut, s];
      setActiveFilterStatut(filterStatut);
    }
  };

  let classFilter = [];
  if (filterShow) {
    classFilter = ["FilterActived"];
  } else {
    classFilter = [""];
  }

  const showFilterHandler = () => {
    setFilterShow((prevState) => !prevState);
  };

  let maxYear = 1990;
  let endYear = new Date().getFullYear();

  let options = [];

  for (let i = endYear; i > maxYear; i--) {
    options.push(i);
  }

  const filterByType = (mangas) => {
    if (activeFilterType.length === 0) return mangas;
    return mangas.filter((item) => activeFilterType.includes(item.type));
  };

  const filterByGenre = (mangas) => {
    if (activeFilterGenre.length === 0) return mangas;
    return mangas.filter((item) =>
      activeFilterGenre.every((genre) => item.genres.includes(genre))
    );
  };

  const filterByStatut = (mangas) => {
    if (activeFilterStatut.length === 0) return mangas;
    return mangas.filter((item) => {
      if (activeFilterStatut.length === 2) {
        return true;
      }
      if (activeFilterStatut.includes("in_progress")) {
        return item.in_progress;
      }
      if (activeFilterStatut.includes("finish")) {
        return item.in_progress && false;
      }
      return true;
    });
  };

  const filterByYear = (mangas) => {
    if (activeFilterYear.length === 0) return mangas;
    return mangas.filter((item) =>
      item.year.toString().includes(activeFilterYear)
    );
  };

  useEffect(() => {
    let mangaFilter = mangaList;

    mangaFilter = filterByType(mangaFilter);
    mangaFilter = filterByGenre(mangaFilter);
    mangaFilter = filterByStatut(mangaFilter);
    mangaFilter = filterByYear(mangaFilter);

    setFilteredList(mangaFilter);
  }, [
    activeFilterGenre,
    activeFilterType,
    activeFilterStatut,
    activeFilterYear,
    mangaList,
  ]);

  return (
    <div className="MangaList">
      <h1>Liste des Mangas</h1>
      <div className="MangaSearch">
        <div className="MS-Input">
          <input
            onChange={mangaFilterHandler}
            type="text"
            placeholder="Chercher un manga..."
          />
          <i className="fas fa-search"></i>
        </div>
        <div className="Btn-Filter" onClick={showFilterHandler}>
          Filtre
          <i className="fas fa-filter"></i>
        </div>
      </div>
      <div className={`ML-Filter ${classFilter}`}>
        <h3>Type</h3>
        <div className="FilterByType">
          {typesManga.map((type, index) => (
            <div className="FilterName">
              <input
                onChange={onFilterTypeChange}
                type="checkbox"
                id={type}
                key={parseInt(index) * 2}
                value={type}
                name={type}
              />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
        </div>
        <h3>Genre</h3>
        <div className="FilterByGenre">
          {genresManga.map((genre, index) => (
            <div className="FilterName">
              <input
                onChange={onFilterGenreChange}
                type="checkbox"
                id={genre}
                key={parseInt(index) * 3}
                name={genre}
              />
              <label htmlFor={genre}>{genre}</label>
            </div>
          ))}
        </div>

        <div className="FilterByYearStatut">
          <div className="FilterByYear">
            <h3>Année de sortie</h3>
            <div className="FilterName">
              <select onChange={onFilterYearChange}>
                <option value="all"> </option>
                {options.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="FilterByStatut">
            <h3>Statut</h3>
            <div>
              <div className="FilterName">
                <input
                  onChange={onFilterStatutChange}
                  type="checkbox"
                  id="EnCours"
                  value="in_progress"
                  name="EnCours"
                />
                <label htmlFor="EnCours">En Cours</label>
              </div>
              <div className="FilterName">
                <input
                  onChange={onFilterStatutChange}
                  type="checkbox"
                  id="fini"
                  value="finish"
                  name="fini"
                />
                <label htmlFor="fini">Terminé</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ML-Container">
        {filteredList
          ?.filter((manga) => regex.test(manga.name))
          .map((manga, index) => (
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
  );
};

export default MangasList;
