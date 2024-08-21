import { Router } from "express";
import path from "path";
import { expressIsAuth } from "../middleware/is-auth";
import { User } from "../entities/user";
import { upload } from "./post-upload";

const router = Router();

export default router;
