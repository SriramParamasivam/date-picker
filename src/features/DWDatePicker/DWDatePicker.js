import React, { useState, useEffect } from 'react';
import { days, getMonths, months } from './Utils';
import styles from './DWDatePicker.module.css';

export function DWDatePicker({ calenderStartDay }) {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear())
  const [month, setMonth] = useState(date.getMonth())
  const [monthDetails, setMonthDetails] = useState(getMonths(year, month));
  const [timesClicked, setTimesClicked] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const setMonthAction = (decideMonth) => {
    let _year = year;
    let _month = month + decideMonth;
    if (_month === -1) {
      _month = 11;
      _year--;
    } else if (_month === 12) {
      _month = 0;
      _year++;
    }
    setYear(_year);
    setMonth(_month);
    setMonthDetails(getMonths(_year, _month))
  }

  const onDateClick = (_refDate) => {
    if (_refDate.month !== 0) {
      return;
    }
    setTimesClicked(timesClicked + 1);
    setSelectedDate(new Date(_refDate.timestamp).toLocaleDateString());
  }

  useEffect(() => {
    if (timesClicked % 2 === 0) {
      setEndDate(selectedDate);
    }
    else {
      setStartDate(selectedDate);
      setEndDate("");
    }

  }, [selectedDate, timesClicked]);

  const renderDays = () => {
    if (calenderStartDay) {
      const modifiedDays = [];
      for (let start = 0; start < 7; start++) {
        let tempDay = (start + calenderStartDay) % 7;
        modifiedDays.push(days[tempDay]);
      }
      return modifiedDays.map((_day, index) => {
        return <li key={`days-${index}`} >{_day}</li>
      })
    }
    else {
      return days.map((_day, index) => {
        return <li key={`days-${index}`} >{_day}</li>
      })
    }
  }

  const renderDates = () => {
    if (calenderStartDay) {
      const modifiedDays = [];
      const rotate = (arr, count) => {
        return [...arr.slice(count, arr.length), ...arr.slice(0, count)];
      };
      rotate(monthDetails, calenderStartDay).forEach((ref, index) => {
        modifiedDays.push(
          <li key={`month-${index}`} onClick={() => onDateClick(ref)}>
            {ref.month === 0 ? ref.date : ''}
          </li>
        );
      });
      return modifiedDays;

      // 2nd solution
      // for (let start = 0; start < monthDetails.length; start++) {
      //   let tempDay = (start + calenderStartDay) % monthDetails.length;
      //   modifiedDates.push(monthDetails[tempDay]);
      // }
      // return modifiedDates.map((ref, index) => {
      //   return <li key={`month-${index}`} onClick={() => onDateClick(ref)}>{ref.month === 0 ? ref.date : ''}</li>;
      // });

    } else {
      return monthDetails.map((ref, index) => {
        return <li key={`month-${index}`} onClick={() => onDateClick(ref)}>{ref.month === 0 ? ref.date : ''}</li>
      })
    }
  }

  return (
    <div className="calendar">
      <header>
        <span className={styles.arrow} onClick={() => setMonthAction(-1)}>{' < '}</span>
        <h1>{`${months[month]} - ${year.toString()}`}</h1>
        <span className={styles.arrow} onClick={() => setMonthAction(1)}>{' > '}</span>
      </header>

      <ul className="weekdays">
        {renderDays()}
      </ul>

      <ol className="day-grid">
        {renderDates()}
      </ol>
      {
        (startDate || endDate) && <div className="results">{`${startDate} - ${endDate}`}</div>
      }

    </div>
  );
}
