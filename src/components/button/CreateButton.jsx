import React, { useContext, useState } from "react";
import plusIcon from "../../assets/icons8-plus.svg";
import GlobalContext from "../../context/GlobalContext";
import dayjs from "dayjs";

const CreateButton = () => {
  const { setShowEventModal, setDaySelected, daySelected } = useContext(GlobalContext);
  const [showDropdown, setShowDropdown] = useState(false);

  console.log(daySelected);
  
  const handleCreate = () => {
    if (!daySelected) {
      setDaySelected(dayjs()); 
    }
    setShowEventModal(true);
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block">
      <button
        className="border p-2 rounded-[15px] flex items-center shadow-md hover:bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img src={plusIcon} alt="create" className="w-7 h-7" />
        <span className="pl-3 pr-7">Create</span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={handleCreate}
          >
            Task
          </button>
          <hr />
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={handleCreate}
          >
            Event
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateButton;
