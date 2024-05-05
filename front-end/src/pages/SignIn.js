import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGooglePopup,
} from "../firebase.utils";
import { userAdded } from "../store/onboardingSlice";
import { useDispatch } from "react-redux";

function SignIn() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    // if (loading) {
    //   // maybe trigger a loading screen
    //   return;
    // }
    if (user) navigate("/home");
  }, [user, loading]);

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);

    dispatch(userAdded(response));
    navigate("/");
  };

  return (
    <div className="container justify-center text-center">
      <h1 className="my-12">Entrar</h1>
      <div className="flex-row mb-8">
        <label htmlFor="username-input">Usuário:</label>
        <input
          className="p-2"
          id="username-input"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex-row mb-8">
        <label htmlFor="password-input">Senha:</label>
        <input
          className="p-2"
          id="password-input"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex-row mb-8">
        <button
          onClick={async () => {
            await logInWithEmailAndPassword(username, password);
            navigate("/");
          }}
        >
          Entrar com e-mail
        </button>
      </div>

      <div className="flex-row mb-8">
        <button onClick={() => logGoogleUser()}>Entrar com Google</button>
      </div>
    </div>
  );
}

export default SignIn;
