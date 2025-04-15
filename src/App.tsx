import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import MatrixGamePage from "./pages/MatrixGame/MatrixGamePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/matrix" element={<MatrixGamePage />} />
      </Routes>
    </BrowserRouter>
  );
}
