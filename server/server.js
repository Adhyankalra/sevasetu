const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/test", require("./routes/testRoutes"));

//other routes
app.use("/api/queue", require("./routes/queueRoutes"));

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const User = require("./models/User");

/*app.get("/test-db", async (req, res) => {
  const user = await User.create({
    name: "Test User",
    phone: Date.now().toString(),
  });

  res.json(user);
});
const { addToQueue, getQueueStatus } = require("./services/queueService");

app.get("/test-queue", async (req, res) => {
  const userId = "69d8144dfbe2f5bc776f2824";

  const entry = await addToQueue(userId, "OPD");

  const status = await getQueueStatus(userId);

  res.json({ entry, status });
});*/
