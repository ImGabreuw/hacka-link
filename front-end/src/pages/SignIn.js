import React from "react";

const LEARNING_METHODS = [
  "Aprendo vendo - Visual",
  "Aprendo ouvindo - Auditivo",
  "Aprendo fazendo - Cinestésico",
];

const CONTENT_STYLEs = [
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

const renderLearningMethods = () => (
  <div>
    <h2 className="text-lg mb-12">
      De que forma você acha que aprende melhor?
    </h2>
    {LEARNING_METHODS.map((method) => (
      <div>{method}</div>
    ))}
  </div>
);

const renderButtonMethod = () => (
    <div></div>
);

function SignIn() {
  return (
    <div className="w-100 px-4">
      <div className="flex-row"> header</div>
      <div className="shadow-lg mt-48 flex-row rounded-md p-2">
        {renderLearningMethods()}
      </div>
    </div>
  );
}

export default SignIn;