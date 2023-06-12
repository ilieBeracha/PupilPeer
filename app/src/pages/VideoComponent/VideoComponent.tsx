import { useState, useEffect } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import { useNavigate, useParams } from "react-router-dom";
import MeetingInfo from "../../Components/MeetingInfo/MeetingInfo";
import { useSelector } from "react-redux";
import { Peer } from "peerjs";
import { roomsService } from "../../services/RoomsService";
import InfoIcon from "@mui/icons-material/Info";
import ParticipantsPopper from "../../Components/ParticipantsPopper/ParticipantsPopper";
import Chat from "../../Components/Chat/Chat";
import ChecklistIcon from "@mui/icons-material/Checklist";
import "./VideoComponent.css";
import ChatGptNotes from "../../Components/ChatGptNotes/ChatGptNotes";
import { socket } from "../../services/SocketService";
import { ChatInterface } from "../../models/ChatInterface";


const VideoComponent = () => {
  const url = `${window.location.origin}${window.location.pathname}`;
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const authSlice = useSelector((state: any) => state.auth);
  const [videoStreams, setVideoStreams] = useState<any>([]);
  const [peers, setPeers] = useState<any>({});
  const [isHost, setIsHost] = useState<boolean>(false);
  const [usersByRoom, setUsersByRoom] = useState<[]>([]);
  const [meetInfoPopUp, setMeetInfoPopup] = useState(true);
  const [isPresenting, setIsPresenting] = useState<boolean>(false);
  const [screenShareStream, setScreenShareStream] = useState<any>();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [messages, setMessages] = useState<ChatInterface[]>([]);
  const [isChatGptListening, setIsChatGptListening] = useState<boolean>(false);

  useEffect(() => {
    socket.on("receive-message", (message) => {
      if (!messages.some((msg: ChatInterface) => msg.id === message.id)) {
        setMessages((prevMessages: any) => [...prevMessages, message]);
      }
    });
  }, []);

  useEffect(() => {
    if (roomId) {
      roomsService.getRoomById(Number(roomId)).then((res) => {
        if (res[0].hostUserId === authSlice.sub) {
          setIsHost(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (isHost) {
      setMeetInfoPopup(true);
    }
  }, [isHost]);

  let myPeer: any;

  useEffect(() => {
    myPeer = new Peer("", {
      host: "/",
      port: 3001,
    });

    myPeer.on("open", (id: any) => {
      sessionStorage.setItem("peerId", id);
      socket.emit("join-room", roomId, id, authSlice.sub);
    });

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setLocalStream(stream);
        addVideoStream(myPeer.id, stream, true);

        myPeer.on("call", (call: any) => {
          call.answer(stream);
          call.on("stream", (userVideoStream: any) => {
            if (!videoStreams.some((video: any) => video.id === call.peer)) {
              addVideoStream(call.peer, userVideoStream, false);
            }
          });
        });

        socket.on("user-connected", (userId, userCount) => {
          console.log(userCount);
          setVideoStreams((currentStreams: any) => {
            const isStreamPresent = currentStreams.some(
              (video: any) => video.id === userId
            );
            if (!isStreamPresent) {
              connectToNewUser(userId, stream);
            }
            return currentStreams;
          });
        });
      });

    socket.on("user-disconnected", (userId: any) => {
      if (peers[userId]) peers[userId].close();
      setVideoStreams((prevStreams: any) =>
        prevStreams.filter((stream: any) => stream.id !== userId)
      );
    });

    return () => {
      videoStreams.forEach((video: any) => {
        if (video.stream && video.stream.getTracks) {
          video.stream.getTracks().forEach((track: MediaStreamTrack) => {
            track.stop();
          });
        }
      });
      setVideoStreams([]);
    };
  }, []);

  function leaveRoom() {
    roomsService.removeUserFromRoom(authSlice.sub, Number(roomId));
    navigate("/");
    location.reload();
  }

  function fetchUsersByRoom() {
    if (roomId) {
      roomsService
        .getUsersByRoom(Number(roomId))
        .then((res) => setUsersByRoom(res));
    }
  }

  const connectToNewUser = (userId: any, stream: any) => {
    const call = myPeer.call(userId, stream);
    call.on("stream", (userVideoStream: any) => {
      console.log(`Received stream from ${userId}`, userVideoStream);
      setVideoStreams((currentStreams: any) => {
        const isStreamPresent = currentStreams.some(
          (video: any) => video.id === userId
        );
        if (!isStreamPresent) {
          const newStreams = [
            ...currentStreams,
            { id: userId, stream: userVideoStream, muted: false },
          ];
          return newStreams;
        } else {
          return currentStreams;
        }
      });
    });

    call.on("close", () => {
      setVideoStreams((prevStreams: any) =>
        prevStreams.filter((stream: any) => stream.id !== userId)
      );
    });

    setPeers((prevPeers: any) => ({ ...prevPeers, [userId]: call }));
  };

  const addVideoStream = (id: any, stream: any, muted: boolean) => {
    setVideoStreams((currentStreams: any) => {
      const isStreamPresent = currentStreams.some(
        (video: any) => video.id === id
      );
      if (!isStreamPresent) {
        return [...currentStreams, { id, stream, muted }];
      } else {
        return currentStreams;
      }
    });
  };

  function toggleScreenSharing() {
    if (!isPresenting) {
      navigator.mediaDevices
        .getDisplayMedia({ video: true })
        .then((stream) => {
          setScreenShareStream(stream);
          const videoTrack = stream.getVideoTracks()[0];
          for (const userId in peers) {
            const peerConnection = peers[userId];
            const sender = peerConnection.peerConnection
              .getSenders()
              .find((s: any) => s.track.kind === videoTrack.kind);
            if (sender) {
              sender.replaceTrack(videoTrack);
            }
          }
          Object.keys(peers).forEach((peerId) => {
            connectToNewUser(peerId, stream);
          });
          setIsPresenting(true);
        })
        .catch((error) => {
          console.error("Error accessing screen sharing:", error);
        });
    } else {
      if (screenShareStream) {
        screenShareStream.getTracks().forEach((track: MediaStreamTrack) => {
          track.stop();
        });
        setScreenShareStream(null);
      }
      Object.keys(peers).forEach((peerId) => {
        console.log(`Calling ${peerId} with my own stream`);
        connectToNewUser(
          peerId,
          videoStreams.find((stream: any) => stream.id !== "screen").stream
        );
      });
      setIsPresenting(false);
    }
  }

  function toggleAudio() {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setTrackState((prevState) => ({ ...prevState, audio: !prevState.audio }));
    }
  }

  function toggleVideo() {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setTrackState((prevState) => ({ ...prevState, video: !prevState.video }));
    }
  }

  return (
    <div className="VideoComponent">
      {isHost && meetInfoPopUp ? (
        <MeetingInfo url={url} setMeetInfoPopup={setMeetInfoPopup} />
      ) : null}
      {
        isChatGptListening?
        <ChatGptNotes />
        :
        <></>
      }
      <div className="VideoComponentContent">
        <div className="screenShareDiv">
          {screenShareStream && (
            <video
              className="ScreenSharePlayer"
              ref={(ref) => {
                if (ref && screenShareStream) {
                  ref.srcObject = screenShareStream;
                  ref.onloadedmetadata = () => {
                    ref
                      .play()
                      .catch(() => console.log("Play request was interrupted"));
                  };
                }
              }}
              autoPlay
            />
          )}
        </div>

        {isHost && !meetInfoPopUp ? (
          <div className="HostUserDiv" onClick={() => setMeetInfoPopup(true)}>
            <InfoIcon />
          </div>
        ) : null}
        <div className="VideoComponentControls">
          <div className="VideoComponentControlsMicVid">
            {isHost ? (
              <p
                onClick={()=> setIsChatGptListening(!isChatGptListening)}
                className="VideoComponentControlsChatGpt"
              >
                <ChecklistIcon fontSize="medium" />
              </p>
            ) : (
              <></>
            )}
            <p
              onClick={fetchUsersByRoom}
              className="VideoComponentControlsParticipants"
            >
              <ParticipantsPopper users={usersByRoom} />
            </p>
            <p className={trackState.audio ? "on" : ""} onClick={toggleAudio}>
              {trackState.audio ? (
                <MicIcon fontSize="medium" />
              ) : (
                <MicOffIcon fontSize="medium" />
              )}
            </p>
            <p
              onClick={toggleScreenSharing}
              className="VideoComponentControlsScreenShare"
            >
              <ScreenShareIcon fontSize="medium" />
            </p>
            <p className={trackState.video ? "on" : ""} onClick={toggleVideo}>
              {trackState.video ? (
                <VideocamIcon fontSize="medium" />
              ) : (
                <VideocamOffIcon fontSize="medium" />
              )}
            </p>
            <p>
              <Chat
                messages={messages}
                socket={socket}
                roomId={roomId as any}
                setMessages={setMessages}
              />
            </p>
            <div className="VideoComponentControlsLeave">
              <p onClick={leaveRoom}>
                <ExitToAppIcon fontSize="medium" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="VideoParticipants">
        {videoStreams.map((video: any) => (
          <video
            className="VideoPlayer"
            key={video.id}
            ref={(ref) => {
              if (ref && video.stream) {
                ref.srcObject = video.stream;
                ref.onloadedmetadata = () => {
                  ref
                    .play()
                    .catch(() => console.log("Play request was interrupted"));
                };
              }
            }}
            muted={video.muted}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoComponent;
