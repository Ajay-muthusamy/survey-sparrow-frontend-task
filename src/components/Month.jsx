import React from 'react';
import Day from './Day';
import eventData from '../json/eventdata.json'

const Month = ({ month }) => {

  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-6 border-t border-l rounded-lg">
      {month.flat().map((day, index) => (
        <Day 
          day={day} 
          key={index} 
          rowIdx={Math.floor(index / 7)} 
          events={eventData}
        />
      ))}
    </div>
  );
};

export default Month;
