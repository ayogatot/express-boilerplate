import { Router } from "express";
import newsletterController from "../controllers/newsletter.controller";


const newsletterRoutes = Router();

newsletterRoutes.post("/", newsletterController.add);
newsletterRoutes.get("/", newsletterController.getAll);
newsletterRoutes.delete("/:newsletter_id", newsletterController.deleteById);

export { newsletterRoutes };
