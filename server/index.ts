import express , { type Express, type Request, type Response } from 'express';
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
const PORT = process.env.PORT || 4000;

const initApp = async (): Promise<void> => {
    //connecting with DB
    await initDB();

    // passport init
    initPassport();
    // set base path to /api
    app.use("/api", router);

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