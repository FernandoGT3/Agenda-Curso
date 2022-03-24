const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required:true }, 
    password: { type: String, required:true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body){
        this.body = body;
        this.errors = []; //se tiver um erro o usuário não será cadastrado
        this.user = null;
    }

    async entry() {
        this.validateLogin();
        if(this.errors.length > 0) return;

        this.user = await LoginModel.findOne({ email: this.body.email}); //encontrando um registro na base de dados que tem o email igual ao que esta sendo enviado

        if(!this.user){
            this.errors.push('Usuário não Cadastrado');
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha Inválida');
            this.user = null;
            return;
        }
    }

    validateLogin() {
        this.cleanUp();

        //Email Válido
        if(!validator.isEmail(this.body.email)){
            this.errors.push('Email Inválido')
        }
        //Senha Entre 6-30 caracteres
        if(this.body.password.length < 6 || this.body.password.length > 30) this.errors.push('A Senha precisa ter entre 6 e 30 caracteres.');

    }

    async register(){
        this.validate();
        if(this.errors.length > 0) return;

        await this.userExists();

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    }

    async userExists(){
        const user = await LoginModel.findOne({ email: this.body.email}); //encontrando um registro na base de dados que tem o email igual ao que esta sendo enviado
        //retorna o user ou null
        if(user) this.errors.push('Usuário já Existe');
    }

    validate() {

        //Validação
        //Senha e Repete Senha
        if(this.body.passwordInput !== this.body.passwordRepeatInput) this.errors.push('Senhas Diferentes');

        this.cleanUp();

        //Email Válido
        if(!validator.isEmail(this.body.email)){
            this.errors.push('Email Inválido')
        }
        //Senha Entre 6-30 caracteres
        if(this.body.password.length < 6 || this.body.password.length > 30) this.errors.push('A Senha precisa ter entre 6 e 30 caracteres.');

    }

    cleanUp(){
        //garantindo que todos os dados sejam uma String
        for(let key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.emailInput,
            password: this.body.passwordInput
        }
    }
}

module.exports = Login;