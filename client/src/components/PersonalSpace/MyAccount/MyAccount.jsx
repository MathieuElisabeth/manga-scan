import React, { useState } from "react";
import { useSelector } from "react-redux";
import bcrypt from "bcryptjs";
import { updateUser } from "../../../actions/user";
import { useAppDispatch } from "../../../store";

import "./MyAccount.css";
import { api } from "../../../utils/api";

const formUser = [
  {
    name: "username",
    title: "Identifiant",
    placeholder: "Identifiant",
    type: "text",
  },
  {
    name: "email",
    title: "E-mail",
    placeholder: "E-mail",
    type: "email",
  },
  {
    name: "password",
    title: "Password",
    placeholder: "*****",
    type: "password",
  },
];

const MyAccount = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState({
    username: {
      value: user.username,
      isEditing: false,
      error: "",
    },
    email: {
      value: user.email || "",
      isEditing: false,
      error: "",
    },
    password: {
      value: "",
      isEditing: false,
      error: "",
    },
  });

  function handleChange(evt, path) {
    setUserInfo((prevState) => ({
      ...prevState,
      [path]: {
        ...prevState[path],
        value: evt.target.value,
      },
    }));
  }

  function handleEditing(path) {
    setUserInfo((prevState) => ({
      ...prevState,
      [path]: {
        ...prevState[path],
        isEditing: true,
      },
    }));
  }

  function cancelEdition(path) {
    setUserInfo((prevState) => ({
      ...prevState,
      [path]: {
        value: prevState[path].value || "",
        isEditing: false,
      },
    }));
  }

  function isEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  function getError(path) {
    if (userInfo[path].value.trim() === "") {
      setUserInfo((prevState) => ({
        ...prevState,
        [path]: {
          ...prevState[path],
          error: "Champ vide",
        },
      }));

      return false;
    }

    if (path === "email" && !isEmail(path)) {
      setUserInfo((prevState) => ({
        ...prevState,
        email: {
          ...prevState.email,
          error: "Veuillez rentrer un email valide",
        },
      }));

      return false;
    }

    return true;
  }

  function isPasswordValid() {
    if (userInfo.password.length < 5) {
      setUserInfo((prevState) => ({
        ...prevState,
        password: {
          ...prevState.password,
          error: "Votre mot de passe doit faire minimum 5 caractères",
        },
      }));

      return false;
    }

    return true;
  }

  function saveNewInfo(path) {
    if (!getError(path)) return;

    if (path === "password" && !isPasswordValid()) return;
    let data = { [path]: userInfo[path].value };

    if (path === "password") {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(userInfo[path].value, salt);
      data.password = hashPassword;
    }

    api
      .put(
        `${import.meta.env.VITE_API_URL}/api/user/profile`,
        data
      )
      .then((res) => {
        if (path !== "password") dispatch(updateUser(data));
        setUserInfo((prevState) => ({
          ...prevState,
          [path]: {
            ...prevState[path],
            isEditing: false,
            error: "",
          },
        }));
      })
      .catch((err) => {
        if (err.response?.data.field) {
          setUserInfo((prevState) => ({
            ...prevState,
            [err.response.data.field]: {
              ...prevState[err.response.data.field],
              isEditing: false,
              error: err.response.data.message,
            },
          }));
        }
      });
  }

  return (
    <div className="MyAccount">
      <div>
        <h1>Mon compte</h1>
        {formUser.map((item) => (
          <div className="MY-Box">
            <div>
              <label htmlFor="pseudo">{item.title}</label>
              <div className="field">
                <input
                  type={item.type}
                  placeholder={item.placeholder}
                  name={item.name}
                  value={userInfo[item.name].value}
                  onChange={(evt) => handleChange(evt, item.name)}
                  disabled={!userInfo[item.name].isEditing}
                />
                <div className="editTools">
                  {userInfo[item.name].isEditing ? (
                    <>
                      <i
                        className="fas fa-save"
                        onClick={() => saveNewInfo(item.name)}
                      ></i>
                      <i
                        className="fas fa-times-circle"
                        style={{ marginLeft: "10px" }}
                        onClick={() => cancelEdition(item.name)}
                      ></i>
                    </>
                  ) : (
                    <div onClick={() => handleEditing(item.name)}>
                      <i className="fas fa-edit"></i>
                    </div>
                  )}
                </div>
              </div>
              <div className="erroMessage">{userInfo[item.name].error}</div>
              {item.name === "username" && (
                <p>
                  ⚠️Attention! Si vous le changez ça sera votre nouvel
                  identifiant de connexion
                </p>
              )}
            </div>
          </div>
        ))}
        {/* <button className='Btn-SaveChange'>Enregistrer</button> */}
      </div>
    </div>
  );
};

export default MyAccount;
