import { Router } from "express";
import contactController from "../controllers/contact.controller";
import JwtService from "../modules/jwt.module";


const contactRoutes = Router();

contactRoutes.post("/", contactController.add);
contactRoutes.get("/", JwtService.jwtGetToken, contactController.getAll);
contactRoutes.delete("/:contact_id", JwtService.jwtGetToken, contactController.deleteById);

export { contactRoutes };
