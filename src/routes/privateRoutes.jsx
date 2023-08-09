import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";

function PrivateRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
}

export default PrivateRoutes;
