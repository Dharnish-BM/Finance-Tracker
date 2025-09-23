import { motion } from "framer-motion";
import { Code2, Github, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  // 👇 Team Data (edit here)
  const team = [
    {
      name: "John Doe",
      dept: "Computer Science",
      img: "https://via.placeholder.com/200x300", // standing rectangle
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
      leetcode: "https://leetcode.com/username",
    },
    {
      name: "Jane Smith",
      dept: "Information Technology",
      img: "https://via.placeholder.com/200x300",
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
      leetcode: "https://leetcode.com/username",
    },
    {
      name: "Alice Brown",
      dept: "Electronics",
      img: "https://via.placeholder.com/200x300",
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
      leetcode: "https://leetcode.com/username",
    },
    {
      name: "Bob Lee",
      dept: "Mechanical",
      img: "https://via.placeholder.com/200x300",
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
      leetcode: "https://leetcode.com/username",
    },
    {
      name: "Sara Khan",
      dept: "Electrical",
      img: "https://via.placeholder.com/200x300",
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
      leetcode: "https://leetcode.com/username",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc] flex flex-col">
      {/* ================= Hero Section ================= */}
      <section
        id="hero"
        className="flex-1 flex items-center justify-center px-6 pt-28 pb-20"
      >
        <div className="max-w-3xl w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold text-[#2b2d42] tracking-tight leading-tight"
          >
            Welcome to <span className="text-[#9d4edd]">Zenith</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-[#2b2d42]/80 leading-relaxed"
          >
            Zenith is where innovation meets ambition. We’re building smarter
            solutions, pushing boundaries, and reaching new heights 🚀. Join us
            on this journey to the top.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button
              onClick={() => navigate("/login")}
              className="px-10 py-4 rounded-xl text-white font-semibold shadow-lg text-lg bg-gradient-to-r from-[#7209b7] to-[#9d4edd] hover:shadow-xl transition"
            >
              Go to Login
            </button>
            <a
              href="#team"
              className="px-10 py-4 rounded-xl text-[#2b2d42] font-semibold shadow-lg text-lg bg-white/60 hover:bg-white/80 backdrop-blur-md transition"
            >
              Meet the Team
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================= Team Section ================= */}
      <section id="team" className="w-full py-24 bg-white/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto text-center mb-16 px-6">
          <h2 className="text-4xl font-extrabold text-[#2b2d42]">
            Meet the Zenith Crew 🌟
          </h2>
          <p className="mt-4 text-[#2b2d42]/80 text-lg">
            A group of innovators, dreamers, and problem solvers. Together, we
            strive to make Zenith a symbol of limitless possibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 px-6">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 bg-white/60 backdrop-blur-md p-6 flex flex-col items-center text-center border border-white/50"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-64 object-cover rounded-xl shadow-md mb-5 border-4 border-white/70"
              />
              <h3 className="text-lg font-bold text-gray-800">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600">{member.dept}</p>

              <div className="flex gap-5 mt-4">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/70 hover:bg-white transition"
                >
                  <Github className="w-5 h-5 text-gray-700" />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/70 hover:bg-white transition"
                >
                  <Linkedin className="w-5 h-5 text-blue-600" />
                </a>
                <a
                  href={member.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/70 hover:bg-white transition"
                >
                  <Code2 className="w-5 h-5 text-amber-500" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
