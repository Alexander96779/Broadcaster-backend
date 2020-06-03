import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import hash from '../utils/hash';
import models from '../models';
import Response from '../utils/response';
import DbErrorHandler from '../utils/dbErrorHandler';
import Mailer from '../services/mail/Mailer';
import UserServices from '../services/user.service';
import redisClient from '../database/redis.database';
import UserRepository from '../repositories/userRepository';

dotenv.config();

const { User } = models;
const { hashPassword, decryptPassword } = hash;

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

    static async verifyingUsers(req, res) {
        const {email} = jwt.verify(req.params.emailToken, process.env.KEY);
        const token = req.params.emailToken;
        const verify = true;
        const verifyUser = await UserServices.verifyingUser(email, verify, token);

        if(verifyUser.status === 200) {
            const response = new Response(res, 200, verifyUser.message, verifyUser.data);
            response.sendSuccessResponse();
        } else {
            const response = new Response(res, verifyUser.status, verifyUser.message);
            response.sendErrorMessage();
        }
    }

      /**
   * @description This helps an existing user to login
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */

    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where: {
                    email
                }
            });

        if (!user) {
            return res.status(404).json({ status: 404, message: 'Email or password does not exist'});
        }
        if (user.isVerified === false){
            return res.status(401).json({ status: 401, message: 'Account not yet verified, Please verify your account first'});
        }
        const decryptedPassword = await decryptPassword(password, user.password);
        if (!decryptedPassword) {
            return res.status(403).json({ status: 403, message: 'Invalid Email or password'});
        }
        const newUser = {
            id: user.id,
            email: user.email,
            role: user.role
        };
        const token = jwt.sign(newUser, process.env.KEY);
        return res.status(200).json({ status: 200, message: `Hey ${user.user_name} you have successfully logged in`, data: { token} });

        } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error', err });
        }
    }

      /**
   * @description contoller function that logs a user out
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - middleware object
   * @returns {object} user - Logged in user
   */

   static async logout (req, res) {
       try {
           const token = req.headers.token || req.params.token;
           if (!token) {
            return res.status(403).json({
                status: 403,
                error: 'Provide token please!!',
            });
           }
           redisClient.set('token', token);
           return res.status(200).json({
               status: 200,
               message: 'You have logged out',
           });
       } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error', err });
       }
   }

     /**
   * @description This helps a administrator to change users role
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */

  static async assignRole(req, res) {
      const { email, role } = req.body;
      try {
          const user = await UserRepository.update({email}, {role});
          if (user[0] === 0) {
              const response = new Response(res, 404, 'User is not found');
              return response.sendErrorMessage();
          }
          const newUser = {
              email: user[1][0].email,
              userName: user[1][0].user_name,
              role: user[1][0].role
          };
          const response = new Response(
              res,
              200,
              'User role updated successfully',
              { user: newUser }
          );
          return response.sendSuccessResponse();
      } catch (error) {
          return DbErrorHandler.handleSignupError(res, error);
      }
  }
}