import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import './SignUp.css'

import Navbar from '../../Navbar/Navbar'
import axios from 'axios';

const SignUp = ({ history }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const usernameChanged = (evt) => {
      setUsername(evt.target.value)
  }

  const passwordChanged = (evt) => {
      setPassword(evt.target.value)
  }

  const emailChanged = (evt) => {
      setEmail(evt.target.value)
  }

  const handleSubmit = evt => {
      evt.preventDefault()
      axios.post(
          `${process.env.REACT_APP_API_URL}/api/user/signup`,
          {
              username,
              password,
              email
          }
      ).then(res => {
          setUsername('')
          setPassword('')
          setEmail('')
          history.push('/signin')
      })
      .catch(err => alert(err))

  }

  return (
    <div className='SignUp'>
      <Navbar navClasse='scrolled'/>
      <div className='SU-Container'>
      <div class="SU-Form">
        <form onSubmit={handleSubmit}>
          <div class="FormPseudo">
            <label for="pseudo">Identifiant</label>
            <input
              required
              type="text"
              placeholder="Votre identifiant"
              name="pseudo"
              value={username} 
              onChange={usernameChanged}
            />
          </div>
          <div class="FormMail">
            <label for="email">E-Mail</label>
            <input
              required
              type="email"
              placeholder="Votre e-mail"
              name="e-mail"
              value={email} 
              onChange={emailChanged}
            />
          </div>
          <div class="FormPassword">
            <label for="mdp">Mot de passe</label>
            <input
              required
              type="password"
              placeholder="Votre mot de passe"
              name="mdp"
              value={password} 
              onChange={passwordChanged}
            />
          </div>
          {/* <div class="FormPassword">
            <label for="mdp">Confirmez votre mot de passe</label>
            <input required type="password" placeholder="Confirmez votre mot de passe" name="mdp"/>
          </div> */}
          <button type="submit" class="Btn-Connexion">Inscription</button>
        </form>
        <Link to={'/signin'} style={{ color: 'inherit', textDecoration: 'inherit'}}>
         <p>Déjà inscrit ? <span>Connectez-vous !</span></p>
        </Link>
       </div>
      </div>
    </div>
  )
}

export default SignUp
