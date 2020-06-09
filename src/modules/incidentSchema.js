import Joi from '@hapi/joi';

/**
 * @description IncidentSchema class validates user data
*/
class IncidentSchema {
  /**
   * @static
   * @param {obj} data
   * @returns {obj} returns schema object
  */
  static incidentSchema(data) {
    const schema = Joi.object().keys({
      title: Joi.string().min(5).max(50)
        .messages({
          'string.base': 'Title must be a string',
          'string.min': 'Title length must be at least {{#limit}} characters long',
          'string.max': 'Title length must be less than or equal to {{#limit}} characters long',
        }),
      body: Joi.string().min(10).max(255)
        .messages({
          'string.base': 'Body must be a string',
          'string.min': 'Body length must be at least {{#limit}} characters long',
          'string.max': 'Body length must be less than or equal to {{#limit}} characters long',
        }),
      category: Joi.string().regex(/^(Red flag|Intervention|RED FLAG|INTERVENTION|red flag|intervention)$/)
        .messages({
          'string.base': 'category must be a string',
          'string.pattern.base': 'category must be Red flag|Intervention|RED FLAG|INTERVENTION|red flag|intervention',
        })
    });
    return schema.validate(data);
  }

  /**
   * @static
   * @param {obj} data
   * @returns {obj} returns schema object
  */
  static updateSchema(data) {
    const schema = Joi.object().keys({
      title: Joi.string().min(5).max(50)
        .messages({
          'string.base': 'Title must be a string',
          'string.min': 'Title length must be at least {{#limit}} characters long',
          'string.max': 'Title length must be less than or equal to {{#limit}} characters long',
        }),
      body: Joi.string().min(10).max(255)
        .messages({
          'string.base': 'Body must be a string',
          'string.min': 'Body length must be at least {{#limit}} characters long',
          'string.max': 'Body length must be less than or equal to {{#limit}} characters long',
        }),
      category: Joi.string().regex(/^(Red flag|Intervention|RED FLAG|INTERVENTION|red flag|intervention)$/)
        .messages({
          'string.base': 'category must be a string',
          'string.pattern.base': 'category must be Red flag|Intervention|RED FLAG|INTERVENTION|red flag|intervention',
        })
    });
    return schema.validate(data);
  }

    /**
   * @static
   * @param {obj} data
   * @returns {obj} returns schema object
   * This is used to validate parameters in URL
  */
  static incidentParam(data) {
    const schema = Joi.object({
      id: Joi.number()
        .integer()
        .positive()
        .min(1)
        .messages({
          'number.base': 'Parameter id must be a number',
          'string.min': 'Parameter id  length must be at least {{#limit}} characters long',
          'number.integer': 'Parameter id  must be an integer',
          'number.positive': 'Parameter id  must be a positive number',
          'number.unsafe': 'Parameter id  must be a safe number',
          'any.required': 'Parameter id  is required',
        }),
    });

    return schema.validate(data);
  }

}

export default IncidentSchema;
