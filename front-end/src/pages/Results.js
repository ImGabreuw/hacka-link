import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.utils";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Results() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState(null);
  const [loadingData, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log("@location", location);
      let payload = {
        username: location.state.username,
      };

      let path = "";

      if (location.state.imageEncoded) {
        payload = { ...payload, imageEncoded: location.state.imageEncoded };
        path = "image";
      } else if (location.state.promptText) {
        payload = { ...payload, text: location.state.promptText };
        path = "text";
      }

      const res = axios.post(
        `http://localhost:3000/generation/${path}`,
        payload
      );
      setData((await res).data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && !user) return navigate("/");
  }, [user, loading]);

  useEffect(() => {}, []);
  if (loadingData)
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        <i class="fa-solid fa-circle-notch fa-spin"></i>
      </div>
    );
  return (
    <div className="container justify-center text-center">
      <div className="flex justify-center">
        <img className="w-64" src="./explica-ai-logo.png"></img>
      </div>
      <div >
        <p className="text-lg mx-4 mt-20"> Prompt: {location.state.promptText || "Imagem"}</p>
      </div>
      <div>
        <p className="text-lg mx-4 mt-20">{data}</p>
      </div>
    </div>
  );
}

export default Results;
