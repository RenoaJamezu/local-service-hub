import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import testRoutes from "./routes/test.route";
import authRoutes from "./routes/auth.route";
import serviceRoutes from "./routes/service.route";
import bookingRoutes from "./routes/booking.route";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();
const app = express();

// middleware
app.use(cors(
  {origin: process.env["FRONTEND_URL"]}
));
app.use(express.json());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.send("Hello Local-Service-Hub");
});
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(errorHandler);

export default app;