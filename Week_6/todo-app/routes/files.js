// Backend Routes that handle file upload and downloads
// Google API Documentation: https://cloud.google.com/nodejs/docs/reference/storage/latest

const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const {storage} = require("../firebase");
const cors = require("cors");

// Route Handler
const files = express.Router();
files.use(cors());

// Download file from bucket
files.get("/get_files/:file_name", async (req, res) => {
  try {
    // Specify where to download the file to
    const file_name = req.params.file_name;
    const file_location = path.join(__dirname, "../files", file_name);
    const downloadOption = {
      destination: file_location,
    };
    // Checks if the file exists on the server, retrieves from bucket if it doesn't
    if (!fs.existsSync(file_location)) {
      // Downloads the File from the bucket, throws an exception if it doesn't exist
      await bucket.file(file_name).download(downloadOption);
    }

    // Return the file
    return res.status(200).sendFile(file_location);
  } catch (e) {
    return res.status(404).send("No such file exists");
  }
});

// Upload File via Memory: https://github.com/googleapis/nodejs-storage/blob/main/samples/uploadFromMemory.js
files.post("/", multer().single("demo_image"), async (req, res) => {
  const file = req.file;
  if (file !== undefined) {
    // Upload via buffers
    const c = await storage.bucket().file('profilePics/'+req.file.originalname).save(req.file.buffer);
    return res.status(201).json({ msg: "Successful Uploaded" });
  }
  return res.status(400).json({ msg: "File could not be loaded" });
});

module.exports = files;