import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import SignIn from "./pages/SignIn";
import SearchInit from "./pages/SearchInit";
import SignUp from "./pages/SignUp";
import Results from "./pages/Results";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/onboarding" element={<Onboarding />}></Route>
          <Route path="/" element={<SearchInit />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/result" element={<Results />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
