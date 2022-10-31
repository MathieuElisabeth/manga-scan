import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { mangaInfo } from '../../../actions/mangaInfo'
import { useAppDispatch } from '../../../store'

import './Banner.css'

const Banner = ({ mangas }) => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const [randomManga, setRandomManga] = useState()

  useEffect(() => {
    setRandomManga(mangas[Math.floor(Math.random() * mangas.length)]);
  }, [mangas])  


  const redirectToManga = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/manga/${randomManga?.id}`)
        .then(res => {
            dispatch(mangaInfo(res.data))
            history.push(`/manga/${randomManga?.id}`)
        })
  }
  // const truncate = (str) => {
  //   return (str.length > 160) ? str.substr(0, 160-1) + '...' : str;
  // };

  return (
    <div className='Banner'>
      {
        randomManga && (
          <>
            <div className='BannerInfo'>
              <p>{randomManga?.name}</p>
              <div className='BannerBtn' >
                <div onClick={redirectToManga}>
                  <button>Voir la fiche</button>
                </div>
              </div>
            </div>
            <div className='BannerCover'>
              <img className='BannerImage' src={randomManga?.banner} alt='' />
            </div>
          </>
        )
      }
    </div>
  )
}

export default Banner
