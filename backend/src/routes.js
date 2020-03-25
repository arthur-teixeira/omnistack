const express = require("express");
const router = express.Router();

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const AuthController = require("./controllers/AuthController");

router.route('/auth')
  .post(AuthController.create)

router.route('/profile')
  .get(ProfileController.index)

router.route('/ongs')
  .post(OngController.create)
  .get(OngController.index)

router.route('/incidents')
  .post(IncidentController.create)
  .get(IncidentController.index)

router.route('/incidents/:id')
  .delete(IncidentController.delete)

module.exports = router;