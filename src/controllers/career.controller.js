import { logger } from "express-glass";
import { ValidationError } from "../utils/ApiError";
import responseUtil from "../utils/Response";
import { objectToLogStr } from "../utils/ObjectToLog";
import careerValidator from "../validators/career.validator";
import careerService from "../services/career.service";

const careerController = {};

careerController.getAll = async (req, res, next) => {
  try {
    logger().info(`get all career request, data = ${objectToLogStr(req.query)}`)
    const result = await careerService.getAll(req.query);
    responseUtil.success(res, result);
  } catch (e) {
    logger().error(`career login failed, error = ${e}`);
    next(e)
  }
};

careerController.add = async (req, res, next) => {
  try {
    logger().info(`career add request, data = ${objectToLogStr(req.body)}`)
    const validationResult = careerValidator.add.validate(req.body)
    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message)
    }

    const career = await careerService.add(validationResult.value);
    responseUtil.success(res, career);
  } catch (e) {
    logger().error(`career registration failed, error = ${e}`);
    next(e)
  }
};

careerController.update = async (req, res, next) => {
  try {
    logger().info(`career update request, data = ${objectToLogStr(req.body)}`)
    const validationResult = careerValidator.update.validate(req.body)
    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message)
    }

    const career = await careerService.update(req.params.career_id, validationResult.value);
    responseUtil.success(res, career);
  } catch (e) {
    logger().error(`career registration failed, error = ${e}`);
    next(e)
  }
};

careerController.deleteById = async (req, res, next) => {
  try {
    logger().info(`delete career request, data = ${objectToLogStr(req.params)}`)
    if(!req.params.career_id) {
      throw new ValidationError("career_id is required")
    }
    const result = await careerService.deleteById(req.params.career_id);
    responseUtil.success(res, result);
  } catch (e) {
    logger().error(`career delete failed, error = ${e}`);
    next(e)
  }
}

export default careerController;
