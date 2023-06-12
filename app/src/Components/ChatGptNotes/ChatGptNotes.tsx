import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./ChatGptNotes.css";
import waveSounds from "../../assets/images/waveSounds.gif";
import { openaiService } from "../../services/OpenaiService";

const ChatGptNotes = () => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [notes, setNotes] = useState<any>([]);
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  useEffect(() => {
    if (browserSupportsSpeechRecognition) {
      startListening();
    } else {
      <span>Browser doesn't support speech recognition.</span>;
    }

    return () => {
      SpeechRecognition.stopListening();
    };
  }, [browserSupportsSpeechRecognition]);
``
  useEffect(() => {
    if (transcript.length >= 100) {
      openaiService.chatGptListener(transcript).then((res) => {
        setNotes((prev: any) => [...prev, res]);
        console.log(res);
      });
      resetTranscript();
    }
    console.log(transcript.length);
  }, [transcript]);

  return (
    <div className="ChatGptNotes">
      <div className="ChatGptNotesHeader">
        <p>ChatGPT is taking notes</p>
        <img src={waveSounds} alt="" />
      </div>
      <p>
        {notes ? (
          notes.map((note: any, index: number) => (
            <p key={index}>{note}</p>
          ))
        ) : (
          <></>
        )}
      </p>
    </div>
  );
};

export default ChatGptNotes;
