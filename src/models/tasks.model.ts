import { Document, Schema, model } from "mongoose";
import { UserDocument } from "./users.model";

export interface TaskDocument extends Document {
  user: UserDocument["_id"];
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Task = model<TaskDocument>("Task", taskSchema);
