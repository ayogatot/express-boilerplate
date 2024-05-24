import { logger } from "express-glass";
import { ValidationError } from "../utils/ApiError";
import responseUtil from "../utils/Response";
import { objectToLogStr } from "../utils/ObjectToLog";
import contactValidator from "../validators/contact.validator";
import contactService from "../services/contact.service";

const contactController = {};

contactController.add = async (req, res, next) => {
  try {
    logger().info(`contact add request, data = ${objectToLogStr(req.body)}`)
    const validationResult = contactValidator.add.validate(req.body)
    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message)
    }

    const contact = await contactService.add(validationResult.value);
    responseUtil.success(res, contact);
  } catch (e) {
    logger().error(`contact registration failed, error = ${e}`);
    next(e)
  }
};

contactController.getAll = async (req, res, next) => {
  try {
    logger().info(`get all contact request, data = ${objectToLogStr(req.query)}`)
    const result = await contactService.getAll(req.query);
    responseUtil.success(res, result);
  } catch (e) {
    logger().error(`contact login failed, error = ${e}`);
    next(e)
  }
};

contactController.deleteById = async (req, res, next) => {
  try {
    logger().info(`delete contact request, data = ${objectToLogStr(req.params)}`)
    if(!req.params.contact_id) {
      throw new ValidationError("contact_id is required")
    }
    const result = await contactService.deleteById(req.params.contact_id);
    responseUtil.success(res, result);
  } catch (e) {
    logger().error(`contact delete failed, error = ${e}`);
    next(e)
  }
}

export default contactController;
