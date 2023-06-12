import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/LandingPage/LandingPage";
import VideoComponent from "./pages/VideoComponent/VideoComponent";

function App() {
  const authSlice = useSelector((state: any) => state.auth);
  return (
    <div className="App">
      <Routes>
        {authSlice ? (
          <>
            <Route path="*" element={<Home />}></Route>
            <Route path="/video/:roomId" element={<VideoComponent />} />
          </>
        ) : (
          <Route path="*" element={<LandingPage />}></Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
