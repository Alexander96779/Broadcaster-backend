import jwt from 'jsonwebtoken';
import models from '../models';
import Mailer from '../services/mail/Mailer';

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
}

export default resetController;