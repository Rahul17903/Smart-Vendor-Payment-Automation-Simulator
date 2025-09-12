import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";


dotenv.config();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "production";


connectDB();

const app = express();


app.use(cors()); // Enable cross-origin requests
app.use(helmet()); // Add security headers
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data


// Logging (only in dev mode)
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${NODE_ENV} mode at http://localhost:${PORT}`
  );
});
