import Joi from "joi";

const newsletterValidator = {};

const email = Joi.string()
  .required()
  .pattern(new RegExp("^[\\w-\\.]+@([\\w-]+.)+[\\w-]{2,4}$"))
  .messages({
    "string.empty": "email cannot be an empty",
    "string.pattern.base": "email is invalid",
    "any.required": "email is required",
  });

newsletterValidator.add = Joi.object().keys({
  email,
});

export default newsletterValidator;
