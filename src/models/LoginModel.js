const mongoose = require('mongoose');
const validator = require('validator');

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

    async register(){
        this.validate();
        if(this.errors.lenght > 0) return;

        try{
            this.user = await LoginModel.create(this.body);
        }catch(e){
            console.log(e);
        }
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