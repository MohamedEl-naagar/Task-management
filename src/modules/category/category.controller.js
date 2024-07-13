import categoryModel from "../../../db/models/category.model.js"
import { catchError } from '../../middleware/catchError.js'
import { AppError } from "../../utils/AppError.js"
import { ApiFeatures } from "../../utils/apiFeatures.js";

const addCategory = catchError(async(req,res,next)=>{    
    // check title exist
    const existingcategory = await categoryModel.findOne({ name: req.body.name });
    if (existingcategory) {
        return next(new AppError("Category with the same title already exists", 400));
    }

    let category = new categoryModel(req.body)
    category.createdBy = req.user._id;
    await category.save()
    category&&res.json({message:"category added successfully",category})
    !category&&next(new AppError("Category not added", 401));

}); 

const getAllCategories = catchError(async(req,res,next)=>{
    const createdBy = req.query.createdBy;
    let apiFeatures = new ApiFeatures(categoryModel.find(), req.query)
        .pagination()  // Apply pagination
        .fields()  // Select fields
        .filter()  // Apply filtering
        .sort(); // Apply sorting
    let allCategories = await apiFeatures.mongooseQuery.populate({
        path: 'createdBy',
        select: '-__v -createdAt -updatedAt -isBlocked -password' // Exclude __v, createdAt, and updatedAt password from createdBy
    }).select('-__v -createdAt -updatedAt')
    let totalCount = await categoryModel.countDocuments(apiFeatures.query);
    if(createdBy){
        totalCount = await categoryModel.find({createdBy}).countDocuments()
   }
    res.json({ message: "success", page: apiFeatures.pageNumber,totalCount, allCategories });
});

const getSingleCategory = catchError(async(req,res,next)=>{
    let category = await categoryModel.findById(req.params.id)
    category&&res.json({message:"success",category})
    !category&&next(new AppError("Category not found", 404));
})

const updateCategory = catchError(async (req, res, next) => {
    console.log(req.body);
    console.log(req.user._id);

    let checkExist = await categoryModel.findById(req.params.id)
    if(!checkExist){next(new AppError("Category not found", 404));}
    
    if(!checkExist.createdBy.equals(req.user._id))
        {
        return next(new AppError("You are not authorized to update this category", 401));
    }

    if(req.body.name){
        const existingSubcategory = await categoryModel.findOne({ name: req.body.name });
        if (existingSubcategory) {
            return next(new AppError("category with the same name already exists", 400));
        }      
    }
    let category = await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
       await category.save();
        res.json({ message: "Category updated", category });
   
});

const deleteCategory = catchError(async (req, res, next) => {
    let checkExist = await categoryModel.findById(req.params.id)
    if(!checkExist){next(new AppError("Category not found", 404));}
    if(!checkExist.createdBy.equals(req.user._id)){
        return next(new AppError("You are not authorized to delete this category", 401));
    }
    
   let category = await categoryModel.findByIdAndDelete(req.params.id);
    category&&res.json({ message: "Category deleted", category });
    !category&&next(new AppError("Category not deleted", 404));
});

export{
addCategory,
getAllCategories,
getSingleCategory,
updateCategory,
deleteCategory,
}