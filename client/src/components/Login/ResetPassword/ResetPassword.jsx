import React from 'react'

import './ResetPassword.css'

import Navbar from '../../Navbar/Navbar'

const SignIn = () => {
  return (
    <div>
      <div className='ResetPasssword'>
      <Navbar navClasse='scrolled'/>
      <div className='RP-Container'>
      <div class="RP-Form">
        <form action="">
          <h1>Réinitialisez votre mot de passe</h1>
          <div class="FormMail">
            <label for="email">Veuillez indiquer votre email pour modifier votre mot de passe.</label>
            <input required type="email" placeholder="Votre e-mail" name="email" />
          </div>
          <button type="submit" class="Btn-Connexion">Réinitialiser</button>
        </form>
       </div>
      </div>
    </div>
    </div>
  )
}

export default SignIn
