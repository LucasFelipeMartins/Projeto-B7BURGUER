document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('cadastro-form');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const submitBtn = document.getElementById('submit-btn');

    const formValidity = {

        nome: false,
        email: false,
        telefone: false

    };

    function validateNome() {

        const nomeValue = nomeInput.value.trim();
        if (nomeValue === '') {
            showError(nomeInput, 'O campo Nome não pode estar vazio.');
            formValidity.nome = false;
        } else {
            clearError(nomeInput);
            formValidity.nome = true;
        }
        checkFormValidity();

    }

    
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue === '') {
            showError(emailInput, 'O campo E-mail não pode estar vazio.');
            formValidity.email = false;
        } else if (!emailRegex.test(emailValue)) {
            showError(emailInput, 'Por favor, insira um formato de e-mail válido.');
            formValidity.email = false;
        } else {
            clearError(emailInput);
            formValidity.email = true;
        }
        checkFormValidity();
    }

    function validateTelefone() {
        const telefoneValue = telefoneInput.value.trim();
        
        const digits = telefoneValue.replace(/\D/g, '');

        if (digits.length === 0) {
             showError(telefoneInput, 'O campo Telefone não pode estar vazio.');
             formValidity.telefone = false;
        } else if (digits.length < 10) {
            showError(telefoneInput, 'O telefone deve ter no mínimo 10 dígitos.');
            formValidity.telefone = false;
        } else {
            clearError(telefoneInput);
            formValidity.telefone = true;
        }
        checkFormValidity();
    }


    function showError(input, message) {

        const formGroup = input.parentElement;
        const errorSpan = formGroup.querySelector('.error-message');
        
        input.classList.add('error');
        errorSpan.textContent = message;
        errorSpan.classList.add('visible');

    }

    function clearError(input) {

        const formGroup = input.parentElement;
        const errorSpan = formGroup.querySelector('.error-message');
        
        input.classList.remove('error');
        errorSpan.classList.remove('visible');
        errorSpan.textContent = '';

    }

    function checkFormValidity() {

        const isFormValid = formValidity.nome && formValidity.email && formValidity.telefone;
        
        submitBtn.disabled = !isFormValid;

    }
    
    function formatTelefone(e) {

        let value = e.target.value.replace(/\D/g, '');
        value = value.substring(0, 11);
        
        if (value.length > 10) {

             // (XX) XXXXX-XXXX
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');

        } else if (value.length > 6) {

             // (XX) XXXX-XXXX
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');

        } else if (value.length > 2) {

             // (XX) XXXX
            value = value.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');

        } else if (value.length > 0) {

             // (XX
            value = value.replace(/^(\d*)/, '($1');

        }

        e.target.value = value;

    }

    nomeInput.addEventListener('input', validateNome);
    emailInput.addEventListener('input', validateEmail);
    telefoneInput.addEventListener('input', validateTelefone);
    
    telefoneInput.addEventListener('input', formatTelefone);

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        validateNome();
        validateEmail();
        validateTelefone();

        if (!submitBtn.disabled) {

            alert('Cadastro realizado com sucesso!\nRedirecionando para a página principal...');
            
            window.location.href = 'home.html';

        }

    });

    checkFormValidity();
    
});