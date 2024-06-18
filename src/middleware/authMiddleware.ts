import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import prisma from "../utils/db";
import Roles from "../utils/roles";

interface JwtPayload {
  id: number;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res
      .status(401)
      .json({ message: "You are not logged in! Please log in to get access." });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!currentUser) {
      res.status(401).json({
        message: "The user belonging to this token no longer exists.",
      });
      return;
    }
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
};

export const restrictTo = (role: Roles) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.user.role !== role) {
      res
        .status(403)
        .json({ message: "You do not have permission to perform this action" });
      return;
    }
    next();
  };
};
