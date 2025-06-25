import React, { useContext, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdContactSupport } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

const CalenderHeader = () => {
  const [selected, setSelected] = useState("Month");
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleReset() {
    setMonthIndex(dayjs().month());
  }

  const handleSettings = () => {
    toast.info("Settings Clicked");
  };

  const handleLogout = () => {
    toast.success("Logged Out Successfully");
  };

  return (
    <header className="px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="https://static.vecteezy.com/system/resources/previews/000/353/828/original/vector-calendar-icon.jpg"
          alt="calendar"
          className="mr-2 w-12 h-12"
        />
        <h1 className="mr-10 text-xl text-gray-500 font-bold">Calendar</h1>

        <button
          onClick={handleReset}
          className="border rounded py-2 px-4 mr-5 hover:bg-gray-100 transition"
        >
          Today
        </button>

        <button onClick={handlePrevMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            chevron_left
          </span>
        </button>

        <button onClick={handleNextMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            chevron_right
          </span>
        </button>

        <h2 className="ml-4 text-lg text-gray-600 font-semibold">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </div>
      <div className="flex gap-5 items-center">
        <div>
          <IoSearchOutline className="text-2xl hover:bg-gray-200 rounded-full cursor-pointer" />
        </div>
        <div>
          <MdContactSupport className="text-2xl hover:bg-gray-200 rounded-full cursor-pointer" />
        </div>
        <div>
          <IoIosSettings className="text-3xl hover:bg-gray-200 rounded-full cursor-pointer" />
        </div>

        <div className="w-36">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          >
            <option value="Day">Day</option>
            <option value="Week">Week</option>
            <option value="Month">Month</option>
            <option value="Year">Year</option>
          </select>
        </div>
        <div>
          <img
            src="https://avatars.githubusercontent.com/u/127031263?v=4"
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default CalenderHeader;
