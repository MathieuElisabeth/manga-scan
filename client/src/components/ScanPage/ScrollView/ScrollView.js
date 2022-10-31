import React from 'react'

import'./ScrollView.css'

const ScrollView = ({ manga, chapter, pages, nextChap, prevChap}) => {
  return (
    <div className='ScrollView'>
      <div className='SV-Container'>
        <div className='MangaTools'>
          <button 
            className='Btn-Chapter' 
            onClick={prevChap}
            disabled={chapter === 1}
          >
            chapitre précédent
          </button>

          <button 
              className='Btn-Chapter' 
              onClick={nextChap}
              disabled={chapter === 10}
            >
                chapitre suivant
            </button>
          </div>
        <div className='SV-Scan'>
          {
            pages.map((page, index) => (
              <img key={index} src={`data:image/jpeg; base64, ${page}`} alt=''/>
          ))}
          <div className='MangaTools'>
            <button 
              className='Btn-Chapter' 
              onClick={prevChap}
              disabled={chapter === 1}
            >
              chapitre précédent
            </button>

            <button 
              className='Btn-Chapter' 
              onClick={nextChap}
              disabled={chapter === 10}
            >
              chapitre suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrollView
