import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app.error";
import Service from "../models/service.model";

export async function createService(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description, price, category } = req.body as {
      title: string,
      description: string,
      price: number,
      category: string,
    };

    if (!title || !description || !price || !category) {
      throw new AppError("All fields are required!", 400);
    };

    const providerId = (req as any).userId;

    const service = await Service.create({
      title,
      description,
      price,
      category,
      provider: providerId,
    });

    return res.status(201).json(service);
  } catch (error) {
    return next(error);
  };
};

export async function getServices(req: Request, res: Response, next: NextFunction) {
  try {
    const services = await Service.find().populate(
      "provider",
      "name email",
    );

    return res.status(200).json(services);
  } catch (error) {
    return next(error);
  }
}