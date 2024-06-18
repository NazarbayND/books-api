import { Request, Response, NextFunction } from "express";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";

interface PrismaError extends Error {
  code?: string;
  meta?: object;
}

const errorHandler = (
  err: PrismaError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err);

  if (err instanceof PrismaClientKnownRequestError) {
    res
      .status(400)
      .json({ error: err.message, code: err.code, meta: err.meta });
  } else if (err instanceof PrismaClientUnknownRequestError) {
    res.status(500).json({ error: "An unknown error occurred" });
  } else {
    res.status(400).json({ error: err.message });
  }
};

export default errorHandler;
