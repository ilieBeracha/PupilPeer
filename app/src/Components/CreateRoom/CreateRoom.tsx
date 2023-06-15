import * as React from "react";
import Modal from "@mui/material/Modal";
import "./CreateRoom.css";
import { useForm } from "react-hook-form";
import { VideoRoomsModal } from "../../models/VideoRoomsModal";
import { categoriesService } from "../../services/CategoriesService";
import { roomsService } from "../../services/RoomsService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toastAlerts } from "../../helpers/toastAlerts";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { Checkbox, Switch } from "@mui/material";

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

export default function CreateRoom() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit } = useForm<VideoRoomsModal>();
  const [categories, setCategories] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState<any>(1);
  const Navigate = useNavigate();
  const [subCatgory, setSubCategory] = React.useState(0);
  const [isTeacherRoom, setIsTeacherRoom] = React.useState(false);
  const [cost, setCost] = React.useState(0);

  useEffect(() => {
    categoriesService.getAllSubCategories().then((res) => {
      setCategories(res);
    });
    return () => {
      setIsTeacherRoom(false);
    };
  }, []);

  useEffect(() => {
    setSubCategory(0);
  }, [categoryId]);

  useEffect(() => {
    console.log(isTeacherRoom);
  }, [isTeacherRoom]);

  async function StartMeeting(data: VideoRoomsModal) {
    if (subCatgory === 0) {
      toastAlerts.toastInfo("Select sub category");
      return;
    }
    const newResults: any = {
      roomName: data.roomName,
      description: data.description,
      categoryId: +categoryId,
      subCategoryId: subCatgory,
      maxParticipants: +data.maxParticipants,
      isTeacher: isTeacherRoom,
      cost: cost,
    };
    const results = await roomsService.createRoom(newResults);
    if (results.status === 200) {
      const roomId = results.data[0].insertId;
      Navigate(`video/${roomId}#init`);
    }
  }

  return (
    <div className="CreateRoom">
      <button className="CreateRoomBtn" onClick={handleOpen}>
        <AddIcon />
        Create a meeting
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="checkboxIsTeacherDiv">
            <label htmlFor="">{"As a teacher"}</label>
            <Switch color="warning" onChange={() => setIsTeacherRoom(!isTeacherRoom)}/>

            {/* <Checkbox
              sx={{
                color: "orange",
                "&.Mui-checked": {
                  color: "orange",
                },
              }}
              
            /> */}
          </div>
          <form
            onSubmit={handleSubmit(StartMeeting)}
            className="CreateRoomForm"
          >
            <label htmlFor="">Room name</label>
            <input
              type="text"
              {...register("roomName", { required: true, maxLength: 20 })}
            />
            <label htmlFor="">Description</label>
            <input
              type="text"
              {...register("description", { required: true, maxLength: 200 })}
            />
            <label htmlFor="">Category</label>
            <select id="" onChange={(e) => setCategoryId(e.target.value)}>
              <option value={1}>School</option>
              <option value={2}>University</option>
              <option value={3}>Other</option>
            </select>
            <label htmlFor="">Sub category</label>
            <div className="SubCategoryBtns">
              {categories
                .filter(
                  (category: any) => category.categoryId === Number(categoryId)
                )
                .map((filteredCategory: any) => (
                  <button
                    type="button"
                    key={filteredCategory.id}
                    value={filteredCategory.id}
                    onClick={(e: any) => setSubCategory(e.currentTarget.value)}
                  >
                    {filteredCategory.subCategorieName}
                  </button>
                ))}
            </div>
            <label htmlFor="">Max participants</label>
            <input
              type="number"
              {...register("maxParticipants", { required: true })}
            />
            {isTeacherRoom ? (
              <>
                <label htmlFor="">Cost for participant</label>
                <input
                  type="number"
                  placeholder="$"
                  onChange={(e) => setCost(Number(e.target.value))}
                />
              </>
            ) : (
              <></>
            )}
            <div
              className={isTeacherRoom ? "teacherBtn SubmitBtn" : "SubmitBtn"}
            >
              <button type="submit">
                {isTeacherRoom ? "Start as teacher" : "Start as student"}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
