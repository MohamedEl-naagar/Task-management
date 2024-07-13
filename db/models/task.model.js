import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      type: {
        type: String,
        enum: ['text', 'list'],
        required: true
      },
      body: {
        type: String,
        required: function() { return this.type === 'text'; }
      },
      listItems: [{
        type: String,
        required: function() { return this.type === 'list'; }
      }],
      shared: {
        type: Boolean,
        default: false
      },
      category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
      },
      createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
      }
  
},{
    timestamps:true
})


const taskModel = mongoose.model("Task",taskSchema)
export default taskModel