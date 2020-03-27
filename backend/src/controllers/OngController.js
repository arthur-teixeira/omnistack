const connection = require("../database/connection");
const generateUID = require("../utils/generateUID");

module.exports = {

  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = generateUID();

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })

    return res.status(201).json({ id });
  },

  async index(req, res) {
    const ongs = await connection('ongs').select("*");

    return res.json(ongs)
  }
}