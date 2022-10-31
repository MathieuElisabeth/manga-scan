import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './SideDrawer.css'

const sideDrawer = ({ open, closed, user, logout }) => {
  let attachedClasses = ['SideDrawer', 'Close'];

  if(open) {
    attachedClasses = ['SideDrawer', 'Open']
  }

  return (
    <React.Fragment>
      {open ? <div className='Backdrop' onClick={closed}></div> : null}
      <div className={attachedClasses.join(' ')} onClick={closed}>
        <nav>
          <ul>
            <li>
              <NavLink to={'/'} exact>Accueil</NavLink>
            </li>
            <li>
              <NavLink to={'/mangas'}>Mangas</NavLink>
            </li>
          </ul>
          <div className='Connexion'>
            {
              user.isLogged ? (
                <>
                <Link className='nav-link' to='/personal-space'>
                  <i className=" mobile-icon fas fa-user-circle"></i>
                </Link>
                <div onClick={logout}>
                  <i className=" mobile-icon fas fa-sign-out-alt "></i>
                </div>
                </>
    
              ) :(
              <>
                <Link to={'/signup'} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                  <button className='SignUP mobile-login'>S'incrire</button>
                </Link>
                <Link to={'/signin'} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                  <button className='SignIN mobile-login'>Se connecter</button>
                </Link>
              </>
              )
            }
        </div>
        </nav>
      </div>
    </React.Fragment>
  )
}

export default sideDrawer;