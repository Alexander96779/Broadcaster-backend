import 'dotenv';
import Response from '../utils/response';
import LoginSchema from '../modules/loginSchema';
/**
 * @description LoginMiddleware checks if the user inputs are valid
 */
class LoginMiddleware {
  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards request to the next middleware function
   * @returns {obj} returns a response object
  */
  static async Validate(req, res, next) {
    const { error } = LoginSchema.creatSchema(req.body);
    try {
      if (error) {
        const response = new Response(res, 400, error.message);
        return response.sendErrorMessage();
      }
      return next();
    } catch (err) {
      const response = new Response('Internal server error');
      return response.sendErrorMessage();
    }
  }
}
export default LoginMiddleware;
