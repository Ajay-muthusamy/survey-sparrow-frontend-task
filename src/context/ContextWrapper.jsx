import React, { useEffect, useReducer, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, { type, payload }) {
  console.log("Reducer called with:", type, payload);
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvent = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvent ? JSON.parse(storageEvent) : [];
  return parsedEvents;
}
export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [calenderSidebarMonth, setCalenderSidebarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [label, setLabel] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabel((prevlabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
        const currentlabel = prevlabels.find((lbl) => lbl.label === label);
        return {
          label,
          checked : currentlabel ? currentlabel.checked : true,
        };
      });
    });
  },[savedEvents]);


  useEffect(() => {
    if (calenderSidebarMonth !== null) {
      setMonthIndex(calenderSidebarMonth);
    }
  }, [calenderSidebarMonth]);
  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        calenderSidebarMonth,
        setCalenderSidebarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        savedEvents,
        setLabel,
        label
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
