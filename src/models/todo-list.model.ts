import mongoose, { Schema, model, Document } from "mongoose";

interface IToDoList extends Document {
  date: string;
  time: string;
  state: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ToDoListSchema = new Schema<IToDoList>(
  {
    date: {
      type: String,
      trim: true,
    },
    time: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ToDoList = model<IToDoList>("ToDoList", ToDoListSchema, "todo_list");

export default ToDoList;
export { IToDoList };
