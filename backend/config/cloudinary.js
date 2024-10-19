const cloudinary = require("cloudinary").v2; // Import Cloudinary

const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      //!    ########   Configuring the Cloudinary to Upload MEDIA ########
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    console.log("Cloudinary connected successfully."); // Confirmation message
  } catch (error) {
    console.error("Error connecting to Cloudinary:", error.message);
  }
};

module.exports = { cloudinary, cloudinaryConnect }; // Export both
