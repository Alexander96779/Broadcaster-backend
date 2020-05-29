import Joi from '@hapi/joi';

/**
 * @description LoginSchema class validates user data
*/
class LoginSchema {
  /**
   * @static
   * @param {obj} data
   * @returns {obj} returns schema object
  */

  static creatSchema(data) {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .messages({
          'string.base': 'email must be a string',
          'string.email': 'email must be a valid email',
          'any.required': 'email is required',
          'string.empty': 'email is not allowed to be empty'
        }),
      password: Joi.string()
        .max(64)
        .required()
        .messages({
          'string.max': 'password length must be less than or equal to {{#limit}} characters long',
          'any.required': 'password is required',
          'string.empty': 'password is not allowed to be empty'
        }),
    });
    return schema.validate(data);
  }
}

export default LoginSchema;
