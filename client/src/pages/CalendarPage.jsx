import { motion } from "framer-motion";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const handleAddEvent = () => {
    const title = prompt("Enter event title:");
    if (title) {
      setEvents([...events, { date: date.toDateString(), title }]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto mt-24 p-6"
    >
      <h1 className="text-3xl font-bold text-center text-[#7209b7] mb-6">
        📅 My Calendar
      </h1>

      {/* Calendar */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <Calendar
          onChange={setDate}
          value={date}
          className="rounded-lg"
        />

        {/* Selected Date */}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Selected: {date.toDateString()}
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddEvent}
            className="mt-4 px-5 py-2 rounded-lg bg-[#7209b7] hover:bg-[#9d4edd] transition text-white font-semibold shadow-md"
          >
            Add Event
          </motion.button>
        </div>
      </div>

      {/* Events List */}
      {events.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">My Events</h3>
          <ul className="space-y-2">
            {events.map((event, i) => (
              <li
                key={i}
                className="px-4 py-2 bg-[#f8f9fa] rounded-lg shadow-sm text-gray-700 flex justify-between"
              >
                <span>{event.title}</span>
                <span className="text-sm text-gray-500">
                  {event.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

export default CalendarPage;
