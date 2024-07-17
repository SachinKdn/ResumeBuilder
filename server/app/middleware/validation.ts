import { type Response, type Request, type NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import {
    userLogin,
    createUser
  } from "../helper/validations/user";

export const validate = (validationName: string): any[] => {
    switch (validationName) {
      case "users:login": {
        return userLogin;
      }
      
      case "users:create": {
        return createUser;
      }
      default:
        return [];
    }
  };
  
  export const catchError = expressAsyncHandler(
    (req: Request, res: Response, next: NextFunction) => {
      console.log("catchError")
      const errors = validationResult(req);
      const isError = errors.isEmpty();
      console.log(isError)
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!isError) {
          console.log("Error is there.")
        const data = { errors: errors.array() };
        throw createHttpError(400, {
          message: "Validation error!",
          data,
        });
      } else {
        next();
      }
    }
  );