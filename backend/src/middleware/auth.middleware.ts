import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/app.error";

interface JwtPayload {
  userId: string;
};

export function protect(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Not authorized", 401);
  };

  const token = authHeader.split(" ")[1];
  if (!token) throw new AppError("No token provided", 401);

  const secret = process.env["JWT_SECRET_KEY"];
  if (!secret) throw new AppError("JWT secret not configured", 500);

  try {
    const decoded = jwt.verify(
      token,
      secret,
    ) as JwtPayload;

    (req as any).userId = decoded.userId;

    return next();
  } catch (error) {
    return next(error);
  };
};