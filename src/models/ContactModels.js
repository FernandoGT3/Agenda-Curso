const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    nome: { type: String, required:true },
    sobrenome: { type: String, required:false, default: '' },
    email: { type: String, required:false, default: '' },
    telefone: { type: String, required:false, default: '' },
    editado: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model('Contacts', ContactSchema);

function Contacts (body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
}

Contacts.prototype.register = async function() {
    this.validate();

    if(this.errors.length > 0) return;

    this.contact = await ContactModel.create(this.body);

};

Contacts.prototype.validate = function() {
    this.cleanUp();

    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório');
    //Email Válido
    if(this.body.email && !validator.isEmail(this.body.email)){
        this.errors.push('Email Inválido');
    }
    if(!this.body.email && !this.body.telefone) this.errors.push('É necessário pelo menos um Email ou um Telefone');
}

Contacts.prototype.cleanUp = function () {
    //garantindo que todos os dados sejam uma String
    for(let key in this.body){
        if(typeof this.body[key] !== 'string'){
            this.body[key] = '';
        }
    }

    this.body = {
        nome: this.body.nameInput,
        sobrenome: this.body.lastNameInput,
        email: this.body.emailInput,
        telefone: this.body.phoneInput,
    }
}

Contacts.searchID = async function(id) {
    if(typeof id !== 'string') return;
    const user = await ContactModel.findById(id);
    return user;
}

module.exports = Contacts;