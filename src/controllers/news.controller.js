import multer from "multer";
import { logger } from "express-glass";
import { InternalServerError, ValidationError } from "../utils/ApiError";
import responseUtil from "../utils/Response";
import { objectToLogStr } from "../utils/ObjectToLog";
import newsService from "../services/news.service";
import { upload } from "../utils/FileUpload";
import newsValidator from "../validators/news.validator";

const newsController = {};

newsController.add = async (req, res, next) => {
  logger().info(`add news, news_id = ${objectToLogStr(req.body)}`);

  upload.single("image")(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        throw new InternalServerError(err);
      } else if (err) {
        throw new InternalServerError(err);
      }

      const validationResult = newsValidator.addOrUpdate.validate(req.body);
      if (validationResult.error) {
        throw new ValidationError(validationResult.error.message);
      }
      const news = validationResult.value;
      news.image = req.file;

      const result = await newsService.add(news);
      responseUtil.success(res, result);
    } catch (error) {
      logger().error(`news add failed, error = ${error}`);
      next(error)
    }
  });
};

newsController.update = async (req, res, next) => {
  logger().info(`update news, news_id = ${req.params.news_id}`);

  if(!req.params.news_id) throw new ValidationError("news_id is required");

  upload.single("image")(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        throw new InternalServerError(err);
      } else if (err) {
        throw new InternalServerError(err);
      }

      if(!req.file) throw new ValidationError("image is required");

      const validationResult = newsValidator.addOrUpdate.validate(req.body);
      if (validationResult.error) {
        throw new ValidationError(validationResult.error.message);
      }

      const news = validationResult.value;
      news.file = req.file;

      const result = await newsService.update(req.params.news_id, news);
      responseUtil.success(res, result);
    } catch (error) {
      logger().error(`page add failed, error = ${error}`);
      next(error)
    }
  });
};

newsController.getAll = async (req, res, next) => {
  try {
    logger().info(`get all news request`);

    const result = await newsService.getAll(req.query);
    responseUtil.success(res, result);
  } catch (error) {
    logger().info(`get all news failed, error = ${error}`);
    next(error)
  }
}

newsController.getById = async (req, res, next) => {
  try {
    logger().info(`update news, news_id = ${req.params.news_id}`);

  if(!req.params.news_id) throw new ValidationError("news_id is required");

    const result = await newsService.getById(req.params.news_id);
    responseUtil.success(res, result);
  } catch (error) {
    logger().info(`get all news failed, error = ${error}`);
    next(error)
  }
}

export default newsController;
