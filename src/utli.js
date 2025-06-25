import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

  let currentMonth = [];
  let date = dayjs(new Date(year, month, 1 - firstDayOfMonth));

  for (let row = 0; row < 6; row++) {
    let week = [];
    for (let col = 0; col < 7; col++) {
      week.push(date.clone()); 
      date = date.add(1, "day");
    }
    currentMonth.push(week);
  }

  return currentMonth;
}
