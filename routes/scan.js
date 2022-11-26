const express = require("express");
const router = express.Router();
import { uploadFileToS3 } from "../services/uploadFileToS3";
import { createService } from "../services/createService";
import { searchService } from "../services/searchService";

router.post("/", async (req, res, next) => {
  try {
    const results = await searchService(req.body.scanUrl);
    const awaitCreation = await createService(results, 2000, req.body.scanUrl);
    const objectHandler = awaitCreation;
    const contentData = JSON.stringify(objectHandler.data);
    if (objectHandler.created) {
      const uploadFile = await uploadFileToS3(objectHandler.url, 2000);
      res.render("success", {
        message: objectHandler.message,
        data: contentData,
        fileUploaded: {
          status: uploadFile.status,
          value: uploadFile.value,
        },
      });
    } else {
      res.render("fail", {
        message: "Error while creating the file...",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
