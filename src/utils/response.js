/**
 * @description Response contains user response messages
 */
class Response {
    /**
       *
       * @description constructor initializes res, code, message
       * Response constructor
       * @constructor
       *
       * @param {obj} res
       * @param {number} code
       * @param {*} message string or object
       * @param {*} data
       */
    constructor(res, code, message, data = {}) {
      this.res = res;
      this.code = code;
      this.message = message;
      this.data = data;
    }
  
    /**
       * @description Send Error Response
       * @returns {*} null
       */
    sendErrorMessage() {
      this.res.status(this.code).json({
        status: this.code,
        error: this.message,
      });
    }
  
    /**
       * @description Send Success Response
       * @returns {*} null
       */
    sendSuccessMessage() {
      this.res.status(this.code).json({
        status: this.code,
        message: this.message,
      });
    }
  
    /**
       * @description Send Success Response
       * @returns {*} null
       */
    sendSuccessResponse() {
      this.res.status(this.code).json({
        status: this.code,
        message: this.message,
        data: this.data,
      });
    }
  }
  export default Response;
  export const onError = (res, code, error) => res.status(code).json({
    status: code,
    error,
  });
  export const onSuccess = (res, code, message, data) => res.status(code).json({
    status: code,
    message,
    data
  });
  