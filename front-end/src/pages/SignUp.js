import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerWithEmailAndPassword, signInWithGooglePopup } from "../firebase.utils";
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
      <h1 className="my-12">Criar conta</h1>

      <div className="flex-row mb-8">
        <label htmlFor="username-input">Name:</label>
        <input
          className="p-2"
          id="name-input"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex-row mb-8">
        <label htmlFor="username-input">E-mail:</label>
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
        <button onClick={async() => {
            await registerWithEmailAndPassword(name, username, password);
            navigate("/onboarding")
        }}>Criar com e-mail</button>
      </div>

      <div className="flex-row mb-8">
        <button onClick={() => logGoogleUser()}>Criar com Google</button>
      </div>
    </div>
  );
}

export default SignUp;
