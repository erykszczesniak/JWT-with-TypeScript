import { Router } from "express";
import { AuthenticationController } from "../controllers/authentication.controller";

const authrouter = Router()

authrouter.get("/posts", AuthenticationController.showPosts);
authrouter.post("/signup", AuthenticationController.signup);

export {authrouter};