const knex = require("knex");
const cfg = require("../../knexfile");

const config = process.env.NODE_ENV === 'test' ? cfg.test : cfg.development
const connection = knex(config);


module.exports = connection