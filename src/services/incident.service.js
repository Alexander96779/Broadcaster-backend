import IncidentRepository from '../repositories/incidentRepository';

class IncidentService {
  /**
   * @description retrieveAllIncidents helps to find all incidents
   * @param {obj} options
   * @param {*} limit
   * @param {*} offset
   * @returns {*} incidents
   */
  static async retrieveAllIncidents(options) {
    try {
      const incidents = await IncidentRepository.findAll(options);

      return incidents;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description retrieveOneIncident helps to find incidents by id
   * @param {*} options
   * @returns {*} incident
   */
  static async retrieveOneIncident(options) {
    try {
      const incident = await IncidentRepository.findOne(options);

      return incident;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description approveIncident helps to approve incident by id
   * @param {*} id
   * @returns {*} incident
   */
  static async approveIncident(id) {
    try {
      const incident = await IncidentRepository.update({ id }, { status: 'Approved', isApproved: true });

      return incident;
    } catch (error) {
      throw new Error(error);
    }
  }

    /**
   * @description rejectIncident helps to reject incident by id
   * @param {*} id
   * @returns {*} incident
   */
  static async rejectIncident() {
    try {
        const incident = await IncidentRepository.update({ id }, { status: 'Rejected'});

        return incident;
    } catch (error) {
        throw new Error(error);
    }
  }
}

export default IncidentService;
