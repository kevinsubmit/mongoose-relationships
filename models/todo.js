import mongoose from "mongoose";

//  embedding需要定义这个subtaskSchema模型，引用reference不需要
const subtaskSchema = new mongoose.Schema({
  text: String,
  isComplete: Boolean
})



const todoSchema = new mongoose.Schema({
  text: String,
  isComplete: Boolean,

//   embedding
//   subtasks: [subtaskSchema]

// references
  assignee: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // Reference to the User model
  }
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
