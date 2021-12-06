import 'dotenv';
import Response from '../utils/response';
import UserSchema from '../modules/userSchema';
import validator from '../utils/validator';
import AuthUtils from '../utils/auth.utils';
import userRepository from '../repositories/userRepository';

const { trimmer } = validator;

/**
 * @description AuthMiddleware checks if the token was loggedout or not
 */
class AuthMiddleware {
  /**
   *
   * @param { obj } req
   * @param { obj } res
   * @param { function } next
   * @returns { * } null
   */
  static async verifyToken(req, res, next) {
    try {
      const token = (!req.headers.token) ? req.query.token : req.headers.token;
      const payload = AuthUtils.jwtVerify(token);
        const user = userRepository.findByEmail(payload.email);
        if (!user) {
          return res.status(400).json({ status: 400, error: 'invalid token' });
        }
        req.userData = payload;
        next();
    } catch (ex) {
      return res.status(400).json({ status: 400, error: 'invalid token' });
    }
  }

  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards request to the next middleware function
   * @returns {obj} returns a response object
  */
  static async signup(req, res, next) {
    const userData = trimmer(req.body);
    const { error } = UserSchema.signup(userData);
    try {
      const isEmailExists = await AuthUtils.emailExists(userData);

      if (isEmailExists) {
        const response = new Response(res, 409, 'Email already used');
        return response.sendErrorMessage();
      }

      if (error) {
        const response = new Response(res, 422, error.message);
        return response.sendErrorMessage();
      }

      return next();
    } catch (err) {
      const response = new Response(res, 500, 'Internal Server Error');
      return response.sendErrorMessage();
    }
  }

  /**
   * @description This helps validate new role info
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @param  {object} next - forwards request to the next middleware function
   * @returns  {object} The response object
   */
  static async userRole(req, res, next) {
    const { id } = req.userData;
    const { email, role } = req.body;
    const user = { email, role };
    const { error, value } = UserSchema.assignRole(user);

    if (error) {
      const response = new Response(res, 422, error.details[0].message);
      response.sendErrorMessage();
    } else {
      const loggedInUser = await AuthUtils.loggedInUser(id);

      if (loggedInUser.role !== 'administrator') {
        const response = new Response(
          res,
          403,
          'You have no rights over this endpoint'
        );
        return response.sendErrorMessage();
      }
      req.value = value;
      next();
    }
  }


  /**
   * @description This helps validate if user is a super admin
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @param  {object} next - forwards request to the next middleware function
   * @returns  {object} The response object
   */
  static async isAdmin(req, res, next) {
    const { userData } = req;
    try {
      const isAdmin = await AuthUtils.isAdmin(userData);

      if (!isAdmin) {
        const response = new Response(res, 403, 'You have no rights over this endpoint');
        return response.sendErrorMessage();
      }

      next();
    } catch (error) {
      const response = new Response(res, 500, error.message || 'Internal server error');
      return response.sendErrorMessage();
    }
  }
}

export default AuthMiddleware;
