import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faTimes,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./MeetingInfo.css";
import { toastAlerts } from "../../helpers/toastAlerts";
import { useSelector } from "react-redux";

const MeetingInfo = ({
  setMeetInfoPopup,
  url,
}: {
  setMeetInfoPopup: any;
  url: any;
}) => {
  function copyURL(url: any) {
    navigator.clipboard.writeText(url);
    toastAlerts.toastInfo("Copied");
  }

  const authSlice = useSelector((state: any) => state.auth);

  return (
    <div className="meeting-info-block">
      <div className="meeting-header">
        <h3>Your meeting's ready</h3>
        <FontAwesomeIcon
          className="icon"
          icon={faTimes}
          onClick={() => {
            setMeetInfoPopup(false);
          }}
        />
      </div>
      <p className="info-text">
        share this meeting link with others you want in the meeting
      </p>
      <div className="meet-link">
        <span>{url}</span>
        <FontAwesomeIcon
          className="icon"
          icon={faCopy}
          onClick={() => copyURL(url)}
        />
      </div>
      <div className="permission-text">
        <FontAwesomeIcon className="icon red" icon={faShieldAlt} />
        <p className="small-text">
          People can join this meeting either by clicking on the provided link
          or directly from our website where the room is visible. No prior
          approval is required for joining.
        </p>
      </div>
      <p className="small-text">Joined as {authSlice.email}</p>
    </div>
  );
};

export default MeetingInfo;
