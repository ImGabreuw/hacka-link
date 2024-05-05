import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  registerWithEmailAndPassword,
  signInWithGooglePopup,
} from "../firebase.utils";
import { userAdded } from "../store/onboardingSlice";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);

    dispatch(userAdded(response));
    navigate("/onboarding");
  };

  return (
    <div className="container justify-center text-center">
      <div className="flex justify-center">
        <img className="w-64" src="./explica-ai-logo.png"></img>
      </div>
      <h1 className="my-12 text-xl">Criar conta</h1>

      <div className="flex-row mb-8">
        <label htmlFor="username-input">Nome:</label>
        <input
          className="p-2 w-60 ml-2 bg-gray-200 rounded-md"
          id="name-input"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex-row mb-8">
        <label htmlFor="username-input">E-mail:</label>
        <input
          className="p-2 w-60 ml-2 bg-gray-200 rounded-md"
          id="username-input"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex-row mb-8">
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
          style={{ backgroundColor: "#FEBE5B" }}
          className="rounded-full px-10 py-4 text-white"
          onClick={async () => {
            await registerWithEmailAndPassword(name, username, password);
            navigate("/onboarding");
          }}
        >
          Criar com e-mail
        </button>
      </div>

      <div className="flex-row mb-8">
        <button
          style={{ backgroundColor: "#FEBE5B" }}
          className="rounded-full px-10 py-4 text-white"
          onClick={() => logGoogleUser()}
        >
          {" "}
          <i className="fa-brands fa-google mr-2"></i> Criar com Google
        </button>
      </div>
    </div>
  );
}

export default SignUp;
