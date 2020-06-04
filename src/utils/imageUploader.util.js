/* eslint-disable no-restricted-syntax */
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

class ImageUploader {
  /**
     *
     * @param {*} images
     * @returns {string} image url
     */
  static async uploadImage(images) {
    const extensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];

    const {
      CLOUDINARY_NAME,
      CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET
    } = process.env;
    cloudinary.config({
      cloud_name: CLOUDINARY_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET
    });
    const extension = images.find(image => !extensions.includes(image.name.split('.').pop()));
    if (extension) return null;
    const uploader = path => cloudinary.uploader.upload(path);
    const urls = [];
    for (const image of images) {
      const { path } = image;
      // eslint-disable-next-line no-await-in-loop
      const { url } = await uploader(path);
      urls.push(url);
    }
    return urls;
  }

  /**
   *
   * @param {*} images
   * @returns {string} url
   */
  static async uploader(images) {
    let uploaded;
    if (!images.length) {
      uploaded = await this.uploadImage(images);
      return uploaded;
    }
  }
}

export default ImageUploader;
