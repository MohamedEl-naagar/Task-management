import Joi from 'joi'


const addCategoryValidation = Joi.object({
        name: Joi.string().min(2).max(300).required().trim(),
}).required()


const paramsIdValidation = Joi.object({
    id: Joi.string().hex().length(24).required()
})


const updateCategoryValidation = Joi.object({
    name: Joi.string().min(2).max(300).trim().optional(),
    id: Joi.string().hex().length(24).required()
})

export{
    addCategoryValidation,
    paramsIdValidation,
    updateCategoryValidation
}