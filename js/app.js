document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');

    const formulario = document.querySelector('#formulario');

    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');

    const spinner = document.querySelector('#spinner');

    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetFormulario();
    })
//listo ya lo entiendo
    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('spinner');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('spinner');
            spinner.classList.add('hidden');

            resetFormulario();
        
            const alertaExito = document.createElement('p');
            alertaExito.classList.add('alerta-exito');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove(); 
            }, 3000);
        }, 3000);
    }
//listo ya lo entiendo
    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        email[e.target.name] = e.target.value.trim().toLowerCase();

        comprobarEmail();
    }
//listo ya lo entiendo
    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);
        
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('alerta');
       
        referencia.appendChild(error);
    }
//listo ya la entiendo
    function limpiarAlerta(referencia) {
        
        const alerta = referencia.querySelector('.alerta');
        if(alerta) {
            alerta.remove();
        }
    }
//listo ya la entiendo
    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }
//listo ya la entiendo
    function comprobarEmail() {
        if(Object.values(email).includes('')) {
            btnSubmit.classList.remove('hover');
            btnSubmit.classList.remove('op');
            btnSubmit.disabled = true;
            return;
        } 
        btnSubmit.classList.add('hover');
        btnSubmit.classList.add('op');
        btnSubmit.disabled = false;
    }
//listo ya lo entiendo
    function resetFormulario() {
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }
});