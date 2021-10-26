import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import * as EmailValidator from "email-validator";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/user.repository";

dotenv.config()
export class AuthenticationController {

    static async showPosts(req: Request, res: Response) {
        let jwt_secret_key = process.env.JWT_SECRET_KEY as string;
        let token = req.headers.authorization as string;
        jwt.verify(token, jwt_secret_key, async (error: any, data: any) => {
        if(error) {
            return res.send({
                data: error,
                received: false,
            });
        }

        return res.send ({
            posts: "List of posts",
            userdata: data,
        });
    });

    }



    static validateEmail(useremail: string): boolean {
        let isEmailValidated = EmailValidator.validate(useremail);
        return isEmailValidated;
    }
 
    static async createNewAccount(req: Request, res: Response) {
        let { useremail, userpassword } = req.body;
        let jwt_secret_key = process.env.JWT_SECRET_KEY as string



        if(!AuthenticationController.validateEmail) {
            return res.send ({
                authenticated: false,
                message: "Email valid email",
    
            });
        }


    let salt = await bcrypt.genSalt(10);
    bcrypt.hash(userpassword, salt, async (error: any, hashedPassword: any) => {
        if (error) {
            return res.send({
                message: error,
                authentication: false,
            });
       }


       //! Saving user data
       let userRepository = getCustomRepository(UserRepository);
       await userRepository.saveUserData(req, res,hashedPassword);


       //! Sending a JWT

       jwt.sign(
        {
          useremail, //! Payload
        },
        jwt_secret_key, //! Secret key
        {
          expiresIn: "1h", //! Expiry time   
        },
        async (error: any, data: any) => {
            if(error) {
                return res.send({
                    data: error,
                    authentication: false,
                });
            }
        return res.send({
            data: data,
            authentication: true
        });

        }
    );

    });

    

    }
}