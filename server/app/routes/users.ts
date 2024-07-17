
import createHttpError from "http-errors";
import expressAsyncHandler from "express-async-handler";
import { createResponse } from "../helper/response";
import { createUserTokens, decodeToken } from "../services/passport-jwt";
import * as userService from "../services/user";

import express , { type Express, type Request, type Response }from 'express';
import User, { type IUser } from "../schema/User";

import passport from "passport";
import { catchError, validate } from "../middleware/validation";
import { omit } from 'lodash';


const router = express.Router();
router.post(
    "/login",
    validate("user:login"),
    catchError,
    passport.authenticate("login", { session: false }),
    expressAsyncHandler(async (req, res, next) => {
      console.log("Login Request Occured in users.ts.")
      console.log(req.user);
      res.send(
        createResponse({ ...createUserTokens(req.user!), user: req.user })
      );
    })
  );
  router.get("/me",
    passport.authenticate("jwt", { session: false }),
    expressAsyncHandler(async (req, res) => {
    console.log(req);
    const user = await User.findById(req.user?._id).select("-password");
    res.send(createResponse(user, "User details feteched successfully!"));
  }))
  router.post(
    "/register",
    validate("users:create"),
  catchError,
    expressAsyncHandler(async (req, res) => {
      const {name, email, password } = req.body as IUser;
      const user = await userService.createUser({ name, email, password });
      console.log("---------------------------------")
      console.log(user)
    const { password: _p, ...result } = user;
    const userWithoutPassword = omit(user.toObject(), ['password']);
    console.log("---------------------------------")
    console.log(userWithoutPassword)
    console.log("---------------------------------")
    const tokens = createUserTokens(user.toObject());
    res.send(
      createResponse({
        ...tokens,
        user: userWithoutPassword,
      })
    );
    })
  );























  export default router;
