import models from '../models';

const { User } = models;

class UserServices {
  /**
     * This is a function that verifies a user account
     * @param {string} email this is a user email to be verified
     * @param {object} verifyUser this is a value needed to verify a user account
     * @param {string} token this is a user token to be verified
     * @returns {object} return  a response object
     */
  static async verifyingUser(email, verifyUser, token) {
    try {
      const userToVerify = await User.findOne({
        where: { email }
      });
      if (userToVerify && userToVerify.isVerified) {
        return {
          status: 409,
          message: 'User Already Verified'
        };
      }
      if (userToVerify) {
        await User.update(
          { isVerified: verifyUser },
          { where: { email }, returning: true, plain: true }
        );

        return {
          status: 200,
          message: 'User Account Has Been Successfuly Verified',
          data: {
            user: {
              email: userToVerify.email,
              userName: userToVerify.user_name,
              image_url: userToVerify.image_url,
            },
            token,
          }
        };
      }
      return {
        status: 404,
        message: 'User Not Found'
      };
    } catch (error) {
      return {
        status: 500,
        message: error
      };
    }
  }
}
export default UserServices;
