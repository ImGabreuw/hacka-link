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
    if (user) navigate("/");
  }, [user, loading]);

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);

    dispatch(userAdded(response));
    navigate("/");
  };

  return (
    <div className="container justify-center text-center">
      <div className="flex justify-center">
        <img className="w-64" src="./explica-ai-logo.png"></img>
      </div>
      <h1 className="my-12 text-xl">Entrar</h1>
      <div className="flex-row mb-8">
        <label htmlFor="username-input">E-mail:</label>
        <input
          className="p-2 w-60 ml-2 bg-gray-200 rounded-md"
          id="username-input"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex-row mb-12">
        <label htmlFor="password-input">Senha:</label>
        <input
          className="p-2 w-60 ml-2 bg-gray-200 rounded-md"
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
          style={{ backgroundColor: "#FEBE5B" }}
          className="rounded-full px-10 py-4 text-white"
        >
          Entrar com e-mail
        </button>
      </div>

      <div className="flex-row mb-8">
        <button
          style={{ backgroundColor: "#FEBE5B" }}
          className="rounded-full px-10 py-4 text-white"
          onClick={() => logGoogleUser()}
        >
           <i className="fa-brands fa-google mr-2"></i> Entrar com Google
        </button>
      </div>
    </div>
  );
}

export default SignIn;
