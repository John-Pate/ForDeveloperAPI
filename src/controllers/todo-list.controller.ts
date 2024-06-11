import { NextFunction, Request, Response } from "express";
import ToDoList from "../models/todo-list.model";

const ToDoListController = () => {
  const getToDoLists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const todoList = await ToDoList.find();
      res.status(200).json(todoList);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  const saveToDoList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { date, time, state, title, description } = req.body;
      let newToDo = new ToDoList({
        date,
        time,
        state,
        title,
        description,
      });
      let savedUser = await newToDo.save();
      res.status(200).json({
        success: true,
        message:
          "Data saved successfully.",
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
  return {
    getToDoLists,
    saveToDoList,
  };
};

export default ToDoListController;
