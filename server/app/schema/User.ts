import mongoose from "mongoose";
import { type BaseSchema } from "./index";
import { hashPassword } from "../services/user";
const Schema = mongoose.Schema;
export interface IUser extends BaseSchema {
    name: string;
    email: string;
    password: string;
  }

  const UserSchema = new Schema<IUser>(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String },
    },
    { timestamps: true }
  );


  // save hashed password
UserSchema.pre("save", async function (next) {
    if (this.password) {
      this.password = await hashPassword(this.password);
    }
    next();
  });
  
  export default mongoose.model<IUser>("user", UserSchema);