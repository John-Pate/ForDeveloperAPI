import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import Role, { IRole } from "../models/role.model";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config";

const AuthController = () => {
  const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { firstName, lastName, email, password, role } = req.body;
      const userExist = await User.exists({ email });
      if (userExist) {
        return res.status(409).json({
          errors: [
            {
              title: "emailAddress",
              detail: "Email address is already used",
              code: "409",
            },
          ],
        });
      }
      const roleExist = await Role.findOne({
        name: { $in: req.body.role },
      });
      if (!roleExist) {
        return res.status(404).json({
          errors: [
            {
              title: "role",
              detail: "User role not found",
              code: "404",
            },
          ],
        });
      }
      const salt = genSaltSync(10);
      const hashedPassword = hashSync(password, salt);
      let newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: roleExist._id,
      });
      let savedUser = await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          errors: [
            {
              title: "User",
              detail: "User not found",
              code: "404",
            },
          ],
        });
      }

      const isMatch = compareSync(password, user.password);

      if (!isMatch) {
        return res.status(404).json({
          errors: [
            {
              title: "Password",
              detail: "Invalid Password",
              code: "401",
            },
          ],
        });
      }
      const token = jwt.sign({ id: user._id }, config.jwtSecret.key, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 7200,
      });
      const roles = await user.role.name;
      return res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          roles: roles,
          token: token,
          expiresIn: 7200,
        },
      });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  return {
    signup,
    signin,
  };
};

export default AuthController;
