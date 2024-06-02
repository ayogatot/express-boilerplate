import { Router } from "express";
import imageController from "../controllers/image.controller";
import JwtService from "../modules/jwt.module";

const imageRoutes = Router();

imageRoutes.post("/", JwtService.jwtGetToken, imageController.create);
imageRoutes.put("/:image_id", imageController.update);
imageRoutes.get("/", imageController.getAll);

export { imageRoutes };
