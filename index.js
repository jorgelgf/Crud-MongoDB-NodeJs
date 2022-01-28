//chamando o dotenv
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

//---------------
//forma de ler JSON /middleware
app.use(
  //iniciando a configuração de leitura do json
  express.urlencoded({
    extended: true,
  })
);
//finalizando a chamada do leitor de jSON / outro middleware
app.use(express.json());
//----------------

//rotas -- puxando rota criada do arquivo personRouts

const personRouts = require("./routes/personRouts");

//definindo dentro do express, por meio de middleware
app.use("/person", personRouts);

//-----------------
app.get("/", (req, res) => {
  //mostrar requisição - req
  res.json({ message: "Oi express" });
});

//-----
//conectando usando o mongoose
const USER = process.env.DB_USER;
const KEY = encodeURIComponent(process.env.DB_KEY);
mongoose
  .connect(
    `mongodb+srv://${USER}:${KEY}@apicluster.wvlij.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    //para o express ser visto através de alguma porta
    console.log("Conectando-se ao monogoDB");
    app.listen(3000);
  })
  .catch((error) => console.log("Erro de conexão ", error));

//----
