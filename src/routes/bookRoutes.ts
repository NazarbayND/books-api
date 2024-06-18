import { Router } from "express";

import {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController";
import { protect, restrictTo } from "../middleware/authMiddleware";
import Roles from "../utils/roles";
import validateRequest from "../middleware/validateRequest";
import { bookSchema } from "../validators/bookValidator";

const router = Router();

router.post(
  "/",
  protect,
  restrictTo(Roles.ADMIN),
  validateRequest(bookSchema),
  addBook
);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.put("/:id", protect, restrictTo(Roles.ADMIN), updateBook);
router.delete("/:id", protect, restrictTo(Roles.ADMIN), deleteBook);

export default router;
