const express = require("express");
const router = express.Router();
const { celebrate, Segments, Joi } = require("celebrate");


const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const AuthController = require("./controllers/AuthController");

router.route('/auth')
  .post(AuthController.create)

router.route('/profile')
  .get(celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }), ProfileController.index)

router.route('/ongs')
  .post(celebrate({
    [Segments.BODY]: Joi.object.keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2)
    })
  }), OngController.create)
  .get(OngController.index)

router.route('/incidents')
  .post(IncidentController.create)
  .get(celebrate({
    [Segments.QUERY]: Joi.object
  }), IncidentController.index)

router.route('/incidents/:id')
  .delete(celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number()
    })
  }), IncidentController.delete)

module.exports = router;