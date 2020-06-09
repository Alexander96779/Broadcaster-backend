import 'dotenv';
import Response from '../utils/response';
import IncidentSchema from '../modules/incidentSchema';
import validator from '../utils/validator';
import AuthUtils from '../utils/auth.utils';

const { trimmer } = validator;
/**
 * @description IncidentMiddleware checks if the param id is valid
 */
class IncidentMiddleware {
  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards incident to the next middleware function
   * @returns {obj} returns a response object
  */
  static async param(req, res, next) {
    const { error } = IncidentSchema.incidentParam(req.params);
    try {
      if (error) {
        const response = new Response(res, 422, error.message);
        return response.sendErrorMessage();
      }

      return next();
    } catch (err) {
      const response = new Response(res, 500, err || 'Internal server error');
      return response.sendErrorMessage();
    }
  }

  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards incident to the next middleware function
   * @returns {obj} returns a response object
  */

  static async validate(req, res, next) {
    const { userData } = req;
    const incidentData = trimmer(req.body);
    const { error } = IncidentSchema.updateSchema(incidentData);
    const verified = await AuthUtils.isVerified(userData);

    if (!verified) {
      response = new Response(res, 400, 'Your account is not yet verified');
      return response.sendErrorMessage();
    }
    try {
      if (error) {
        const response = new Response(res, 422, error.message);
        return response.sendErrorMessage();
      }
      req.incidentData = incidentData;
      return next();
    } catch (err) {
      const response = new Response(res, 500, err);
      return response.sendErrorMessage();
    }
  }
}

export default IncidentMiddleware;
