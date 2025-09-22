import { motion } from "framer-motion";

function CalendarPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-28 p-6 bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc]"
    >

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden max-w-5xl mx-auto">
        <div className="w-full aspect-[16/9]">
          <iframe
            src="https://calendar.google.com/calendar/embed?height=700&wkst=1&ctz=Asia%2FKolkata&showPrint=0&showTitle=0"
            style={{ border: "1px solid #777" }}
            className="w-full h-full rounded-2xl"
            frameBorder="0"
            scrolling="no"
            title="Google Calendar"
          ></iframe>
        </div>
      </div>
    </motion.div>
  );
}

export default CalendarPage;
