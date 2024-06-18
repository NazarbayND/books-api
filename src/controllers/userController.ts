import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";

import prisma from "../utils/db";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const signToken = (id: number): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  user: any,
  statusCode: number,
  res: Response
): void => {
  const token = signToken(user.id);
  res.status(statusCode).json({
    status: "success",
    token,
  });
};

const sendVerificationEmail = async (user: any, token: string) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  const msg = {
    to: user.email,
    from: process.env.EMAIL_FROM as string,
    subject: "Email Verification",
    html: `<p>Please click the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a></p>`,
  };

  await sgMail.send(msg);
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const emailVerificationToken = signToken(req.body.email);

    const newUser = await prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword,
        emailVerificationToken,
      },
    });

    await sendVerificationEmail(newUser, emailVerificationToken);

    createSendToken(newUser, 201, res);
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as { id: number };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user || user.emailVerificationToken !== token) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerificationToken: null,
      },
    });

    res.status(200).json({ message: "Email successfully verified" });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Please provide username and password" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Incorrect email or password" });
      return;
    }

    if (!user.emailVerified) {
      res
        .status(403)
        .json({ message: "Email not verified. Please verify your email." });
      return;
    }

    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    if (user) {
      user.password = undefined;
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id, 10) },
      data: { role: req.body.role },
    });
    user.password = undefined;
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};
