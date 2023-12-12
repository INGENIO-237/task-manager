import { Document, Schema, model } from "mongoose";
import config from "config";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
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

userSchema.pre<UserDocument>("save", async function (next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = config.get<string>("saltFactor");

  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  let user = this as UserDocument;

  return await bcrypt
    .compare(candidatePassword, user.password)
    .catch((e) => false);
};

const User = model("User", userSchema);

export default User;
