import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/app.error";

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { role, name, email, password } = req.body as {
      role: string,
      name: string,
      email: string,
      password: string,
    };

    if (!name || !email || !password) throw new AppError("All fields are required!", 400);

    const existing = await User.findOne({ email });
    if (existing) throw new AppError("Email already exists", 409);

    await User.create({
      role,
      name,
      email,
      password,
    });

    return res.status(201).json({ message: "User registered." });
  } catch (error) {
    return next(error);
  };
};

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body as {
      email: string,
      password: string,
    };

    if (!email || !password) throw new AppError("All fields are required!", 400);

    const user = await User.findOne({ email });
    if (!user) throw new AppError("User not found!", 401);

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new AppError("Invalid credentials", 401);

    const secret = process.env["JWT_SECRET_KEY"];
    if (!secret) throw new AppError("JWT secret not configured", 500);

    const token = jwt.sign(
      { userId: String(user._id) },
      secret,
      { expiresIn: "24h" },
    );

    return res.status(200).json({
      token: token,
      message: "Logged in successfully",
      role: user.role,
    });
  } catch (error) {
    return next(error);
  };
};

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).userId;
    const user = await User.findById(userId).select("-password");

    if (!user) throw new AppError("User not found", 404);

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  };
};