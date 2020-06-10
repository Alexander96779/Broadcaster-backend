import dotenv from 'dotenv';
import models from '../models';
import DbErrorHandler from '../utils/dbErrorHandler';
import Response, { onError, onSuccess } from '../utils/response';
import IncidentRepository from '../repositories/incidentRepository';
import IncidentService from '../services/incident.service';
import ImageUploader from '../utils/imageUploader.util';
import AuthUtils from '../utils/auth.utils';

dotenv.config();

const { User, Incident } = models;

class IncidentController {
      /**
     * @description This helps User to create new incident
     * @param  {object} req - The incident object
     * @param  {object} res - The incident object
     * @returns {object} The response object
     */

     static async createIncident(req, res) {
        let response;
        const { incidentData, userData } = req;
        try {
          if (req.files && req.files.image) {
            const images = Array.isArray(req.files.image) ? req.files.image : [req.files.image];
            const imageUrl = await ImageUploader.uploadImage(images);
            if (!imageUrl) {
              response = new Response(res, 415, 'Please Upload a valid image');
              return response.sendErrorMessage();
            }
            incidentData.image_url = imageUrl[0];
          }
          const id = userData.id;
          const user = await User.findOne({
              where: {
                  id
              }
          });
          const { dataValues } = await Incident.create({ ...incidentData, 
            user_id: userData.id,  user_FirstName: user.firstName, 
            user_LastName: user.lastName});
          if (dataValues) {
            response = new Response(
              res,
              201,
              'Your request to create an incident has been sent successfully, wait for approval',
              dataValues
            );
            return response.sendSuccessResponse();
          }
        } catch (error) {
          return DbErrorHandler.handleSignupError(res, error);
        }
}

  /**
   * @description This helps to find all incidents
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */

   static async getAll(req, res) {
       let incidents;
       let response;
       try {
           const { userData } = req;
           const isAdmin = await AuthUtils.isAdmin(userData);
           const isRequester = await AuthUtils.isRequester(userData);
           if (isAdmin) {
               incidents = await IncidentService.retrieveAllIncidents({});
           }
           if (isRequester) {
               incidents = await IncidentService
               .retrieveAllIncidents({ user_id: userData.id });
           }
            if (incidents.length === 0) {
                response = new Response(res, 404, 'Sorry, No incidents created yet');
                return response.sendErrorMessage();
            }
            response = new Response(res, 200, 'All incidents', incidents);
            return response.sendSuccessResponse();
       } catch (error) {
           return DbErrorHandler.handleSignupError(res, error);
       }
   }

     /**
   * @description This helps user to delete unwanted incident
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */

   static async removeIncident(req, res) {
    try {
      const { userData } = req;
      const isAdmin = await AuthUtils.isAdmin(userData);
      const isRequester = await AuthUtils.isRequester(userData);
      const id = parseInt(req.params.id);
      if (isAdmin) {
        const incident = await IncidentService.retrieveOneIncident({ id });
        if (!incident) {
          return onError(res, 404, 'Sorry, Incident not found');
        }
        const result = await IncidentRepository.deleteIncident(id);
        if (result) {
          return onSuccess(res, 200, 'Incident sucessfully deleted');
        }
      }
      if (isRequester) {
        const incident = await IncidentService.retrieveOneIncident({ id });
        if (!incident) {
          return onError(res, 404, 'Sorry, Incident not found');
        }
        if (incident.user_id !== userData.id) {
          return onError(res, 401, 'This incident does not belong to you ');
        }
        const result = await IncidentRepository.deleteIncident(id);
        if (result) {
          return onSuccess(res, 200, 'Incident sucessfully deleted');
        }
      }
    } catch (error) {
      return DbErrorHandler.handleSignupError(res, error);
    }
   }
}

export default IncidentController;