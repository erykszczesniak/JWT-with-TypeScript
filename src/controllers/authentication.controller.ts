import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import * as EmailValidator from "email-validator";
import dotenv from "dotenv"

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

 
    static async signup(req: Request, res: Response) {
        let { username, useremail, userpassword } = req.body;
        let jwt_secret_key = process.env.JWT_SECRET_KEY as string
        let isEmailValidated = EmailValidator.validate(useremail);

         if(!isEmailValidated) {
            return res.send({
              data: "Provide valid email",
              authentication: false

            });

         }


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

    }
}