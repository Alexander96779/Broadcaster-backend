import 'dotenv';
import Response from '../utils/response';
import UserSchema from '../modules/userSchema';
import validator from '../utils/validator';
import AuthUtils from '../utils/auth.utils';

const { trimmer } = validator;

/**
 * @description AuthMiddleware checks if the token was loggedout or not
 */
class ProfileMiddleware {
  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards request to the next middleware function
   * @returns {obj} returns a response object
  */
  static async param(req, res, next) {
    const { error } = UserSchema.param(req.params);
    try {
      if (error) {
        const response = new Response(res, 422, error.message);
        return response.sendErrorMessage();
      }

      return next();
    } catch (err) {
      const response = new Response(res, 500, err.message);
      return response.sendErrorMessage();
    }
  }

  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards request to the next middleware function
   * @returns {obj} returns a response object
  */
  static async validate(req, res, next) {
    let response;
    try {
      const { userData } = req;
      const profileData = trimmer(req.body);
      const { error } = UserSchema.profile(profileData);
      const verified = await AuthUtils.isVerified(userData);

      if (!verified) {
        response = new Response(res, 400, 'Your account is not yet verified');
        return response.sendErrorMessage();
      }

      if (error) {
        response = new Response(res, 422, error.message);
        return response.sendErrorMessage();
      }

      req.profileData = profileData;
      return next();
    } catch (err) {
      response = new Response(res, 500, err.message);
      return response.sendErrorMessage();
    }
  }
}

export default ProfileMiddleware;
