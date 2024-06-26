import Joi from "joi";

const pageValidator = {};

pageValidator.add = Joi.object().keys({
  parent_page_id: Joi.string().optional().allow(null).messages({
    "any.required": "parent_page_id is required",
  }),
  page: Joi.string().required().messages({
    "any.required": "page is required",
  }),
  title: Joi.string().required().messages({
    "string.empty": "title cannot be an empty",
    "any.required": "title is required",
  }),
  subtitle: Joi.string().optional().allow(null).messages({
    "string.empty": "subtitle cannot be an empty",
    "any.required": "subtitle is required",
  }),
  description: Joi.string().optional().allow(null).messages({
    "string.empty": "description cannot be an empty",
    "any.required": "description is required",
  }),
  sequence: Joi.number().required().messages({
    "any.required": "sequence is required",
  }),
});

export default pageValidator;
