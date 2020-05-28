import jwt from 'jsonwebtoken';
import 'dotenv';
import UserRepository from '../repositories/userRepository';

/**
 * @description AuthUtils authentication utility class
 */
class AuthUtils {
  /**
   * @function jwtVerify
   * @param {String} token String
   * @returns {Object} decoded token
   */
  static jwtVerify(token) {
    const decodedToken = jwt.verify(token, process.env.KEY);
    return decodedToken;
  }

  /**
   *
   * @param {string} email
   * @returns {boolean} isEmailExists is true if email exists
   */
  static async emailExists({ email }) {
    const isEmailExists = await UserRepository.findByEmail(email);
    return !!isEmailExists;
  }

  /**
   *
   * @param {string} email
   * @returns {boolean} isEmailExists is true if email exists
   */
  static async isVerified({ id }) {
    const { isVerified } = await UserRepository.findByUserId(id);
    return isVerified;
  }

  /**
   *
   * @param {number} id
   * @returns {boolean} check if super Administrator exists
   */
  static async loggedInUser(id) {
    const loggedInUser = await UserRepository.findById(id);
    return loggedInUser;
  }

  /**
   *
   * @param {obj} userData
   * @returns {boolean} isManager is true if user is a manager
   */
  static async isAdmin({ id }) {
    try {
      const isAdmin = await UserRepository.findByIdAndRole(id, 'administrator');
      return !!isAdmin;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {obj} userData
   * @returns {boolean} isManager is true if user is a manager
   */
  static async isRequester({ id }) {
    try {
      const isRequester = await UserRepository.findByIdAndRole(id, 'requester');
      return !!isRequester;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AuthUtils;
