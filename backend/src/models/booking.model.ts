import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  user: Schema.Types.ObjectId;
  service: Schema.Types.ObjectId;
  provider: Schema.Types.ObjectId;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  message?: string;
  createdAt: Date;
};

const BookingSchema: Schema<IBooking> = new Schema<IBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "cancelled"],
      default: "pending",
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model<IBooking>("Booking", BookingSchema);
export default Booking;