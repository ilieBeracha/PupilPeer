import "./LandingPage.css";
import { Fade } from "react-awesome-reveal";
import groupImage from "../../assets/images/group.png";
// import Tsp from "../../Components/Tsp/Tsp";
import Header from "../../Components/Header/Header";
import groupIconGif from "../../assets/images/groupIconGif.gif";
import avatarIconGif from "../../assets/images/avatarIconGif.gif";
import teacherIconGif from "../../assets/images/teacherIconGif.gif";

function LandingPage(): JSX.Element {
  return (
    <div className="LandingPage">
      <Header />
      <div className="LandingPageWelcome">
        <div className="LandingPageWelcomeSen">
          <div className="LandingPageWelcomeSenHeader">
            <h3>
              Connect, engage, and learn with students <br /> from{" "}
              <span id="gradiendSen">around the world</span>
            </h3>
            <p>
              Become a part of the world's largest online student community and
              bid farewell to motivational setbacks.
            </p>
          </div>
          <div className="LandingPageWelcomeSenFeatures">
            <Fade direction="left">
              <div className="LandingPageWelcomeSenFeature">
                <div className="LandingPageWelcomeSenFeatureImage">
                  <img src={groupIconGif} alt="" />
                </div>
                <div className="LandingPageWelcomeSenFeatureText">
                  <p>Join motivated students from all over the world</p>
                </div>
              </div>
            </Fade>
            <Fade direction="right">
              <div className="LandingPageWelcomeSenFeature">
                <div className="LandingPageWelcomeSenFeatureText">
                  <p>Experience immersive teacher-led study sessions</p>
                </div>
                <div className="LandingPageWelcomeSenFeatureImage">
                  <img src={teacherIconGif} alt="" />
                </div>
              </div>
            </Fade>
            <Fade direction="left">
              <div className="LandingPageWelcomeSenFeature">
                <div className="LandingPageWelcomeSenFeatureImage">
                  <img src={avatarIconGif} alt="" />
                </div>
                <div className="LandingPageWelcomeSenFeatureText">
                  <p>Create your very own study room</p>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

{
  /* <div className="LandingPageFeatures">
        <div className="LandingPageFeaturesTitle">
          <h2>Discover Study Together</h2>
        </div>
        <div className="LandingPageFeaturesDivs">
          <Fade direction="left">
            <div className="LandingPageFeaturesDiv">
              <img src={groupImage} alt="" />
              <h3>Own Study Universe</h3>
              <span>
                Create your very own study room with atmospheric backgrounds,
                personal timers, and goals.
              </span>
            </div>
          </Fade>
          <Fade direction="left">
            <div className="LandingPageFeaturesDiv">
              <img src={groupImage} alt="" />
              <h3>Group Study Rooms</h3>
              <span>
                Join motivated students from all over the world to boost your
                productivity and find your study flow.
              </span>
            </div>
          </Fade>
          <Fade direction="left">
            <div className="LandingPageFeaturesDiv">
              <img src={groupImage} alt="" />
              <h3>Free Tutor Help!</h3>
              <span>
                Feeling stuck? Just raise your hand and one of our expert
                community tutors will jump in and help.
              </span>
            </div>
          </Fade>
          <Fade direction="right">
            <div className="LandingPageFeaturesDiv">
              <img src={groupImage} alt="" />
              <h3>Mindfulness</h3>
              <span>
                Balance is crucial – check out our mindfulness exercises to give
                your mind a breather.
              </span>
            </div>
          </Fade>
          <Fade direction="right">
            <div className="LandingPageFeaturesDiv">
              <img src={groupImage} alt="" />
              <h3>Community Events</h3>
              <span>
                Our live events tackle everything from productivity courses to
                career advice.
              </span>
            </div>
          </Fade>
          <Fade direction="right">
            <div className="LandingPageFeaturesDiv">
              <img src={groupImage} alt="" />
              <h3>Study Stats</h3>
              <span>
                See your progress every day in your Stats and on the community
                leaderboard.
              </span>
            </div>
          </Fade>
        </div>
      </div> */
}
