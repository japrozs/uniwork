import { Router } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { expressIsAuth } from "../middleware/is-auth";
import { v4 as uuidv4 } from "uuid";
import { Post } from "../entities/post";
// import { User } from "../entities/user";

const router = Router();

// Define the local storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../../uploads/");

        // Ensure the directory exists
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const name = uuidv4();
        cb(null, `${name}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage,
    fileFilter: (_, file: any, callback: FileFilterCallback) => {
        if (file.mimetype.includes("image")) {
            callback(null, true);
        } else {
            callback(new Error("Not an image"));
        }
    },
});

router.post(
    "/post",
    expressIsAuth,
    upload.array("files", 4), // Accept up to 4 files
    async (req, res) => {
        if (!req.files) {
            return res.status(200).json({ message: "No files uploaded" });
        }

        const filePaths = (req.files as Express.Multer.File[]).map((file) => {
            return path.join("uploads/", file.filename);
        });

        const post = await Post.create({
            body: req.body.body,
            creatorId: req.session.userId,
            attachments: filePaths,
        }).save();

        return res.status(200).json(post);
    }
);

export default router;
