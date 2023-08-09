import { BrowserRouter } from "react-router-dom";
import "./App.css";
import HeadPage from "./components/HeadPage";
import MyRoutes from "./routes/myRoutes";
import { AccountContextProvider } from "./context/accountContext";

function App() {
  return (
    <BrowserRouter>
      <AccountContextProvider>
        <HeadPage />
        <MyRoutes />
      </AccountContextProvider>
    </BrowserRouter>
  );
}

export default App;
