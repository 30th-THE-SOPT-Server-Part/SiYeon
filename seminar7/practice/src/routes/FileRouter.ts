import { Router } from "express";
import { FileController } from "../controllers";
import upload from "../config/multer";

const router: Router = Router();

router.post('/upload', upload.array('file'), FileController.uploadFilesToS3); //single OR array


export default router; 