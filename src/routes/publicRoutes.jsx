import { Routes, Route } from "react-router-dom";
import Register from "../pages/register";
import Login from "../pages/login";

function PublicRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
}

export default PublicRoutes;
