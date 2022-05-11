import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import config from "../config/auth.config";
import Player from "../models/player.model";
import User from "../models/user.model";

const signup = (req: Request, res: Response) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err: Error, user: unknown) => {
    if (err) {
      return res.status(500).send({
        status: "failed",
        message: err.message || "Some error occurred while creating the user.",
      });
    }
    if (user) {
      return res.status(200).send({
        status: "success",
        message: "User created successfully",
        user,
      });
    }
  });
};

const signin = (req: Request, res: Response) => {
  User.findOne({ username: req.body.username }, (err: Error, user: any) => {
    if (err) {
      return res.status(500).send({
        status: "failed",
        message: err.message || "Some error occurred while finding the user.",
      });
    }
    if (!user) {
      return res.status(404).send({
        status: "failed",
        message: "Invalid username or password",
      });
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const expireTime = 86400;
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: expireTime,
      });
      res.cookie("x-access-token", token, {
        expires: new Date(Date.now() + expireTime),
        secure: false,
        httpOnly: true,
      });
      return res.status(200).send({
        status: "success",
        message: "Authentication successful!",
      });
    }
    return res.status(404).send({
      status: "failed",
      message: "Invalid username or password",
    });
  });
};

export default { signup, signin };
