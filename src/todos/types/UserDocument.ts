import mongoose from "mongoose";

export interface TodoDocument extends mongoose.Document {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
