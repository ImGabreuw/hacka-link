import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<SignIn />}></Route>
            <Route path="/" element={<SignIn />}></Route>
            <Route path="/" element={<SignIn />}></Route>
            <Route path="/" element={<SignIn />}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;