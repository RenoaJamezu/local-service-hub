import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app.error";
import Service from "../models/service.model";

export async function createService(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description, price, category } = req.body;

    if (!title || !description || !price || !category || isNaN(Number(price))) {
      throw new AppError("All fields are required and price must be a number!", 400);
    }

    const providerId = (req as any).userId;

    const service = await Service.create({
      title,
      description,
      price: Number(price),
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
    const userRole = (req as any).role;
    const userId = (req as any).userId;

    if (!userRole || !userId) throw new AppError("Role and Id not found", 404);

    // filter based on role
    let filter: any = {};

    if (userRole === "user") {
      filter.status = { $in: ["active"] };
    } else if (userRole === "provider") {
      filter.status = { $in: ["active", "inactive"] };
      filter.provider = userId;
    };

    const services = await Service.find(filter)
      .populate("provider", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(services);
  } catch (error) {
    return next(error);
  };
};

export async function updateServiceStatus(req: Request, res: Response, next: NextFunction) {
  try {
    // get the status and service id
    const { status } = req.body;
    const serviceId = req.params["id"];

    // validate allowed status
    if (!["active", "inactive"].includes(status)) {
      throw new AppError("Invalid status", 400);
    };

    // find the service
    const service = await Service.findById(serviceId);
    if (!service) throw new AppError("Service not found", 404);

    // authorization check, only the provider can update its service status
    if (String(service.provider) !== (req as any).userId) {
      throw new AppError("Forbidden", 403);
    };

    // update the status
    service.status = status;
    await service.save();

    return res.status(200).json(service);
  } catch (error) {
    return next(error);
  };
};

export async function updateServiceDetails(req: Request, res: Response, next: NextFunction) {
  try {
    // get the update data and the service id
    const serviceId = req.params["id"];
    const { title, description, price, category } = req.body;

    // find the service
    const service = await Service.findById(serviceId);
    if (!service) throw new AppError("Service not found", 404);

    // authorization check
    if (String(service.provider) !== (req as any).userId) {
      throw new AppError("Forbidden", 403);
    };

    // update the service details
    if (typeof title === "string") service.title = title;
    if (typeof description === "string") service.description = description;
    if (typeof price === "number") service.price = price;
    if (typeof category === "string") service.category = category;
    await service.save();

    return res.status(200).json(service);
  } catch (error) {
    return next(error);
  };
};

export async function deleteService(req: Request, res: Response, next: NextFunction) {
  try {
    // get the service id and the user id
    const serviceId = req.params["id"];
    const userId = (req as any).userId;

    // find service
    const service = await Service.findById(serviceId);
    if (!service) throw new AppError("Service not found", 404);

    // only the provider who created the service can delete it
    if (String(service.provider) !== userId) throw new AppError("Forbidden", 403);

    // soft delete by updating the status
    service.status = "deleted";
    await service.save();

    return res.status(200).json({
      message: "Service deleted",
      service,
    });
  } catch (error) {
    return next(error);
  };
};