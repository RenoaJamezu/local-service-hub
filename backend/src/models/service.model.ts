import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  status: "active" | "inactive" | "deleted";
  provider: Schema.Types.ObjectId;
  createdAt: Date;
};

const ServiceSchema: Schema<IService> = new Schema<IService>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

ServiceSchema.pre(/^find/, async function () {
  // @ts-ignore
  if (!this.getOptions().excludeDeleted) {
    // @ts-ignore
    this.where({ status: { $ne: "deleted" } });
  }
});

const Service = mongoose.model<IService>("Service", ServiceSchema);
export default Service;