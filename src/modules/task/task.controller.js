import taskModel from "../../../db/models/task.model.js"
import { catchError } from '../../middleware/catchError.js'
import { AppError } from "../../utils/AppError.js"
import { ApiFeatures } from "../../utils/apiFeatures.js";

const addTask = catchError(async(req,res,next)=>{    
    // check title exist
    const existingtask = await taskModel.findOne({ title: req.body.title });
    if (existingtask) {
        return next(new AppError("Task with the same title already exists", 400));
    }
    let task = new taskModel(req.body)
    task.createdBy= req.user._id;
    await task.save()
    task&&res.json({message:"Task added successfully",category: task})
    !task&&next(new AppError("Task not added", 401));

}); 

const getAllTasks = catchError(async(req,res,next)=>{
    const createdBy = req.query.createdBy;
    let apiFeatures = new ApiFeatures(taskModel.find(), req.query)
        .pagination()  // Apply pagination
        .fields()  // Select fields
        .filter()  // Apply filtering
        .sort(); // Apply sorting
    let allTasks = await apiFeatures.mongooseQuery.populate({
        path: 'createdBy',
        select: '-__v -createdAt -updatedAt -isBlocked -password' // Exclude __v, createdAt, and updatedAt password from createdBy
    }).select('-__v -createdAt -updatedAt') .populate({
        path: 'category', // Populate the category field
        select: 'name' // Select the fields you want to include from the category document
    })
    .select('-__v -createdAt -updatedAt'); // Exclude __v, createdAt, and updatedAt from tasks

    let totalCount = await taskModel.countDocuments(apiFeatures.query);
    if(createdBy){
        totalCount = await taskModel.find({createdBy}).countDocuments()
   }
    res.json({ message: "success", page: apiFeatures.pageNumber,totalCount, allTasks  });
});

const getSingleTask = catchError(async(req,res,next)=>{
    let task = await taskModel.findById(req.params.id)
    task&&res.json({message:"success",task: task})
    !task&&next(new AppError("task not found", 404));
})

const updateTask = catchError(async (req, res, next) => {
        let task = await taskModel.findById(req.params.id);
        if (!task) {
            return next(new AppError("Task not found", 404));
        }
        if (!task.createdBy.equals(req.user._id)) {
            return next(new AppError("You are not authorized to update this task", 401));
        }
        // Update the task with the request body
        task = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!task) {
            return next(new AppError("Task could not be updated", 500));
        }

        res.json({ message: "Task updated", task });
    
});



const deleteTask = catchError(async (req, res, next) => {
    let checkExist = await taskModel.findById(req.params.id)
    if(!checkExist){next(new AppError("Task not found", 404));}
    if(!checkExist.createdBy.equals(req.user._id)){
        return next(new AppError("You are not authorized to delete this task", 401));
    }
    
   let task = await taskModel.findByIdAndDelete(req.params.id);
    task&&res.json({ message: "task deleted", category: task });
    !task&&next(new AppError("task not deleted", 404));
});

export{
addTask ,
getAllTasks ,
updateTask,
deleteTask
}