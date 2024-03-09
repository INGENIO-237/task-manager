import { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import Session from "./sessions.model";
import { saltFactor } from "../config/config";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Hooks
userSchema.pre<UserDocument>("save", async function (next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(parseInt(saltFactor as string));
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.post<UserDocument>("deleteOne", async function (next) {
  const deletedUser = this;

  await Session.deleteMany({ user: deletedUser._id });
});

// Methods
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  let user = this as UserDocument;

  return await bcrypt
    .compare(candidatePassword, user.password)
    .catch((e) => false);
};

const User = model<UserDocument>("User", userSchema);

export default User;
