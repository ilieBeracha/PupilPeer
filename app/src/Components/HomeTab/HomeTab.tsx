import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { categoriesService } from "../../services/CategoriesService";
import { useEffect, useState } from "react";
import { roomsService } from "../../services/RoomsService";
import { VideoRoomsModal } from "../../models/VideoRoomsModal";
import Room from "../Room/Room";
import Rooms from "../Rooms/Rooms";
import Box from "@mui/material/Box";
import "./HomeTab.css";

export default function HomeTab() {  
  const [categoryValue, setCategoryValue] = React.useState(1);
  const [schoolCategories, setSchoolCategories] = React.useState<[]>([]);
  const [universityCategories, setUniversityCategories] = React.useState<[]>([]);
  const [otherCategories, setOtherCategories] = React.useState<[]>([]);
  const [rooms, setRooms] = useState<VideoRoomsModal[]>([]);
  const [subCategoryValue, setSubCategoryValue] = useState("");

  useEffect(() => {
    categoriesService.getAllSubCategories().then((res) => {
      setSchoolCategories(
        res.filter((subCategory: any) => subCategory.categoryId === 1)
      );
      setUniversityCategories(
        res.filter((subCategory: any) => subCategory.categoryId === 2)
      );
      setOtherCategories(
        res.filter((subCategory: any) => subCategory.categoryId === 3)
      );
    });
  }, []);

  useEffect(() => {
    roomsService.getRoomsByCategory(categoryValue).then((res) => setRooms(res));
    setSubCategoryValue("");
  }, [categoryValue]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCategoryValue(+newValue);
  };

  function searchRoom(value: string) {
    console.log(value);
    if (value === "") {
      roomsService
        .getRoomsByCategory(categoryValue)
        .then((res) => setRooms(res));
      return;
    }
    let filteredRooms = rooms.filter((room) => {
      return room.roomName
        .toLocaleLowerCase()
        .includes(value.toLocaleLowerCase());
    });
    setRooms(filteredRooms);
  }

  return (
    <div className="HomeTab">
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tabs
          value={categoryValue}
          onChange={handleChange}
          aria-label="secondary tabs example"
        >
          <Tab value={1} label="School" />
          <Tab value={2} label="University" />
          <Tab value={3} label="Other" />
        </Tabs>

        <div className="HomeTabSearch">
          <input
            type="text"
            placeholder="Search Room"
            onChange={(e) => searchRoom(e.target.value)}
          />
        </div>
      </Box>
      <div className="RoomsContent">
        <>
          <Rooms
            setRooms={setRooms}
            categoryId={categoryValue}
            categories={
              categoryValue === 1
                ? schoolCategories
                : categoryValue === 2
                ? universityCategories
                : otherCategories
            }
            setSubCategoryValue={setSubCategoryValue}
            subCategoryValue={subCategoryValue}
          />
          <div className="displayRoomsDiv">
            {rooms ? (
              rooms.map((room: VideoRoomsModal, index: number) => (
                <Room key={index} room={room} />
              ))
            ) : (
              <></>
            )}
          </div>
        </>
      </div>
    </div>
  );
}
