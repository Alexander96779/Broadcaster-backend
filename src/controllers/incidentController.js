import dotenv from 'dotenv';
import models from '../models';
import DbErrorHandler from '../utils/dbErrorHandler';
import Response, { onError, onSuccess } from '../utils/response';
import IncidentRepository from '../repositories/incidentRepository';
import IncidentService from '../services/incident.service';
import ImageUploader from '../utils/imageUploader.util';

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
}

export default IncidentController;