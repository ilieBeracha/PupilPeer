import { useEffect } from "react";
import "./Rooms.css";
import { roomsService } from "../../services/RoomsService";

function Rooms({
  categories,
  setRooms,
  categoryId,
  setSubCategoryValue,
  subCategoryValue,
}: {
  categories: any;
  setRooms: any;
  categoryId: any;
  setSubCategoryValue: any;
  subCategoryValue: any;
}): JSX.Element {

  useEffect(() => {
    if (subCategoryValue === "") {
      roomsService.getRoomsByCategory(categoryId).then((res) => setRooms(res));
    } else {
      roomsService
        .getRoomsBySubCategory(+subCategoryValue)
        .then((res) => setRooms(res));
    }
  }, [subCategoryValue]);

  return (
    <div className="SchoolHome">
      <div className="SubCategoriesBtns">
        {categories.map((cate: any) => (
          <button
            key={cate.id}
            value={cate.id}
            onClick={(e: any) => setSubCategoryValue(e.target.value)}
          >
            {cate.subCategorieName}
          </button>
        ))}

        {subCategoryValue !== "" ? (
          <button
            className="ClearFiltersBtn"
            onClick={() => setSubCategoryValue("")}
          >
            X Clear filteres
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Rooms;
