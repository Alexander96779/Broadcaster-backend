import UserRepository from '../repositories/userRepository';
import Response  from '../utils/response';
import ImageUploader from '../utils/imageUploader.util';
import DbErrorHandler from '../utils/dbErrorHandler';


class UserProfile {
      /**
       *
       * @param {req} req
       * @param {res} res
       * @returns {obj} returns a response
       */
    static async getProfile({ userData }, res) {
        let response;
        const { id } = userData;

        try {
            const search = await UserRepository.findById(id);
            const { dataValues } = search;
            const { password, ...user } = dataValues;
            response = new Response(res, 200, 'User profile data', user);
            return response.sendSuccessResponse();
        } catch (error) {
            return DbErrorHandler.handleSignupError(res, error);
        }
    }

      /**
       *
       * @param {req} req
       * @param {res} res
       * @returns {obj} returns a response
       */
        static async updateUser(req, res) {
            let response;
            try {
                const { userData, profileData} = req;
                if (req.files && req.files.image) {
                    const images = Array.isArray(req.files.image) ? req.files.image : [req.files.image];
                    // uploading image to cloudinary
                    const imageUrl = await ImageUploader.uploadImage(images);
                    if(!imageUrl) {
                        response = new Response(res, 415, 'Please upload valid image');
                        return response.sendErrorMessage();
                    }
                    profileData.image_url = imageUrl[0];
                }
                await UserRepository.update({ id: userData.id }, profileData);
                response = new Response(res, 200, 'User profile data', profileData);
                return response.sendSuccessResponse();
            } catch (error) {
                return DbErrorHandler.handleSignupError(res, error);
            }
        }
}

export default UserProfile;