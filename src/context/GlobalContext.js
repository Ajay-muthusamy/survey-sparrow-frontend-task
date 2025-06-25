import React from 'react';
import CalenderSidebar from '../components/CalenderSidebar';

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index ) => {}, 
  calenderSidebarMonth: 0,
  setCalenderSidebarMonth : (index) =>{},
  daySelected : null,
  setDaySelected:(day) => {},
  showEventModal:false,
  setShowEventModal : () => {},
  dispatchCalEvent :({type,payload}) => {},
  savedEvents : [],
  label : [],
  setLabel : () => {},
});

export default GlobalContext;
