import { Op } from 'sequelize';
import model from '../models';

const { Incident, User } = model;
/**
 * @description IncidentRepository contains Incident repository
 */
class IncidentRepository {
  /**
   * @description findAll helps to find all incidents
   * @param {obj} options
   * @param {*} limit
   * @param {*} offset
   * @returns {*} requests
   */
  static async findAll(options = {}) {
    try {
      const incidents = await Incident.findAll({
        where: options, order: [['createdAt', 'DESC']]
      });
      return incidents;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description findByIds helps to find incident by array of ids
   * @param {Array} arrayIds
   * @param {obj} options
   * @param {*} limit
   * @param {*} offset
   * @returns {*} requests
   */
  static async findByIds(arrayIds, options, limit, offset) {
    try {
      const incidents = await Incident.findAll({
        where: { user_id: { [Op.in]: arrayIds }, ...options || { [Op.in]: ['Pending', 'Approved', 'Rejected'] } },
        limit: limit || null,
        offset: offset || 0,
        order: [['createdAt', 'DESC']]
      });

      return incidents;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description findIncidentByTimeframe helps to find incident in a certain time frame
   * @param {Array} arrayIds
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {*} statistics
   */
  static async findIncidentByTimeframe(arrayIds, startDate, endDate) {
    try {
      const statistics = await Incident.count({
        where: {
          user_id: { [Op.in]: arrayIds },
          createdAt: {
            [Op.between]: [startDate, endDate]
          }
        },
      });

      return statistics;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description findByStatus helps to find incident by status
   * @param {Integer} status
   * @returns {*} requests
   */
  static async findByStatus(status) {
    try {
      const incidents = await Incident.findAll({ where: { status } });

      return incidents;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {object} field
   *
   * @param {object} changes to update for user
   *
   * @returns {object} updated user
   */

  static async update(field, changes) {
    try {
      return await Incident.update(changes, {
        returning: true,
        where: field
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
  static async findById(id) {
    try {
      const record = await Incident.findByPk(id, { include: [{ model: User, as: 'user' }] });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
     *
     * @param {obj} options
     * @returns {obj} record is object if match options
     */
  static async findOne(options) {
    try {
      const record = await Incident.findOne({ where: { ...options } });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
     *
     * @param {obj} id
     * @returns {obj} record is object if match options
     */
  static async findRequestById(id) {
    try {
      const record = await Incident.findOne({ where: { id }, include: [{ model: User, as: 'user' }] });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

    /**
   * Gets comment by id.
   * @param {object} id .
   * @returns {object} delete object.
   */
  static async deleteIncident(id) {
    try {
      return await Incident.destroy({
        where: [{ id }]
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default IncidentRepository;
