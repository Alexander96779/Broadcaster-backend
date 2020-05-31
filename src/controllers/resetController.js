import jwt from 'jsonwebtoken';
import models from '../models';
import Mailer from '../services/mail/Mailer';
import hash from '../utils/hash';
import dbErrorHandler from '../utils/dbErrorHandler';

const { User } = models;

class resetController {

      /**
   * @description This is a function for sending email to a user who forgot password
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */

   static async forgotPassword(req, res) {
    const exist = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!exist) {
        return res.status(404).json({
            status: 404,
            error: 'Looks like there is no account associated with your Email',
        });
    }
    const payload = {
        id: exist.id,
        userName: exist.user_name,
        email: exist.email
    };
    const token = jwt.sign(payload, process.env.KEY);

    const mail = new Mailer({
        to: exist.email,
        header: 'Reset your password',
        messageHeader: `Hello, <strong>${exist.user_name}!</strong>`,
        messageBody: 'You are requesting a password reset, Click the following link to reset your passaword.',
        optionLink: `${process.env.FRONTEND_URL}/api/auth/reset?email=${exist.email}&token=${token}`,
        Button: true
    });
    mail.InitButton({
        text: 'Reset Password',
        link: `${process.env.FRONTEND_URL}/resetPassword?email=${exist.email}&token=${token} `
      });
      await mail.sendMail();
      return res.status(200).json({
          status: 200,
          message: 'Link to reset password is sent to your email',
      });
   }

     /**
   * @description This is a function for sending email to a user with an account
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
    static async resetPassword(req, res) {
        const { 
            password,
            confirmPassword
        } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 400,
                error: 'Password do not match!!',
            });
        }
        const userEmail = req.params.email;
        const exist = await User.findOne({
            where: {
                email: userEmail
            }
        });
        if (exist) {
            try {
            const hashdPswd = await hash.hashPassword(password);
            await User.update(
                {
                    password: hashdPswd
                },
                {
                where: {
                    email: userEmail
                },
                returning: false
            });
            return res.status(200).json({
                status: 200,
               message: 'Password is updated successfully', 
            });
        } catch (error) {
             dbErrorHandler.handleSignupError(res, error);   
        }
        }
        return res.status(404).json({
            status: 404,
            error: 'User with that email is not found',
        });
    }
}

export default resetController;