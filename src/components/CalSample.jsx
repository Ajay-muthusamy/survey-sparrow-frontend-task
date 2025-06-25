import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { getMonth } from "../utli.js";
import GlobalContext from "../context/GlobalContext.js";

const CalenderSidebar = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [currentMonth, setCurrentMonth] = useState(
    getMonth(dayjs().year(), dayjs().month())
  );

  const { monthIndex, setMonthIndex, setDaySelected, daySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(currentYear, currentMonthIdx));
  }, [currentMonthIdx, currentYear]);

  useEffect(() => {
    if (monthIndex !== null && monthIndex !== undefined) {
      const newDate = dayjs().month(monthIndex);
      setCurrentMonthIdx(newDate.month());
      setCurrentYear(newDate.year());
    }
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
 
  function getDayClass(day) {
    const format = "YYYY-MM-DD";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
  
    // console.log("Now:", nowDay, "Current:", currDay, "Selected:", slcDay);
  
    if (nowDay === currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if (slcDay && currDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  }
  

  return (
    <div className="mt-9">
      <header className="flex justify-between items-center">
        <p className="text-gray-500 font-bold text-1xl">
          {dayjs(new Date(currentYear, currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div>
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
        </div>
      </header>

      <div className="grid grid-cols-7 mt-4 mb-2">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-[13px] py-1 text-center underline">
            {day.format("dd").charAt(0)}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setMonthIndex(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={`py-1 w-full ${getDayClass(day)}`}
              >
                <span className="text-[12px]">{day.format('D'   )}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CalenderSidebar;