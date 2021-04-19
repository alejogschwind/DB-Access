import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import { createConnection } from "typeorm";
import "reflect-metadata";
import userRoutes from "./routes/user.routes"
import courseRoutes from "./routes/course.routes"

const PORT = 5002;

const app = express();
createConnection();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req: Request, res: Response): Response => {
  return res.json({ "ok": true })
})

// Routes
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(PORT, () => {
  console.log(`Server listeing at http://localhost:${PORT}`);
});