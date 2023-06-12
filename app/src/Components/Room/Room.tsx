import { useEffect, useState } from "react";
import "./Room.css";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router-dom";
import { socket } from "../../services/SocketService";
import { VideoRoomsModal } from "../../models/VideoRoomsModal";
import { roomsService } from "../../services/RoomsService";
import { toastAlerts } from "../../helpers/toastAlerts";
import SchoolIcon from "@mui/icons-material/School";

function Room({ room }: { room: VideoRoomsModal }): JSX.Element {
  const [date, setDate] = useState<any>();
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    turnTimestampToDate();
    roomsService.getUsersByRoom(room.id as any).then((count) => {
      setUserCount(count.length);
    });

    socket.on("user-count", (data: any) => {
      console.log(data);
      if (data.roomId === String(room.id)) {
        setUserCount(data.userCount);
      }
    });
  }, [room.id]);

  useEffect(() => {
    console.log(userCount);
    console.log(room);
  }, [userCount]);

  function turnTimestampToDate() {
    const date = new Date(room.startTime);
    setDate(date.toLocaleDateString("en-US"));
  }

  function joinRoom() {
    if (userCount >= room.maxParticipants) {
      toastAlerts.toastInfo("Room full");
      return;
    }
    navigate(`video/${room.id}`);
  }

  return (
    <div className="Room">
      {room.isTeacher === "true" ? (
        <SchoolIcon sx={{ color: "white" }} className="RoomSchoolIcon" />
      ) : (
        <></>
      )}
      <div className={"RoomHeader"}>
        <div className="RoomMainInfo">
          <p className="RoomName">{room.roomName}</p>
          <p className="SubCategoryName">{room.subCategorieName}</p>
        </div>
        <div className="RoomMaxParticipants">
          <GroupsIcon className="GroupsIcon" color="action" />
          <p className="ParticipantsCount">
            {userCount}/{room.maxParticipants}
          </p>
        </div>
      </div>
      <div className="RoomMain">
        <div className="RoomMain">
          <p>{room.description}</p>
        </div>
        <div className="RoomStartTime">
          <p className="StartTime">{date}</p>
        </div>
        <div className="RoomJoin">
          <button
            className={
              room.isTeacher === "true"
                ? "JoinButtonTeacher JoinButton"
                : "JoinButton"
            }
            onClick={joinRoom}
          >
            {room.isTeacher === "true" ? `${room.cost}$` : "Join"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Room;
