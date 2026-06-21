// Load env vars first before anything else
await import('dotenv/config');
const { v2: cloudinary } = await import('cloudinary');
import { errorHandler } from '../utils/error.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (req, res, next) => {
  try {
    // console.log({
    //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    //   api_key: process.env.CLOUDINARY_API_KEY,
    //   api_secret: process.env.CLOUDINARY_API_SECRET
    // });

    const { image } = req.body;
    if (!image) {
      return next(errorHandler(400, 'Please provide an image'));
    }
    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: 'blog_images',
      resource_type: 'auto'
    });
    // console.log("hello", uploadResult);

    res.status(200).json({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id
    });
  } catch (error) {
    next(errorHandler(500, error.message || 'Image upload failed'));
  }
};
