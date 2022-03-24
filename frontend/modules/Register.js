export default class Register {
    constructor(){
        this.form = document.querySelector('.form-register');
    }

    init(){
        this.events();
    }

    events(){
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(event){
        let valid = true;

        for(let errorText of this.form.querySelectorAll('.error-text')){
            errorText.remove();
        }

        for(let field of this.form.querySelectorAll('.form-control')){
            if(!field.value){
                const message = `Campo "${field.previousElementSibling.innerHTML}" não pode estar em branco`;
                this.createError(field, message);
                valid = false
            }
        }

        const element = event.target;
        const emailInput = element.querySelector('input[name="emailInput"]');
        const passwordInput = element.querySelector('input[name="passwordInput"]');
        const repeatPasswordInput = element.querySelector('input[name="passwordRepeatInput"]');

            if (passwordInput.value.length < 6 || passwordInput.value.length > 30) {
                this.createError(passwordInput, 'Senha Inválida, deve conter entre 6 e 30 caracteres.');
                valid = false;
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