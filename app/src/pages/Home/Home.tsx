import { Route, Routes, useLocation } from "react-router-dom";
import HomeNav from "../../Components/HomeNav/HomeNav";
import "./Home.css";
import Profile from "../Profile/Profile";
import MainHome from "../MainHome/MainHome";
import Solo from "../Solo/Solo";
import Settings from "../Settings/Settings";
import Header from "../../Components/Header/Header";

function Home(): JSX.Element {
  const location = useLocation();
  const isSoloPath = location.pathname === "/soloStudy";

  return (
    <div className="Home">
      <HomeNav />
      <div className="HomeMain">
        {!isSoloPath && ( 
          <div className="HomeHeader">
            <Header />
          </div>
        )}

        <div className="HomeContent">
          <Routes>
            <Route path="/" element={<MainHome />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/soloStudy" element={<Solo />} />
            <Route path="/settings" element={<Settings />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Home;
