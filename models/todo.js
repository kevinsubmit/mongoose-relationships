import mongoose from "mongoose";

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