import React, { useEffect, useReducer, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    default:
      throw new Error();
  }
}

function initEvents() {
  try {
    const storageEvent = localStorage.getItem("savedEvents");
    if (!storageEvent || storageEvent === "undefined" || storageEvent === "null") {
      return [];
    }
    return JSON.parse(storageEvent);
  } catch (error) {
    console.error("Failed to parse savedEvents from localStorage", error);
    return [];
  }
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
