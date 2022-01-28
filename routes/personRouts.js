//rota inicial / end point
//exportando a rota do arquivo para ser visto em outros arquivos js

const router = require("express").Router();

//Chamando o modulo Person
const Person = require("../models/Person");

//-------------------
//enviando dados - Criação de dados
router.post("/", async (req, res) => {
  //req.body -> Ponto de requisição onde vão chegar os dados

  const { name, salary, approved } = req.body;
  //validando se foi inserido algum nome
  if (!name) {
    res.status(422).json({ message: "O nome é obrigatório" });
    return;
  }

  const person = {
    name,
    salary,
    approved,
  };
  //create -> Criando dados no sistema
  try {
    //ciando dados - obs.: não foi preciso criar as colunas
    await Person.create(person);
    //enviando para o servidor status de sucesso
    res.status(201).json({ message: "Pessoa inserida no sistema com sucesso" });
  } catch (error) {
    //enviando uma  resposta de erro ao servidor
    res.status(500).json({ error: error });
  }
});
//-------------------
//Read - Leitura de dados
router.get("/", async (req, res) => {
  try {
    //garantindo obter todos os dados da collection

    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
//rotas dinâmicas para consultas

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const person = await Person.findOne({ _id: id });

    //Validando se o person existe
    if (!person) {
      return res.status(422).json({ message: "O usuário nao foi encontrado" });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
//-------------------

//-------------------
//UPDATE - Atualização de dados (PUT, PATCH)
//PUT espera o objeto completo para atualização do sistema
//PATCH espera uma atualização parcial do objeto

//usando PATCH
router.patch("/:id", async (req, res) => {
  //buscando id do user
  const id = req.params.id;

  //obtendo do body as infos da base de dados
  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatePerson = await Person.updateOne({ _id: id }, person);
    if (updatePerson.matchedCount === 0) {
      return res.status(422).json({ message: "O usuário nao foi encontrado" });
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//-------------------

//-------------------
//DELETE - Deletar dados

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const person = await Person.findOne({ _id: id });
  //Validando se o person existe
  if (!person) {
    return res.status(422).json({ message: "O usuário nao foi encontrado" });
  }

  try {
    await Person.deleteOne({ _id: id });
    res.status(200).json({ message: "Usuário removido com sucesso" });
  } catch (error) {}
});

module.exports = router;
