import { Router } from "express";
import applicantController from "../controllers/applicant.controller";
import JwtService from "../modules/jwt.module";


const applicantRoutes = Router();

applicantRoutes.post("/", applicantController.add);
applicantRoutes.get("/", JwtService.jwtGetToken, applicantController.getAll);

applicantRoutes.delete("/:applicant_id", JwtService.jwtGetToken, applicantController.deleteById);
applicantRoutes.get("/:applicant_id", applicantController.getById);


export { applicantRoutes };
