import { Router } from "express";
import newsController from "../controllers/news.controller";
import JwtService from "../modules/jwt.module";

const newsRoutes = Router();

newsRoutes
  .route("/:news_id")
  .get(newsController.getById)
  .put(JwtService.jwtGetToken, newsController.update)
  .delete(JwtService.jwtGetToken, newsController.deleteById);
newsRoutes
  .route("/")
  .get(newsController.getAll)
  .post(JwtService.jwtGetToken, newsController.add);

export { newsRoutes };
