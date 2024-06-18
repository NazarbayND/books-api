import { NextFunction, Request, Response } from "express";

import prisma from "../utils/db";

export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { publicationDate, ...others } = req.body;

    const book = await prisma.book.create({
      data: {
        ...others,
        publicationDate: new Date(publicationDate),
      },
    });
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(req.params.id, 10) },
    });
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const book = await prisma.book.update({
      where: { id: parseInt(req.params.id, 10) },
      data: req.body,
    });
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await prisma.book.delete({
      where: { id: parseInt(req.params.id, 10) },
    });
    res.status(204).json({ message: "Book deleted" });
  } catch (err) {
    next(err);
  }
};
