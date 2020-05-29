import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import hash from '../utils/hash';
import models from '../models';
import Response from '../utils/response';
import DbErrorHandler from '../utils/dbErrorHandler';
import UserRepository from '../repositories/userRepository';
import Mailer from '../services/mail/Mailer';
import UserServices from '../services/user.service';
dotenv.config();

const { User } = models;
const { hashPassword } = hash;

export default class AuthenticationController {
      /**
   * @description This helps a new User to create credentials
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */

   static async register(req, res) {
       try {
           const {
               firstName,
               lastName,
               userName,
               password,
               email
           } = req.body;
           const user = await User.create ( {
               user_name: userName,
               firstName: firstName,
               lastName: lastName,
               password: await hashPassword(password),
               email,
           },
           {
            fields: [
                'user_name',
                'email',
                'password',
                'first_name',
                'last_name',
                'role'
              ]
           });

           const newUser = {
               id: user.id,
               email: user.email,
               role: user.role
           };
           const token = jwt.sign(newUser, process.env.KEY);
           const data = {
               user: {
                   email: user.email,
                   userName: user.user_name
               },
               token
           };
           const mail = new Mailer({
            to: data.user.email,
            header: 'Verify your email address',
            messageHeader: `Hi, <strong>${user.user_name}!</strong>`,
            messageBody: 'Thank you for creating an account, Just click the link below to verify your account.',
            optionLink: `${process.env.FRONTEND_URL}/confirmEmail?token=${token}`,
            Button: true
           });
           mail.InitButton({
            text: 'Verify my account',
            link: `${process.env.FRONTEND_URL}/confirmEmail?token=${token}`
           });
           await mail.sendMail();
    const response = new Response(res, 201, 'Account is successfully created', data);
    response.sendSuccessResponse();
       } catch (error) {
           DbErrorHandler.handleSignupError(res, error);
       }
   }
         /**
   * @description This helps a the system to verify if user email exists
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */

    static async verifyUser(req, res) {
        const {email} = jwt.verify(req.params.emailToken, process.env.KEY);
        const token = req.params.emailToken;
        const verify = true;
        const verifyingUser = await UserServices.verifyingUser(email, verify, token);

        if(verifyingUser.status == 200) {
            const response = new Response(res, 200, verifyingUser.message, verifyingUser.data);
            response.sendSuccessResponse();
        } else {
            const response = new Response(res, verifyingUser.status, verifyingUser.message);
            response.sendErrorMessage;
        }
    }

}