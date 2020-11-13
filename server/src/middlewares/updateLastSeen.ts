import express from "express";
import { UserModel } from "../models";

export default (req: any, _: express.Response, next: express.NextFunction) => {
  if (req.user) {
    UserModel.findOneAndUpdate(
      { _id: req.user.id },
      {
        last_seen: new Date(),
      },
      { new: true }
    );
  }
  next();
};
