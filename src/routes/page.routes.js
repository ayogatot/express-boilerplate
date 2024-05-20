import { Router } from "express";
import pageController from "../controllers/page.controller";
import JwtService from "../modules/jwt.module";


const pageRoutes = Router();

pageRoutes.put("/:page_id", JwtService.jwtGetToken, pageController.update);
pageRoutes.post("/", JwtService.jwtGetToken, pageController.add);
pageRoutes.get("/", pageController.getAll);

export { pageRoutes };
