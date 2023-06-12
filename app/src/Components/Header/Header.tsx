import { useSelector } from "react-redux";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import AccountMenu from "../Menu/AccountMenu";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header(): JSX.Element {
  const authSlice = useSelector((state: any) => state.auth);
  const Navigate = useNavigate()
  return (
    <div className="Header">
      <h1 onClick={()=>Navigate("/")}>PupilPeer</h1>
      {!authSlice ? (
        <GoogleAuth />
      ) : (
        <div className="LogoutDiv">
          <AccountMenu />
        </div>
      )}
    </div>
  );
}

export default Header;
