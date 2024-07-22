const bcrypt = require("bcryptjs")

import User, { IUser } from "../schema/User";
import { createUserTokens } from "./passport-jwt";


export const createUser = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const user = await User.create({ ...data, isActive: true });
    return user;
  };
  export const getUserById = async (id: string) => {
    const user = await User.findById(id).lean();
    return user;
  };
  export const getUserByEmail = async (email: string) => {
    console.log("finding user by mail")
    const user = await User.findOne({ email: email }).lean();//This method returns a plain JavaScript object instead of a Mongoose document, which can be useful for querying and returning data in a more lightweight and efficient manner.
    console.log(user)
    return user;
  };
  export const hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, 12);
    return hash;
  };