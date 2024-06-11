import { NextFunction, Request, Response } from "express";
import Account from "../models/account.model";

const AccountController = () => {
  const getAllAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await Account.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
  return {
    getAllAccount,
    // Add more controller functions here
  };
};

export default AccountController;
