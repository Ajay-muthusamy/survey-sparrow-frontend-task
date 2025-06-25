import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import GlobalContext from "../context/GlobalContext";
import { FiTrash2 } from "react-icons/fi";

const Day = ({ day, rowIdx, events }) => {
  const [dayEvent, setDayEvents] = useState([]);
  const [eventModel, setEventModel] = useState(null);
  const [optionModel, setoptionModel] = useState(false);
  const today = dayjs();
  const currentMonth = today.month();

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === today.format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
      : "text-gray-700";
  }

  const isOtherMonth = day.month() !== currentMonth;
  const isFirstDayOfOtherMonth = day.date() === 1 && isOtherMonth;

  const dayEvents = events?.filter(
    (event) => event.date === day.format("YYYY-MM-DD")
  );

  const { setDaySelected, setShowEventModal, savedEvents, dispatchCalEvent } =
    useContext(GlobalContext);

  useEffect(() => {
    const events = savedEvents.filter(
      (evt) => dayjs(evt.day).format("YYYY-MM-DD") === day.format("YYYY-MM-DD")
    );
    setDayEvents(events);
  }, [savedEvents, day]);

  function handleDelete() {
    if (eventModel) {
      dispatchCalEvent({ type: "delete", payload: eventModel });
      setEventModel(null);
      setoptionModel(false);
    }
  }

  return (
    <div className="border border-gray-200 flex flex-col hover:bg-gray-50 min-h-[80px] cursor-pointer">
      <header className="flex flex-col items-center py-1">
        {rowIdx === 0 && (
          <p className="text-xs font-medium text-gray-500 mb-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}

        <div className={`${getCurrentDayClass()}`}>
          <p className="text-sm font-semibold">
            {isFirstDayOfOtherMonth ? day.format("MMM DD") : day.format("DD")}
          </p>
        </div>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      ></div>
      <div className="">
        {dayEvent.map((evt, idx) => (
          <div
            key={idx}
            className={`${evt.label}  truncate text-white text-xs px-1 py-1 mb-1 rounded cursor-pointer hover:opacity-90`}
            onClick={() => setEventModel(evt)}
          >
            {evt.title}
          </div>
        ))}
      </div>

      <div className="p-2 mt-[-20px] space-y-1">
        {dayEvents?.map((event, idx) => (
          <div
            key={idx}
            className="truncate text-white text-xs px-1 py-0.5 rounded cursor-pointer hover:opacity-90"
            style={{ backgroundColor: event.color }}
            onClick={() => setEventModel(event)}
          >
            {event.title}
          </div>
        ))}
      </div>

      {eventModel && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => {
            setEventModel(null);
            setoptionModel(false);
          }}
        >
          <div
            className="bg-gray-100 p-5 shadow-xl w-96 h-70 rounded-[30px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end space-x-6">
              <IoMdMore
                className="text-2xl"
                onClick={() => setoptionModel(!optionModel)}
              />
              {optionModel && (
                <div className="fixed mt-10 px-10 flex items-center justify-center">
                  <div className="shadow-xl relative bg-[#d3d8d8] p-3 rounded-lg">
                    {["Print", "Duplicate", "Report as Scam"].map(
                      (option, index) => (
                        <div className="py-2  rounded-md">
                          <p>{option}</p>
                          <hr />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {eventModel.trash ? null : (
                <FiTrash2
                  className="text-2xl text-red-500 cursor-pointer"
                  onClick={handleDelete}
                  title="Delete"
                />
              )}

              <IoCloseOutline
                className="text-2xl cursor-pointer"
                onClick={() => {
                  setEventModel(null);
                  setoptionModel(false);
                }}
              />
            </div>

            <div className="flex items-center gap-4 pt-8">
              <p
                className="w-5 h-5 rounded-md"
                style={{ backgroundColor: eventModel.color }}
              ></p>
              <h2 className="text-3xl mb-2">{eventModel.title}</h2>
            </div>

            <p className="pb-2 ms-10">
              <span className="font-medium"></span>{" "}
              {day.format("DD , MMMM YYYY")}
            </p>
            <hr />

            <hr />
            {eventModel.trash ? (
              <>
                {eventModel.time ? (
                  <p className="mt-2 ms-10">
                    <span className="font-medium">⏳</span>{" "}
                    {eventModel.startTime} - {eventModel.endTime}
                  </p>
                ) : (
                  <p className="mt-2 ms-10">
                    <span className="font-medium">🗓️</span> Holidays in India
                  </p>
                )}
              </>
            ) : (
              <div>
                <div className="pl-10 pb-5">
                  <p className="text-gray-700 underline py-1 ">Description </p>
                  <p>{eventModel.description}</p>
                </div>
                <div className="pl-10">
                  <h2 className="text-gray-700 underline">Location</h2>
                  <h1>{eventModel.location}</h1>
                </div>
              </div>
            )}
            <hr />
          </div>
        </div>
      )}
    </div>
  );
};

export default Day;
