import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.utils";
import { useNavigate } from "react-router-dom";

import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

const CONTENT_STYLES = ["Storytelling", "Cinestésico"];

function SearchInit() {
  const [promptText, setPromptText] = useState("");
  const [promptImage, setPromptImage] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) return navigate("/");
  }, [user, loading]);

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log(dataUri);
  }
  return (
    <div className="container text-center px-4">
       {cameraOpen && <Camera
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri);
        }}
      />}
      <h1 className="my-10 text-xl">O que você quer aprender hoje?</h1>
      <div className="flex-row">
        { !cameraOpen &&
        <textarea
          placeholder="Respiração celular"
          className="h-32 w-full rounded-md shadow-md shadow-gray-300 p-2"
        ></textarea>}
      </div>
      <div className="flex-row mt-2">
        <button
          onClick={() => setCameraOpen(!cameraOpen)}
          style={{ position: "absolute", top: 170, right: 30 }}
          className="rounded-md bg-purple-500 px-10 py-4 text-white"
        >
          <i className="fa-solid fa-camera"></i>
        </button>
      </div>
      <h2 className="my-10 text-lg"> Como? </h2>
      <div className="flex-row">
        {CONTENT_STYLES.map((style) => (
          <div className="rounded-md shadow-md shadow-gray-300 h-28 text-center flex justify-center">
            <p className="self-center">{style}</p>
          </div>
        ))}
      </div>
      <div className="flex-row mt-10">
        <button className="rounded-md bg-purple-500 px-10 py-4 text-white">
          Aprender
        </button>
      </div>
    </div>
  );
}

export default SearchInit;
