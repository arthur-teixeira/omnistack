const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors())

app.use(express.json());

app.use(require('./routes'))
app.listen(5000, () => console.log("servidor aberto"));