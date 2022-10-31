import React from 'react'

import './Mangas.css'
import Navbar from '../Navbar/Navbar'
import MangasList from './MangasList/MangasList'

const Mangas = () => {
  return (
    <div className='Mangas'>
      <Navbar navClasse='scrolled'/>
      <MangasList/>
    </div>
  )
}

export default Mangas;