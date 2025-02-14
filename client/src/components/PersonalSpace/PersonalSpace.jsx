import React, { useState } from 'react'

import './PersonalSpace.css'

import Navbar from '../Navbar/Navbar'
import MyAccount from './MyAccount/MyAccount'
import MyMangas from './MyMangas/MyMangas'
import { useAppDispatch } from '../../store'
import { logout } from '../../actions/user'

const PersonalSpace = () => {
  const dispatch = useAppDispatch()
  const [displayPersonalSpace, setDisplayPersonalSpace] = useState(1)

  return (
    <div className='PersonalSpace'>
      <Navbar navClasse='scrolled'/>
      <div className=' MyList'>
        <ul>
          <li
            id='1'
            className={`${displayPersonalSpace === 1 ? 'active' : ''}`}
            onClick={() => setDisplayPersonalSpace(1)}
          >
            <p>Mon Compte</p>
            <i className="fas fa-user"></i>
          </li>
          <li
            id='2' 
            className={`${displayPersonalSpace === 2 ? 'active' : ''}`}
            onClick={() => setDisplayPersonalSpace(2)}
          >
            <p>Mes Mangas</p>
            <i className="fas fa-book-reader"></i>
          </li>
          <li className='Btn-Logout' onClick={() => dispatch(logout())}>
            <p>Deconnexion</p>
            <i className="fas fa-sign-out-alt"></i>
          </li>
        </ul>
      </div>
        {
          displayPersonalSpace === 1 
            ? <MyAccount/> 
            : <MyMangas/>
        }

    </div>
  )
}

export default PersonalSpace
  