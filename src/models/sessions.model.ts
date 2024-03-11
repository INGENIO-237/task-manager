import { Document, Schema, model } from "mongoose";
import { UserDocument } from "./users.model";

export interface SessionDocument extends Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    valid: {
      type: Boolean,
      default: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Session = model("Session", sessionSchema);

export default Session;
