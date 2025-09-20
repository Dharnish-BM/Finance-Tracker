const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");
const protect = require("./middleware/auth");
const cors = require("cors");
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",  // allow frontend
  credentials: true                 // allow cookies/auth headers if needed
}));
// Public routes
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
//app.use("/api/chat",chatRoutes)
// Protected financial tracker route
app.get("/api/finance", protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}, here are your transactions...` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
