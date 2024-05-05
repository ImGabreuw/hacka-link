import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.utils";
import axios from "axios";

const LEARNING_METHODS = [
  "Aprendo vendo - Visual",
  "Aprendo ouvindo - Auditivo",
  "Aprendo fazendo - Cinestésico",
];

const CONTENT_STYLES = [
  {
    title: "Storytelling",
    description:
      "Narração de histórias para transmitir uma mensagem, envolvendo personagens, enredo e emoções",
  },
  {
    title: "Mindmap",
    description:
      "Diagrama que organiza informações visualmente, utilizando palavras-chave, cores e conexões para apresentar ideias.",
  },
  {
    title: "Spaced Repetition",
    description:
      "Técnica de revisão espaçada ao longo do tempo, baseada no princípio de que a revisão regular melhora a retenção.",
  },
];

const DISABILITIES = ["TDAH", "Dislexia", "Auditivo", "TEA"];

const onboardingSubmit = async (
  username,
  learningMethod,
  contentStyleTitle,
  contentStyleDescription
) => {
  let payload = {
    username,
    learningMethod,
    contentStyleTitle,
    contentStyleDescription,
    age: 15,
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/user-profile",
      payload
    );
    console.log("@data", response.data);
  } catch (e) {
    console.log(JSON.stringify(e));
  }
};

function Onboarding() {
  const [selectedLearningMethod, setSelectedLearningMethod] = useState("");
  const [selectedContentStyle, setSelectedContentStyle] = useState("");
  // const [selectedDisabilities, setSelectedDisabilities] = useState([]);

  const [userData, setUserData] = useState(null);

  const [step, setStep] = useState(1);

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) return navigate("/");
  }, [user, loading]);

  useEffect(
    () => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/user-profile",
            {
              params: { username: user.displayName },
            }
          );

          console.log("@Response", response);
          setUserData(response.data);
          navigate("/onboarding");
        } catch (e) {}
      };

      fetchUserData();
    },
    userData,
    setUserData
  );

  const renderLearningMethods = () => (
    <div className="">
      <h2 className="text-lg mb-12">
        De que forma você acha que aprende melhor?
      </h2>
      {LEARNING_METHODS.map((method) => (
        <div>{renderButtonMethod(method)}</div>
      ))}
    </div>
  );

  const renderButtonMethod = (method) => (
    <button
      style={{ backgroundColor: "#FEBE5B" }}
      className="rounded-full px-10 py-4 text-white mb-4"
      onClick={() => {
        setSelectedLearningMethod(method);
        setStep(step + 1);
      }}
    >
      {method}
    </button>
  );

  const renderContentStyles = () => (
    <div className="">
      <h2 className="text-lg mb-12">
        Com qual modelo de conteúdo você mais se identifica para estudar?
      </h2>
      {CONTENT_STYLES.map((contentStyle) => (
        <div>{renderButtonContentStyle(contentStyle)}</div>
      ))}
    </div>
  );

  const renderButtonContentStyle = (contentStyle) => (
    <div
      style={{ backgroundColor: "#FEBE5B" }}
      className="p-4 rounded-md my-2"
      onClick={async () => {
        setSelectedContentStyle(contentStyle.title);
        setStep(step + 1);
        await onboardingSubmit(
          user.displayName,
          selectedLearningMethod,
          contentStyle.description,
          contentStyle.title
        );
        // navigate("/");
      }}
    >
      <h3 className="text-white">{contentStyle.title}</h3>
      <p>{contentStyle.description}</p>
    </div>
  );

  // const renderDisabilities = () => (
  //   <div className="">
  //     <h2 className="text-lg mb-12">
  //       Possui algum tipo de desafio intelectual ou auditivo?
  //     </h2>
  //     {DISABILITIES.map((disability) => (
  //       <div>{renderButtonDesabilities(disability)}</div>
  //     ))}
  //   </div>
  // );

  // const renderButtonDesabilities = (disability) => (
  //   <div
  //     className="bg-purple-300 p-4 rounded-md my-2"
  //     onClick={() => {
  //       setSelectedDisabilities([...selectedDisabilities, disability]);
  //       // setStep(step+1);
  //     }}
  //   >
  //     <h3>{disability}</h3>
  //   </div>
  // );

  const renderSteps = () => {
    switch (step) {
      case 1:
        return renderLearningMethods();
      case 2:
        return renderContentStyles();
      // case 3:
      //     return renderDisabilities();
      default:
        return (
          <div>
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              {" "}
              Retornar à tela inicial{" "}
            </button>
          </div>
        );
    }
  };

  return (
    <div className="container justify-center text-center">
      <div className="flex justify-center">
        <img className="w-64" src="./explica-ai-logo.png"></img>
      </div>

      <div className="shadow-lg mt-48 flex-row rounded-md p-2">
        {renderSteps()}
      </div>
    </div>
  );
}

export default Onboarding;
