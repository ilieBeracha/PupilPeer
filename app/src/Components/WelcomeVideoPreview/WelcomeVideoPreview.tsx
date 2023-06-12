import "./WelcomeVideoPreview.css";
import { useEffect, useRef } from "react";
import vid2 from "../../assets/videos/vid2.mp4";
// import vid3 from "../../assets/videos/vid3.mp4";
// import vid4 from "../../assets/videos/vid4.mp4";

function WelcomeVideoPreview(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
//   const videos = [vid2, vid3, vid4];
//   const randomVideo = videos[Math.floor(Math.random() * videos.length)];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <video
      className="WelcomeVideoPreview"
      ref={videoRef}
      src={vid2}
      autoPlay
      loop
      muted
      playsInline
    ></video>
  );
}

export default WelcomeVideoPreview;
