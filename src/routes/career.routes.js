import { Router } from "express";
import careerController from "../controllers/career.controller";
import JwtService from "../modules/jwt.module";


const careerRoutes = Router();

careerRoutes.post("/", JwtService.jwtGetToken, careerController.add);
careerRoutes.get("/", careerController.getAll);
careerRoutes.put("/:career_id", JwtService.jwtGetToken, careerController.update);

export { careerRoutes };
