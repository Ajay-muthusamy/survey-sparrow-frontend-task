import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { FaRegClock, FaCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";

const EventModel = () => {
  const { daySelected, setShowEventModal, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);
  const [title, setTitle] = useState();
  const [eventDetail, setEventDetail] = useState(true);

  const todayDate = new Date().toISOString().split("T")[0];
  const [today, setToday] = useState(todayDate);
  const [addGuest, setAddGuest] = useState(false);
  const [addLocation, setAddLocation] = useState(false);
  const [addDescription, setaddDescription] = useState(false);
  const [selectLabel, setSelectLabel] = useState("indigo");

  const [guest, setGuest] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(todayDate);
  const [endDate, setEndDate] = useState(todayDate);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  function handlesubmit(e) {
    e.preventDefault();

    const calendarEvent = {
      id: Date.now(),
      title,
      start: startDate,
      end: endDate,
      day: daySelected.valueOf(),
      label: selectLabel,
      guest,
      location,
      description,
    };

    console.log(calendarEvent);
    
    dispatchCalEvent({ type: "push", payload: calendarEvent });
    setShowEventModal(false);
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center p-3">
      <form
        className="bg-[#F0F4F9] rounded-lg shadow-2xl w-[75vh]"
        onSubmit={handlesubmit}
      >
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <button onClick={() => setShowEventModal(false)}>
            <span className="material-icons-outlined text-gray-400">close</span>
          </button>
        </header>
        <div>
          <p className="pl-8">🗓️ {daySelected.format("dddd,MMMM DD")}</p>
        </div>
        <div className="pl-5 ms-3 p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title and Time"
              value={title}
              className="border-0 border-b-2 border-gray-300 bg-transparent text-gray-700 text-2xl
              focus:border-blue-500 focus:outline-none focus:ring-0 placeholder-gray-600 "
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                type="button"
                className={`text-sm ${
                  eventDetail ? "py-3 px-2 rounded-lg bg-blue-300" : "py-3 px-2"
                }`}
                onClick={() => setEventDetail(true)}
              >
                <span>Event</span>
              </button>
              <button
                type="button"
                className={`text-sm ${
                  eventDetail ? "py-3 px-2" : "py-3 px-2 rounded-lg bg-blue-300"
                }`}
                onClick={() => setEventDetail(false)}
              >
                <span>Task</span>
              </button>
            </div>
            <hr />
            <div>
              {eventDetail ? (
                <div className="ms-2">
                  <div>
                    <div className="hover:bg-gray-200 p-3 rounded-lg">
                      <span className="px-2">⌛</span>
                      <input
                        type="date"
                        className="bg-transparent pr-3"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                      <span className="px-3">-</span>
                      <input
                        type="date"
                        className="bg-transparent pl-3"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                    <hr />
                    <div
                      className={`hover:bg-gray-200 p-3 rounded-lg ms-2 cursor-pointer transition`}
                      onClick={() => setAddGuest(false)}
                    >
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setAddGuest(true);
                        }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-xl">🤵</span>

                        {addGuest ? (
                          <input
                            type="text"
                            placeholder="Add guest"
                            className="border-b border-gray-400 bg-transparent focus:border-blue-500 focus:outline-none px-1 text-gray-700 placeholder-gray-400"
                            autoFocus
                            value={guest}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setGuest(e.target.value)}
                          />
                        ) : (
                          <div className="text-gray-700 font-medium">
                            Add Guest
                          </div>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div
                      className={`hover:bg-gray-200 p-3 rounded-lg ms-2 cursor-pointer transition`}
                      onClick={() => setAddLocation(false)}
                    >
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setAddLocation(true);
                        }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-xl">🪧</span>

                        {addLocation ? (
                          <input
                            type="text"
                            placeholder="Add location"
                            className="border-b border-gray-400 bg-transparent focus:border-blue-500 focus:outline-none px-1 text-gray-700 placeholder-gray-400"
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                          />
                        ) : (
                          <div className="text-gray-700 font-medium">
                            Add location
                          </div>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div
                      className={`hover:bg-gray-200 p-3 rounded-lg ms-2 cursor-pointer transition`}
                      onClick={() => setaddDescription(false)}
                    >
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setaddDescription(true);
                        }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-xl">📝</span>

                        {addDescription ? (
                          <input
                            type="text"
                            placeholder="Add description"
                            className="border-b border-gray-400 bg-transparent focus:border-blue-500 focus:outline-none px-1 text-gray-700 placeholder-gray-400"
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        ) : (
                          <div className="text-gray-700 font-medium">
                            Add description or Goolge Drive attachment
                          </div>
                        )}
                      </div>
                    </div>
                    <hr />
                    <p className="pl-3 mt-2">Default Visible</p>
                    <div className="flex gap-2 mt-2 pl-3">
                      {[
                        { color: "indigo", hex: "bg-indigo-500" },
                        { color: "gray", hex: "bg-gray-500" },
                        { color: "green", hex: "bg-green-500" },
                        { color: "blue", hex: "bg-blue-500" },
                        { color: "red", hex: "bg-red-500" },
                        { color: "purple", hex: "bg-purple-500" },
                      ].map((ele, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`${ele.hex} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80`}
                          onClick={() => setSelectLabel(ele.hex)}
                        >
                          {selectLabel === ele.hex && (
                            <span className="material-icons-outlined text-white text-[14px] leading-none">
                              check
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    <hr />
                    <div className="flex justify-end text-white">
                      <button
                        type="submit"
                        className="bg-blue-600 rounded-full px-6 py-2"
                      >
                        <span>save</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="space-y-5 p-4 rounded-lg  text-gray-700 ">
                    <h1>Sechulde Time ⏲️</h1>
                    <div className="flex items-center space-x-3 bg-gray-100  p-3 rounded-lg">
                      <FaRegClock className="text-xl" />
                      <input
                        type="time"
                        className="bg-transparent outline-none text-gray-800 "
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                      <span className="text-gray-900">-</span>
                      <input
                        type="time"
                        className="bg-transparent outline-none text-gray-800 "
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </div>

                    <input
                      type="text"
                      name="title"
                      placeholder="Add description..."
                      value={description}
                      className="w-full border-0 border-b-2 border-gray-300 bg-transparent text-gray-900 dark:text-gray-600 text-2xl
        focus:border-blue-500 focus:outline-none focus:ring-0 placeholder-gray-500 dark:placeholder-gray-400"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <p className="pl-3 mt-2">Default Visible</p>
                  <div className="flex gap-2 mt-2 pl-3">
                    {[
                      { color: "indigo", hex: "bg-indigo-500" },
                      { color: "gray", hex: "bg-gray-500" },
                      { color: "green", hex: "bg-green-500" },
                      { color: "blue", hex: "bg-blue-500" },
                      { color: "red", hex: "bg-red-500" },
                      { color: "purple", hex: "bg-purple-500" },
                    ].map((ele, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`${ele.hex} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80`}
                        onClick={() => setSelectLabel(ele.hex)}
                      >
                        {selectLabel === ele.hex && (
                          <span className="material-icons-outlined text-white text-[14px] leading-none">
                            check
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end text-white">
                    <button
                      type="submit"
                      className="bg-blue-600 rounded-full px-6 py-2"
                    >
                      <span>save</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventModel;
