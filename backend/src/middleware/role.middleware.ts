import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app.error";
import User from "../models/user.model";

export function authorize(...allowedRoles: Array<"user" | "provider">) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).userId;
      if (!userId) throw new AppError("Not Authenticated", 401);

      const user = await User.findById(userId);
      if (!user) throw new AppError("User not found", 401);

      if (!allowedRoles.includes(user.role)) throw new AppError("Forbidden", 403);

      return next();
    } catch (error) {
      return next(error);
    };
  };
};