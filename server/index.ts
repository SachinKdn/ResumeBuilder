import express , { type Express, type Request, type Response } from 'express';

const nodemailer = require('nodemailer');
import cors from "cors";
import http from "http";
import morgan from "morgan";
import bodyParser from "body-parser";
import { IUser } from './app/schema/User';
import { loadConfig } from './app/config/config';
loadConfig();
const app = express();
const router = express.Router();
import usersRoutes from "./app/routes/users";
import resumeRoutes from "./app/routes/resume";
import { initPassport } from "./app/services/passport-jwt";
import { initDB } from './app/services/initDB';
import errorHandler from './app/middleware/errorHandler';


declare global {
    namespace Express {
      interface User extends Omit<IUser, "password"> {} 
      interface Request {
        user?: User;
      }
    }
  }
app.use(cors());
// Increase the request size limit
app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
const PORT = process.env.PORT || 4000;

const initApp = async (): Promise<void> => {
    //connecting with DB.
    await initDB();

    // passport init
    initPassport();
    // set base path to /api
    app.use("/api", router);
    app.post('/api/send-pdf', async (req, res) => {
      const { pdf, email } = req.body;
      console.log("Your Target Mail Is - " + email)
    
      const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
        },
      });
    
      const mailOptions = {
        // from: 'your-email@gmail.com',
        to: email,
        subject: 'Your Resume',
        text: 'Please find your resume attached.',
        attachments: [
          {
            filename: 'resume.pdf',
            content: pdf.split('base64,')[1],
            encoding: 'base64',
          },
        ],
      };
    
      try {
        await transporter.sendMail(mailOptions);
        console.log("PDF sent to the user via email")
        res.status(200).send('PDF sent to the user via email');
      } catch (error) {

        console.log("Dikttt Hogyiii............")
        console.error('Error sending email', error);
        res.status(500).send('Error sending email');
      }
    });
    // routes
    router.use("/users", usersRoutes);  
    router.use("/resume", resumeRoutes); 



    app.get("/", (req: Request, res : Response) => {
        res.send({msg : "Welcome Sachin JI"})
    })

    app.use(errorHandler);
    http.createServer(app).listen(PORT,() => console.log(`Server running on port http://localhost:${PORT}`))
}
void initApp();