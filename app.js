import express from "express";
import { connectDb } from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js";

await connectDb();
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is  running on ${port} port`);
});
