/*------------------------------ Starter Code ------------------------------*/

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Todo from "./models/todo.js";
import User from "./models/user.js";

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  //   createTodo();
  await runQueries();

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
  process.exit();
};

connect();

/*----------------------------- Query Functions -----------------------------*/

const createTodo = async () => {
  const todoData = {
    text: "learn React",
    isComplete: false,
  };
  const todo = await Todo.create(todoData);
  console.log("New todo:", todo);
};

// ebedding

//  create
const createSubtask = async () => {
  const todoId = "673cd614051a2702c5d3b0fb";
  const todo = await Todo.findOne({ _id: todoId });

  const subTaskData = {
    text: "read the kend",
    isComplete: true,
  };

  todo.subtasks.push(subTaskData);
  await todo.save();
  console.log(todo);
};

//  find
const findSubtask = async () => {
  const todoId = "673cd614051a2702c5d3b0fb";
  const subtaskId = "673cd8d8ffb7241793fc4f0e";

  const todo = await Todo.findById(todoId);
  const subtask = todo.subtasks.id(subtaskId);

  console.log("Subdocument:", subtask);
};

//   delete
const removeSubtask = async () => {
  const todoId = "673cd614051a2702c5d3b0fb";
  const subtaskId = "673cd6f41e3c50095849b62b";

  const todo = await Todo.findById(todoId);
  todo.subtasks.pull(subtaskId);
  await todo.save();

  console.log("Updated document:", todo);
};

//  update
const updateSubtask = async () => {
  const todoId = "673cd614051a2702c5d3b0fb";
  const subtaskId = "673cd6f9e54b969197dae69d";

  const todo = await Todo.findById(todoId);
  const subtask = todo.subtasks.id(subtaskId);

  subtask.isComplete = true;
  await todo.save();

  console.log("Updated document:", todo);
};

//   Finding a parent from a child
const findParentAndRemoveSubtask = async () => {
  const foundTodo = await Todo.findOne({
    "subtasks.text": "read the gaga",
  });

  const foundSubtask = foundTodo.subtasks.find((subtask) => {
    return subtask.text === "read the gaga";
  });

  foundSubtask.deleteOne();
  await foundTodo.save();
  console.log("Updated todo:", foundTodo);
};



//   reference
//  create
const createUser = async () => {
  const userData = {
    name: "austin",
    email: "austin@mail.com",
  };
  const user = await User.create(userData);
  console.log("New user:", user);
};

const assignTodo = async () => {
  const todoId = "673f7878ac7b3381dd783a4a";
  const userId = "673f7631383d9dacaf5292e6";

  const updatedTodo = await Todo.findByIdAndUpdate(
    todoId,
    { assignee: userId },
    { new: true }
  );

  console.log("Updated document:", updatedTodo);
};


// populate() method to join our todo and user documents.
// assignee 字段只会返回 User 的 ObjectId，我们可以使用 populate 来填充这个 assignee 字段，使其返回完整的 User 信息。
const findTodos = async () => {
  const todos = await Todo.find({}).populate("assignee");
  console.log("All todos:", todos);
};


/*------------------------------- Run Queries -------------------------------*/

const runQueries = async () => {
  console.log("Queries running.");
  await findTodos();
};
