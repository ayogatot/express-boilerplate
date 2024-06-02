import multer from "multer";
import { logger } from "express-glass";
import { InternalServerError, ValidationError } from "../utils/ApiError";
import responseUtil from "../utils/Response";
import { objectToLogStr } from "../utils/ObjectToLog";
import imageService from "../services/image.service";
import { upload } from "../utils/FileUpload";

const imageController = {};

imageController.update = async (req, res, next) => {
  logger().info(`update image, image_id = ${req.params.image_id}`);

  if (!req.params.image_id) throw new ValidationError("image_id is required");

  upload.single("image")(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        throw new InternalServerError(err);
      } else if (err) {
        throw new InternalServerError(err);
      }

      const result = await imageService.update(req.params.image_id, req.file);
      responseUtil.success(res, result);
    } catch (error) {
      logger().error(`page add failed, error = ${error}`);
      next(error);
    }
  });
};

imageController.getAll = async (req, res, next) => {
  try {
    logger().info(`get all image request`);

    const result = await imageService.getAll(req.query);
    responseUtil.success(res, result);
  } catch (error) {
    logger().info(`get all image failed, error = ${error}`);
    next(error);
  }
};

imageController.create = async (req, res, next) => {
  upload.single("image")(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        throw new InternalServerError(err);
      } else if (err) {
        throw new InternalServerError(err);
      }

      logger().info(`create image request for page_id = ${objectToLogStr(req.body)}`);

      if (!req.body.page_id) throw new ValidationError("page_id is required");

      if(!req.file) throw new ValidationError("image is required");

      const result = await imageService.create(req.body.page_id, req.file);
      responseUtil.success(res, result);
    } catch (error) {
      logger().error(`page add failed, error = ${error}`);
      next(error);
    }
  });
};

export default imageController;
