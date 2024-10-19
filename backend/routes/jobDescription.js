const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Temporary storage
const resumeController = require("./resumeController");
const authMiddleware = require("./authMiddleware"); // Your authentication middleware

router.post(
  "/upload-resume",
  authMiddleware,
  upload.single("resume"),
  resumeController.uploadResume
);
router.post("/apply-job", authMiddleware, resumeController.applyForJob);

module.exports = router;
