import { logger } from "express-glass";
import { ValidationError } from "../utils/ApiError";
import responseUtil from "../utils/Response";
import { objectToLogStr } from "../utils/ObjectToLog";
import newsletterValidator from "../validators/newsletter.validator";
import newsletterService from "../services/newsletter.service";

const newsletterController = {};

newsletterController.add = async (req, res, next) => {
  try {
    logger().info(`newsletter add request, data = ${objectToLogStr(req.body)}`)
    const validationResult = newsletterValidator.add.validate(req.body)
    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message)
    }

    const newsletter = await newsletterService.add(validationResult.value);
    responseUtil.success(res, newsletter);
  } catch (e) {
    logger().error(`newsletter registration failed, error = ${e}`);
    next(e)
  }
};

newsletterController.getAll = async (req, res, next) => {
  try {
    logger().info(`get all newsletter request, data = ${objectToLogStr(req.query)}`)
    const result = await newsletterService.getAll(req.query);
    responseUtil.success(res, result);
  } catch (e) {
    logger().error(`newsletter login failed, error = ${e}`);
    next(e)
  }
};

newsletterController.deleteById = async (req, res, next) => {
  try {
    logger().info(`delete newsletter request, data = ${objectToLogStr(req.params)}`)
    if(!req.params.newsletter_id) {
      throw new ValidationError("newsletter_id is required")
    }
    const result = await newsletterService.deleteById(req.params.newsletter_id);
    responseUtil.success(res, result);
  } catch (e) {
    logger().error(`newsletter delete failed, error = ${e}`);
    next(e)
  }
};

export default newsletterController;
