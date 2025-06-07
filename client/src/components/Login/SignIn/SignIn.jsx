import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import { login } from "../../../actions/user";

import "./SignIn.css";

import Navbar from "../../Navbar/Navbar";
import { api } from "../../../utils/api";

const SignIn = ({ history }) => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameChanged = (evt) => {
    setUsername(evt.target.value);
  };

  const passwordChanged = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    api
      .post(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
        username,
        password,
      })
      .then((res) => {
          const { username, email, bookmarks } = res.data;
          dispatch(login(username, email, bookmarks));
          setUsername("");
          setPassword("");
          history.push("/");
      })
      .catch((err) => {
        alert("Incorrect username or password");
      });
  };

  return (
    <div>
      <div className="SignIn">
        <Navbar navClasse="scrolled" />
        <div className="SI-Container">
          <div className="SI-Form">
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
                <Link
                  to={"/reset-password"}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <p>Mot de passe oublié ?</p>
                </Link>
              </div>
              <button type="submit" class="Btn-Connexion">
                Connexion
              </button>
            </form>
            <Link
              to={"/signup"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <p>
                Pas encore de compte ? <span>Inscrivez-vous !</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
