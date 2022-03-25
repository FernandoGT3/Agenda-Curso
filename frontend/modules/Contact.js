import validator from 'validator';

export default class Contact {
    constructor() {
        this.form = document.querySelector('.form-editRegister');
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(event) {
        let valid = true;

        for (let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        const element = event.target;
        const nameInput = element.querySelector('input[name="nameInput"]');
        const lastNameInput = element.querySelector('input[name="lastNameInput"]');
        const emailInput = element.querySelector('input[name="emailInput"]');
        const phoneInput = element.querySelector('input[name="phoneInput"]');

        if (!nameInput.value) {
            const message = `O campo ${nameInput.previousElementSibling.innerHTML} não pode estar em branco`;
            this.createError(nameInput, message);
            valid = false;
        }

        if(!emailInput.value && !phoneInput.value){
            const message =  'É necessário que o campo "Email" ou "Telefone" esteja preenchido';
            this.createError(emailInput, message);
            this.createError(phoneInput, message);
            valid = false;
        }

        if(emailInput.value){
            if (!validator.isEmail(emailInput.value)) {
                this.createError(emailInput, 'Email Inválido');
                valid = false;
            }
        }
        
        if(valid) element.submit();
    }

    createError(field, message){
        const div = document.createElement('div');
        div.innerHTML = message;
        div.classList.add('error-text');

        field.insertAdjacentElement('afterend', div);
    }
}