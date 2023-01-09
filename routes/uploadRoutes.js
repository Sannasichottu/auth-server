const route = require('express').Router();
const upload = require("../middleware/upload");
const uploadImage = require("../middleware/uploadImage");
const auth = require("../middleware/auth");
const uploadController = require("../controllers/uploadController");

route.post("/api/upload",uploadImage,upload,auth,uploadController.uploadAvatar);

module.exports = route;
