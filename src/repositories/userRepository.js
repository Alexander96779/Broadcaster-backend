import model from '../models';

const {
  User,
} = model;

/**
 * @description UserRepository contains user repository
 */
class UserRepository {
  /**
   * @description constructor handles the user model
   * User Repository constructor
   * @constructor
   *
   */
  constructor() {
    this.db = User;
  }

  /**
   *
   * @param {string} email
   * @returns {obj} record is object if email found or null if not
   */
  async findByEmail(email) {
    try {
      const record = await this.db.findOne({ where: { email } });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {string} userName
   * @returns {obj} record is object if userName found or null if not
   */
  async findByUserName(userName) {
    try {
      const record = await this.db.findOne({ where: { user_name: userName } });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {integer} id
   * @returns {obj} record is object if user found or null if not
   */
  async findByUserId(id) {
    try {
      const record = await this.db.findByPk(id);

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {object} userField
   *
   * @param {object} changes to update for user
   *
   * @returns {object} updated user
   */
  async update(userField, changes) {
    try {
      return await this.db.update(changes, {
        returning: true,
        where: userField
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   * @param {string} email
   *
   * @param {object} changes to update for user
   *
   * @returns {object} updated user
   */
  async verify(email, changes) {
    try {
      return await this.db.update(changes, {
        returning: true,
        where: { email }
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   * @param {integer} id
   * @returns {obj} record is object if id found or null if not
   */
  async findById(id) {
    try {
      const record = await this.db.findByPk(id);

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {Integer} limit
   * @param {Integer} offset
   * @returns {obj} record is object if users found or null if not
   */
  async findAll(limit, offset) {
    try {
      const record = await this.db.findAll({ limit: limit || null, offset: offset || 0, order: [['createdAt']] });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {integer} id
   * @param {string} role
   * @returns {obj} record is object if id found or null if not
   */
  async findByIdAndRole(id, role) {
    try {
      const record = await this.db.findOne({ where: { id, role } });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {string} role
   * @returns {obj} record is object if user found or null if not
   */
  async findByRole(role) {
    try {
      const record = await this.db.findOne({ where: { role } });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

}

export default new UserRepository();
