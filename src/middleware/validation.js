import { AppError } from "../utils/AppError.js"


export const validation = (schema) => {
 
    return (req, res, next) => {
        let filters = {};
        
            filters ={...req.params,...req.body,...req.query}
        
        const { error } = schema.validate(filters, { abortEarly: false })
        if (!error) {
            next()
        } else {
            let errMsg = []
            error.details.forEach((val)=>{
                errMsg.push(val.message)
            })
            next(new AppError(errMsg,401))
        }
    }
}
