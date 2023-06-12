import { NavLink } from "react-router-dom";
import "./HomeNav.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FaceIcon from "@mui/icons-material/Face";

function HomeNav(): JSX.Element {
  return (
    <div className="HomeNav">
      <div className="HomeNavA">
        <NavLink to={"/"}>
          <DashboardIcon />
          rooms
        </NavLink>

        <NavLink to={"/soloStudy"}>
          <FaceIcon />
          Solo
        </NavLink>
      </div>
    </div>
  );
}

export default HomeNav;
