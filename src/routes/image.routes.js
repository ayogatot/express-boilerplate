import { Router } from "express";
import imageController from "../controllers/image.controller";
import JwtService from "../modules/jwt.module";

const imageRoutes = Router();

imageRoutes.post("/", JwtService.jwtGetToken, imageController.create);
imageRoutes.get("/", imageController.getAll);
imageRoutes.put("/:image_id", imageController.update);
imageRoutes.delete("/:image_id", JwtService.jwtGetToken, imageController.delete);

export { imageRoutes };
