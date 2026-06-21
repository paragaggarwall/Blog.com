async function run() {
  // Load env vars first before anything else
  await import('dotenv/config');
  const { v2: cloudinary } = await import('cloudinary');

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const imageUrl = 'https://res.cloudinary.com/demo/image/upload/dog.jpg';
    console.log('Uploading image...');

    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
      public_id: 'cloudinary_dog_test'
    });

    console.log('Upload successful!');
    console.log('Secure URL:', uploadResult.secure_url);
    console.log('Public ID:', uploadResult.public_id);

    console.log('\nFetching image details...');
    const details = await cloudinary.api.resource(uploadResult.public_id);
    console.log('Width:', details.width);
    console.log('Height:', details.height);
    console.log('Format:', details.format);
    console.log('File Size (bytes):', details.bytes);

    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      secure: true,
      fetch_format: 'auto',
      quality: 'auto'
    });

    console.log('\nDone! Click link below to see optimized version of the image.');
    console.log('Transformed URL:', transformedUrl);
  } catch (error) {
    console.error('Error during Cloudinary operations:', error);
  }
}

run();