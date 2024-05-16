import Joi from "joi";

const applicantValidator = {};

const name = Joi.string().min(3).max(64).required().messages({
  "string.empty": "name cannot be an empty",
  "string.min": "name should have a minimum length of {#limit}",
  "string.max": "name should have a maximum length of {#limit}",
  "any.required": "name is required",
});

const email = Joi.string()
  .required()
  .pattern(new RegExp("^[\\w-\\.]+@([\\w-]+.)+[\\w-]{2,4}$"))
  .messages({
    "string.empty": "email cannot be an empty",
    "string.pattern.base": "email is invalid",
    "any.required": "email is required",
  });

applicantValidator.add = Joi.object().keys({
  career_id: Joi.string().optional().allow(null).messages({
    "string.empty": "career_id cannot be an empty",
    "any.required": "career_id is required",
  }),
  email,
  first_name: name,
  last_name: name,
  phone_number: Joi.string().required().messages({
    "string.empty": "phone_number cannot be an empty",
    "any.required": "phone_number is required",
  }),
  message: Joi.string().required().messages({
    "string.empty": "message cannot be an empty",
    "any.required": "message is required",
  }),
});

export default applicantValidator;
