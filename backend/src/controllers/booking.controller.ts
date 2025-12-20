import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app.error";
import Service from "../models/service.model";
import Booking from "../models/booking.model";

export async function createBooking(req: Request, res: Response, next: NextFunction) {
  try {
    // extract the required data from request body and the userId
    const userId = (req as any).userId;
    const { serviceId, message } = req.body;

    // booking must be linked to an existing service
    if (!serviceId) throw new AppError("Service ID is required", 400);

    // verify if the service exists
    const service = await Service.findById(serviceId);
    if (!service) throw new AppError("Service not found", 404);

    // checks if user already has an active booking for this service
    const existingBooking = await Booking.findOne({
      user: userId,
      service: serviceId,
      status: {
        $in: ["pending", "accepted"]
      },
    });

    // block duplicate active requests
    if (existingBooking) throw new AppError("You already requested this service", 400);

    // create new booking
    // user - requester
    // service - selected service
    // provider - owner of the service
    const booking = new Booking({
      user: userId,
      service: service._id,
      provider: service.provider,
      message,
    });

    // then save, note that i didnt use create since it causes ts errors
    await booking.save();

    // return new created booking
    return res.status(201).json(booking);
  } catch (error) {
    return next(error);
  };
};

export async function getProviderBookings(req: Request, res: Response, next: NextFunction) {
  try {
    // get the provider id and status
    const providerId = (req as any).userId;
    const { status } = req.query;

    // base query: provider owns the booking
    const query: any = { provider: providerId };

    // optional filter
    if (status) {
      query.status = status;
    };

    const bookings = await Booking.find(query)
      .populate("user", "name email")
      .populate("service", "title price");

    return res.status(200).json(bookings);
  } catch (error) {
    return next(error);
  }
};

export async function updateBookingStatus(req: Request, res: Response, next: NextFunction) {
  try {
    // extract the booking id and the new status
    const { status } = req.body;
    const bookingId = req.params["id"];

    // validate allowed status values
    if (!["accepted", "rejected"].includes(status)) {
      throw new AppError("Invalid status", 400);
    };

    // find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) throw new AppError("Booking not found", 404);
    
    // only pending book can be updated
    if (booking?.status !== "pending") throw new AppError("Cant update this status", 400);

    // authorization check, only the assigned provider can modify this booking
    if (String(booking.provider) !== (req as any).userId) {
      throw new AppError("Forbidden", 403);
    };

    // update the booking status and then save
    booking.status = status;
    await booking.save();

    // return the updated booking
    return res.status(200).json(booking);
  } catch (error) {
    return next(error);
  };
};

export async function cancelBooking(req: Request, res: Response, next: NextFunction) {
  try {
    // get the booking id and the user id
    const bookingId = req.params["id"];
    const userId = (req as any).userId;

    // find booking
    const booking = await Booking.findById(bookingId);
    if (!booking) throw new AppError("Booking not found", 404);

    // only the user who created the booking can cancel it
    if (String(booking.user) !== userId) throw new AppError("Forbidden", 403);

    // only pending bookings can be cancel
    if (booking.status !== "pending") throw new AppError("Booking cannot be cancel", 400);

    // solf delete by updating the status
    booking.status = "cancelled";
    await booking.save();

    return res.status(200).json({
      message: "Booking cancelled",
      booking,
    });
  } catch (error) {
    return next(error);
  };
};

export async function getProviderStats(req: Request, res: Response, next: NextFunction) {
  try {
    // get the provider id
    const providerId = (req as any).userId;

    // get all bookings for provider
    const bookings = await Booking.find({ provider: providerId });

    // calculate stats
    const stats = {
      total: bookings.length,
      pending: bookings.filter(b => b.status === "pending").length,
      accepted: bookings.filter(b => b.status === "accepted").length,
      rejected: bookings.filter(b => b.status === "rejected").length,
      cancelled: bookings.filter(b => b.status === "cancelled").length,
    };

    return res.status(200).json(stats);
  } catch (error) {
    return next(error);
  };
};