import * as React from "react";
import ChatIcon from "@mui/icons-material/Chat";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import "./Chat.css";
import { Divider, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { chatService } from "../../services/ChatService";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
  gap: "10px",
};

export default function Chat({
  messages,
  socket,
  roomId,
  setMessages,
}: {
  messages: any;
  socket: any;
  roomId: number;
  setMessages: any;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [messageInput, setMessageInput] = useState("");
  const authSlice = useSelector((state: any) => state.auth);

  const handleSendMessage = () => {
    if (messageInput === "") return;
    const newMessage = {
      id: uuidv4(),
      userId: authSlice.sub,
      firstName: authSlice.firstName,
      lastName: authSlice.lastName,
      roomId: +roomId,
      content: messageInput,
      timestamp: new Date().getTime(),
    };
    socket.emit("send-message", newMessage);

    setMessages((prevMessages: any) => [...prevMessages, newMessage]);

    setMessageInput("");
  };

  React.useEffect(() => {
    chatService.getChatMessagesByRoomId(roomId).then((res) => setMessages(res));
  }, []);

  return (
    <div className="Chat">
      <p onClick={handleOpen}>
        <ChatIcon />
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Chat
          </Typography>
          <Divider />

          <div className="ChatContent">
            {messages
              .sort((a: any, b: any) => a.timestamp - b.timestamp)
              .map((message: any, index: any) => (
                <div
                  className={`messageBubble ${
                    message.userId === authSlice.sub
                      ? "myMessage"
                      : "otherMessage"
                  }`}
                  key={index}
                >
                  <p className="messageContent">{message.content}</p>
                  <p className="messageUser">
                    {message.firstName} {message.lastName}
                  </p>
                </div>
              ))}
          </div>

          <div className="ChatSendMessageDiv">
            <TextField
              fullWidth
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
