const mongoose = require("mongoose");

//criando CRUD

//criando collection (tabelas) com nome entre aspas
const Person = mongoose.model("Person", {
  name: String,
  salary: Number,
  approved: Boolean,
});

module.exports = Person;
