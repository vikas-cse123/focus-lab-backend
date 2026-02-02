import express from "express";
import { connectDb } from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

await connectDb();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser())

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is  running on ${port} port`);
});
