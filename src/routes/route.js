import { Router } from "express";
import home from "../controllers/home.js";
import admin from "../controllers/admin.js";
import { deleteUser } from "../controllers/deleteUser.js";

const router = Router();

router.get("/", home);

router.get("/admin", admin);

router.get("/admin/delete", deleteUser);

export default router;
