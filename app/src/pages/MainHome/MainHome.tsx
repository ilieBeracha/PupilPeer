import "./MainHome.css";
import { useSelector } from "react-redux";
import HomeTab from "../../Components/HomeTab/HomeTab";
import CreateRoom from "../../Components/CreateRoom/CreateRoom";
import WelcomeVideoPreview from "../../Components/WelcomeVideoPreview/WelcomeVideoPreview";


function MainHome(): JSX.Element {
  const authSlice = useSelector((state: any) => state.auth);
 
  return (
    <div className="MainHome">
      <div className="WelcomeMainHome">
        <div className="WelcomeMainHomeText">
          <h3>
            Hi, {authSlice.firstName} {authSlice.lastName}, Let's dive into a
            productive study session
          </h3>
          <p>Enjoy your learning journey!</p>
        </div>

        <div className="CreateRoomDiv">
          <CreateRoom />
        </div>
      </div>
      <div className="MainHomeCommercial">
       <WelcomeVideoPreview />
      </div>
      <div className="MainHomeContent">
        <HomeTab />
      </div>
    </div>
  );
}

export default MainHome;
