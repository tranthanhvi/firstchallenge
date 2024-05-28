import React, { useState } from 'react';
import './App.css';

const App = () => {
  
  const weeks = [1,2,3,4,5,6,7];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const initialAvailability = weeks.map(() => ({
    enabled: false,
    days: Array(days.length).fill(false),
  }));

  const [availability, setAvailability] = useState(initialAvailability);

  const toggleWeek = (weekIndex) => {
    setAvailability((prev) => {
      const newAvailability = prev.map((week, index) => {
        if (index != weekIndex) {
          return week;
        };
        return {
          ...week,
          enabled: !week.enabled,
          days: week.enabled ? Array(days.length).fill(false) : week.days,
        };
      });
      return newAvailability;
    });
  }

  const toggleDay = (weekIndex, dayIndex) => {
    setAvailability((prev) => {
      const newAvailability = prev.map((week, wIndex) => {
        if (weekIndex === wIndex) {
          const newDays = week.days.map((day, dIndex) => {
            if (dayIndex === dIndex) {
              return !day;
            }
            return day;
          })
          return {...week,days: newDays}
        }
        return week;
      })
      return newAvailability;
    })
  }

return (
  <>
   <h4>My availability in upcoming 7 weeks</h4>
    <div className='availability'>
      {weeks.map((week, weekIndex) => (
        <div key={week} className='week'>
          <label>
            Week {week}
              <input 
              type='checkbox'
              checked={availability[weekIndex].enabled}
              onChange={() => toggleWeek(weekIndex)}
              />
          </label>
          <div className='days'>
            {days.map((day, dayIndex) =>
              <input 
              key={day} 
              value={day}
              type='button'
              className={`day ${availability[weekIndex].days[dayIndex] ? 'selected' : ''}`} 
              disabled={!availability[weekIndex].enabled}
              onClick={() => toggleDay(weekIndex, dayIndex)}  
              />

            )}
          </div>

        </div>
      ))}
    </div>

    <button className='save' onClick={() => alert('Your availability has been saved!')}>Save</button>
  </>
)
}

export default App
