import { motion } from "framer-motion";

function CalendarPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 px-6 bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc] flex gap-6 pb-6" // added pb-6
    >
      {/* Calendar Section */}
      <div className="w-[70%] bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
        <iframe
          src="https://calendar.google.com/calendar/embed?height=700&wkst=1&ctz=Asia%2FKolkata&showPrint=0&showTitle=0"
          style={{ border: "1px solid #777" }}
          className="w-full h-[calc(100vh-8rem)] rounded-2xl" // reduced height a bit
          frameBorder="0"
          scrolling="no"
          title="Google Calendar"
        ></iframe>
      </div>

      {/* Sidebar Cards */}
      <div className="w-[25%] flex flex-col gap-6">
        <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          {/* Card 1 - Empty for now */}
        </div>
        <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          {/* Card 2 - Empty for now */}
        </div>
        <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          {/* Card 3 - Empty for now */}
        </div>
      </div>
    </motion.div>
  );
}

export default CalendarPage;
