import express, { Application } from "express";
import bodyParser from "body-parser";

import bookRoutes from "./routes/bookRoutes";
import userRoutes from "./routes/userRoutes";
import { User } from "./types/user";
import errorHandler from "./middleware/errorHandler";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

const app: Application = express();

app.use(bodyParser.json());

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;
