import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { logout } from '../../actions/user';
import { useAppDispatch } from '../../store';

import './Navbar.css'

import DrawerToggle from './SideDrawer/DrawerToggle/DrawerToggle'
import SideDrawer from './SideDrawer/SideDrawer'

const Navbar = (props) => {
  const dispatch = useAppDispatch()
  const user = useSelector(state => state.user)
  const [showSideDrawer, setShowSideDrawer] = useState(false)

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false)
  }

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((prevState) => !prevState);
  }

  return (
    <>
    <header className={props.navClasse}>
      <nav>
        <ul>
          <li>
            <NavLink to={'/'} exact activeClassName='active'>Accueil</NavLink>
          </li>
          <li>
            <NavLink to={'/mangas'} activeClassName='active'>Mangas</NavLink>
          </li>
        </ul>
      </nav>
      <div className='Connexion'>
        {
          user.isLogged ? (
            <>
            <Link className='nav-link user-icon' to='/personal-space'>
              <i className="fas fa-user-circle"></i>
            </Link>
            <div className='logout-icon'onClick={() => dispatch(logout())}>
              <i className="fas fa-sign-out-alt"></i>
            </div>
            </>

          ) : (
            <>
              <Link to={'/signup'} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <button className='SignUP'>S'incrire</button>
              </Link>
              <Link to={'/signin'} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <button className='SignIN'>Se connecter</button>
              </Link>
            </>
          )
        }
      </div>
      <DrawerToggle click={sideDrawerToggleHandler}/> 
    </header>
    <SideDrawer
      open={showSideDrawer} 
      closed={sideDrawerClosedHandler}
      user={user}
      logout={() => dispatch(logout())}
    />
    </>
  )
}

export default Navbar
