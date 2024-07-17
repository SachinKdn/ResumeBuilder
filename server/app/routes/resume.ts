
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
import Resume, { IResume } from "../schema/Resume";


const router = express.Router();

router.post(
    "/create",
    // validate("users:create"),
//   catchError,
    expressAsyncHandler(async (req, res) => {
        const {title,useremail,username} = req.body;
        const resume = await Resume.create({title,useremail,username});

        console.log("Resume Created....")
        res.send({resume, msg:"Resume Initialized successfully."})
    })
  );


  router.put(
    "/update/:id",
    expressAsyncHandler(async(req,res) => {
        const updates : Partial<IResume> = req.body;
    // const newResume = await Resume.findByIdAndUpdate(req.params.id, updates, { new: true });
    // res.send({newResume, msg: "Resume Updated Successfully"})
        const prevRes = await Resume.findById(req.params.id);
        console.log(prevRes)
        // if (!prevRes) {
        //     console.error('Resume not found with the provided ID:', req.params.id);
        //     return res.status(404).send('Resume not found');
        //   }
          const newPrevRes = {...prevRes?.toObject()};
    const newRes = new Resume({...newPrevRes, ...updates});
    console.log(newRes);
    try {
        await newRes.validate(); // Explicitly validate the document
        // await newRes.save();
        // console.log('Resume saved successfully');
        const newResume = await Resume.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.send({newResume, msg: "Resume Updated Successfully"})
      } catch (error) {
        console.error('Validation error:', error);
      }
    })
  )
  export default router;