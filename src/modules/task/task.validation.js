import Joi from 'joi';

const addTaskValidation = Joi.object({
  title: Joi.string().min(2).max(300).required().trim(),
//   createdBy: Joi.string().hex().length(24).required(),
  type: Joi.string().valid('text', 'list').required(),
  body: Joi.when('type', { is: 'text', then: Joi.string().required(), otherwise: Joi.forbidden() }),
  listItems: Joi.when('type', { is: 'list', then: Joi.array().items(Joi.string()).required(), otherwise: Joi.forbidden() }),
  shared: Joi.boolean().default(false),
  category: Joi.string().hex().length(24).required()
}).required();

const paramsIdValidation = Joi.object({
  id: Joi.string().hex().length(24).required()
});

const updateTaskValidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
  title: Joi.string().min(2).max(300).trim().optional(),
  type: Joi.string().valid('text', 'list').optional(),
  body: Joi.string().when('type', { is: 'text', then: Joi.optional(), otherwise: Joi.forbidden() }),
  listItems: Joi.array().items(Joi.string()).when('type', { is: 'list', then: Joi.optional(), otherwise: Joi.forbidden() }),
  shared: Joi.boolean().optional(),
  category: Joi.string().hex().length(24).optional(),
});

export {
  addTaskValidation,
  paramsIdValidation,
  updateTaskValidation
};
