const mongoose = require('mongoose');
//MongoDb Não está nem ai para como os dados vão estar, então cabe a nós modelar os dados
const HomeSchema = new mongoose.Schema({//modelagem dos Dados
    //objeto com as configurações dos dados que a gente quer
    titulo: { type: String, required:true }, //é obrigatório ser enviado o título
    descricao: String
});

//                              nome do model, e o esquema que vai seguir
const HomeModel = mongoose.model('Home', HomeSchema);

class Home {

}

module.exports = Home;