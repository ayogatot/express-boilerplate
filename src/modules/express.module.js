import path from 'path'
import cors from 'cors'
import express from "express";
import compression from "compression";
import { logger } from "express-glass";

import routes from "../routes";
import globalErrorHandler from "../middlewares/errorHandler.middleware";

let server;

const expressService = {
  init: async () => {
    try {
      server = express();
      server.use(compression())
      server.use(express.json());
      server.use(cors({ origin: "*" }));
      server.use(express.urlencoded({ extended: true }));
      server.use('/uploads', express.static(path.join(__dirname, '../uploads')));

      // Base URL
      server.get("/", (req, res) => res.send("Hello World"));

      // Routes
      server.use('/api/v1/auth', routes.authRoutes);
      server.use('/api/v1/news', routes.newsRoutes);
      server.use('/api/v1/pages', routes.pageRoutes);
      server.use('/api/v1/images', routes.imageRoutes);
      server.use('/api/v1/careers', routes.careerRoutes);
      server.use('/api/v1/contacts', routes.contactRoutes);
      server.use('/api/v1/applicants', routes.applicantRoutes);
      server.use('/api/v1/newsletters', routes.newsletterRoutes);

      server.use(globalErrorHandler);

      server.listen(5001);
      logger().info("[EXPRESS] Express initialized");
    } catch (error) {
      logger().error("[EXPRESS] Error during express service initialization");
      throw error;
    }
  },
};

export default expressService;
