import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../firebase.utils";
import { useNavigate } from "react-router-dom";

import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import axios from "axios";

const CONTENT_STYLES = ["Storytelling", "Cinestésico"];

function SearchInit() {
  const [promptText, setPromptText] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [contentStyle, setContentStyle] = useState("");

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!loading && !user) return navigate("/sign-in");
  }, [user, loading]);

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log(dataUri);
    setPhoto(dataUri);
    setCameraOpen(false);
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user-profile", {
          params: { username: user.displayName },
        });

        console.log("@Response", response);
        setUserData(response.data);
      } catch (e) {
        navigate("/onboarding");
      }
    };

    // if (user) fetchUserData();
  }, [user]);

  const deletePhoto = () => {
    setPhoto(null);
  };

  return (
    <div className="container text-center px-4">
      <div className="flex justify-center">
        <img className="w-64" src="./explica-ai-logo.png"></img>
      </div>
      {cameraOpen && (
        <Camera
          onTakePhoto={(dataUri) => {
            handleTakePhoto(dataUri);
          }}
          imageCompression={1}
        />
      )}

      {photo && <img src={photo} alt="image to analyze" />}
      <h1 className="my-10 text-xl">O que você quer aprender hoje?</h1>
      <div className="flex-row">
        {!cameraOpen && !photo && (
          <textarea
            placeholder="Respiração celular"
            className="h-32 w-full rounded-md shadow-md shadow-gray-300 p-2"
            onChange={(e) => setPromptText(e.target.value)}
          ></textarea>
        )}
      </div>
      <div className="flex-row mt-2">
        <button
          onClick={() => {
            setCameraOpen(!cameraOpen);
          }}
          style={{
            position: "absolute",
            top: 250,
            right: 30,
            backgroundColor: "#38B6FF",
          }}
          className="rounded-full px-10 py-4 text-white"
        >
          <i className="fa-solid fa-camera"></i>
        </button>
        {photo && (
          <button
            style={{ position: "absolute", top: 90, right: 30, color: "#fff" }}
            onClick={() => {
              deletePhoto();
              // logout();
            }}
          >
            <i class="fa-solid fa-xmark 2x"></i>
          </button>
        )}
      </div>
      {/* <h2 className="my-10 text-lg"> Como? </h2>
      <div className="flex-row">
        {CONTENT_STYLES.map((style) => (
          <div
            onClick={() => setContentStyle(style)}
            className={`rounded-md shadow-md shadow-gray-300 h-28 text-center flex justify-center ${
              contentStyle === style ? "bg-cyan-100" : ""
            }`}
          >
            <p className="self-center">{style}</p>
          </div>
        ))}
      </div> */}
      <div className="flex-row mt-10">
        <button
          onClick={async () => {
            navigate("/result", {
              state: {
                promptText: promptText,
                imageEncoded: photo,
                username: user.displayName,
              },
            });
          }}
          style={{ backgroundColor: "#FEBE5B" }}
          className="rounded-full px-10 py-4 text-white"
        >
          Aprender
        </button>
      </div>
    </div>
  );
}

export default SearchInit;
