import { Router } from "express";

import {
  register,
  login,
  getMe,
  updateUserRole,
  verifyEmail,
} from "../controllers/userController";
import { protect, restrictTo } from "../middleware/authMiddleware";
import Roles from "../utils/roles";
import validateRequest from "../middleware/validateRequest";
import {
  registerUserSchema,
  updateUserRoleSchema,
} from "../validators/userValidator";

const router = Router();

router.post("/register", validateRequest(registerUserSchema), register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put(
  "/:id/role",
  protect,
  restrictTo(Roles.ADMIN),
  validateRequest(updateUserRoleSchema),
  updateUserRole
);
router.get("/verify-email", verifyEmail);

export default router;
