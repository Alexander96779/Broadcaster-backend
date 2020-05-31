import joi from '@hapi/joi';

class validation {
  /**
   * @description This is a function for validating email
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @param  {object} next -The next action to follow object
   * @returns  {object} The response object
   */
  static forget(req, res, next) {
    const Schema = joi.object({
      email: joi.string().email().required(),
    });

    const { error } = Schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/"/g, ''),
      });
    }
    next();
  }

  /**
   * @description This is a function for validating email
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @param  {object} next -The next action to follow object
   * @returns  {object} The response object
   */
  static reset(req, res, next) {
    const Schema = joi.object({
      password: joi.string().min(8).max(64).required()
        .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
      confirmPassword: joi.string().min(8).max(64).required()
        .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    });
    const { error } = Schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/"/g, ''),
      });
    }
    next();
  }
}

export default validation;
