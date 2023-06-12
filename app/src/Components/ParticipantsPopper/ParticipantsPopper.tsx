import "./ParticipantsPopper.css";
import GroupsIcon from "@mui/icons-material/Groups";
import * as React from "react";
import Modal from "@mui/material/Modal";
import { UserInterface } from "../../models/UserModel";
import Box from "@mui/material/Box";

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
};

export default function ParticipantsPopper({ users }: { users: any }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(users)

  return (
    <div className="ParticipantsPopper">
      <p onClick={handleOpen}>
        <GroupsIcon />
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="ParticipantsHeader">Participants</h2>
          {users.map((user: UserInterface) => (
            <div className="UserRow">
              <img src={user.image} alt="" />
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p key={user.id}>{user.email}</p>
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
}
