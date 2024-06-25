import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Calendar = ({ width = "350px", style = {} }) => {
  const [dateContext, setDateContext] = useState(moment());
  const [today] = useState(moment());
  const [showMonthPopup, setShowMonthPopup] = useState(false);
  const [showYearNav, setShowYearNav] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const weekdaysShort = moment.weekdaysShort();
  const months = moment.months();

  const year = () => dateContext.format("Y");
  const month = () => dateContext.format("MMMM");
  const daysInMonth = () => dateContext.daysInMonth();
  const currentDate = () => dateContext.get("date");
  const currentDay = () => dateContext.format("D");
  const firstDayOfMonth = () => moment(dateContext).startOf('month').format('d');

  const setMonth = (month) => {
    const monthNo = months.indexOf(month);
    let newDateContext = moment(dateContext).set("month", monthNo);
    setDateContext(newDateContext);
  };

  const nextMonth = () => {
    let newDateContext = moment(dateContext).add(1, "month");
    setDateContext(newDateContext);
  };

  const prevMonth = () => {
    let newDateContext = moment(dateContext).subtract(1, "month");
    setDateContext(newDateContext);
  };

  const onSelectChange = (e, data) => {
    setMonth(data);
  };

  const SelectList = ({ data }) => (
    <div className="absolute bg-white border-2 border-sky-500 p-2">
      {data.map((data) => (
        <div key={data}>
          <a href="#" onClick={(e) => onSelectChange(e, data)}>
            {data}
          </a>
        </div>
      ))}
    </div>
  );

  const onChangeMonth = () => {
    setShowMonthPopup(!showMonthPopup);
  };

  const MonthNav = () => (
    <span className="text-sm cursor-pointer" onClick={onChangeMonth}>
      {month()}
      {showMonthPopup && <SelectList data={months} />}
    </span>
  );

  const showYearEditor = () => setShowYearNav(true);

  const setYear = (year) => {
    let newDateContext = moment(dateContext).set("year", year);
    setDateContext(newDateContext);
  };

  const onYearChange = (e) => {
    setYear(e.target.value);
  };

  const onKeyUpYear = (e) => {
    if (e.which === 13 || e.which === 27) {
      setYear(e.target.value);
      setShowYearNav(false);
    }
  };

  const YearNav = () => (
    showYearNav ?
      <input
        defaultValue={year()}
        className="max-w-[3.6em] text-sm"
        ref={(yearInput) => { yearInput && yearInput.focus(); }}
        onKeyUp={onKeyUpYear}
        onChange={onYearChange}
        type="number"
        placeholder="year" />
      :
      <span className="text-sm" onDoubleClick={showYearEditor}>
        {year()}
      </span>
  );

  const onDayClick = (e, day) => {
    setSelectedDay(day);
    console.log("SELECTED DAY: ", selectedDay);
  };

  useEffect(() => {
    // Additional effects can be added here if needed
  }, [dateContext]);

  const generateCalendar = () => {
    let blanks = [];
    for (let i = 0; i < firstDayOfMonth(); i++) {
      blanks.push(<td key={i * 80} className="emptySlot h-10 text-center">{""}</td>);
    }

    let daysInMonthArray = [];
    for (let d = 1; d <= daysInMonth(); d++) {
      let className = (d === parseInt(currentDay()) ? "bg-[#4d989d] text-white rounded-full" : "text-center h-10 cursor-pointer");
      let selectedClass = (d === selectedDay ? " bg-[#4d989d] text-white rounded-full" : "text-center h-10 cursor-pointer");
      daysInMonthArray.push(
        <td key={d} className={`${className} ${selectedClass}`}>
          <span onClick={(e) => onDayClick(e, d)}>{d}</span>
        </td>
      );
    }

    var totalSlots = [...blanks, ...daysInMonthArray];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if ((i % 7) !== 0) {
        cells.push(row);
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });

    return rows.map((d, i) => (
      <tr key={i * 100}>{d}</tr>
    ));
  };

  return (
    <div className="border-2 border-[#4d989d] p-4 shadow-lg rounded-xl" style={{ width, ...style }}>
      <table className="w-full bg-white border-collapse border-spacing-0">
        <thead>
          <tr className="border-b border-dashed border-[#4d989d] text-xl">
            <td colSpan="5" className="px-2">
              <MonthNav />{" "}
              <YearNav />
            </td>
            <td colSpan="2" className="relative text-xs top-2 right-1 text-right">
              <i className="fa fa-chevron-left cursor-pointer" onClick={prevMonth}></i>
              <i className="fa fa-chevron-right cursor-pointer ml-2" onClick={nextMonth}></i>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {weekdaysShort.map((day) => (
              <td key={day} className="text-center h-10 text-sm">{day}</td>
            ))}
          </tr>
          {generateCalendar()}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
