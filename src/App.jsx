import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "./context/GlobalContext";
import { getMonth } from "./utli";
import CalenderHeader from "./components/CalenderHeader";
import Month from "./components/Month";
import Sidebar from "./components/Sidebar";
import EventModel from "./components/EventModel";

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex,showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModel /> }
      <div className="h-screen flex flex-col">
        <CalenderHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
