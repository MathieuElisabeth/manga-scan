import React, { useState, useEffect } from 'react'

import './Homepage.css'
import Navbar from '../Navbar/Navbar'
import Banner from './Banner/Banner'
import LastRelease from './LastReleasePopular/LastReleasePopular'
import LastUpdate from './LastUpdate/LastUpdate'
import axios from 'axios'

const Homapage = () => {
  const [mangaList, setMangaList] = useState([])

  useEffect(() => {
      axios.get(`${process.env.REACT_APP_API_URL}/api/manga`)
          .then(res => {
              setMangaList([...res.data])
          })
  }, [])

  const [scrolled,setScrolled] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
      if(offset > 200 ){
        setScrolled(true);
      }
      else{
        setScrolled(false);
      }
  }

  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
  })
  let navbarClasses = ['Navbar'];
  if(scrolled) {
    navbarClasses.push('scrolled');
  }

  return (
    <div className='Homepage'>
      <Navbar navClasse={navbarClasses.join(" ")}/>
      <Banner mangas={mangaList}/>
      <LastRelease mangas={mangaList}/>
      <LastUpdate mangas={mangaList}/>
    </div>
  )
}

export default Homapage
