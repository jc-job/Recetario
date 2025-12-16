//FORMULARIO

const formulario = document.getElementById("contactForm");
const nombre = document.getElementById("nombre");
// const email = document.getElementById("email");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");
const successMessage = document.getElementById("successMessage");
const btn = formulario.querySelector('button[type="submit"]');  



//validacion
nombre.addEventListener('input', function() {
    if (this.value.trim().length < 3) {
        mostrarError(this, 'El nombre debe tener al menos 3 caracteres');
    } else {
        limpiarError(this);
    }
});

/*email.addEventListener('blur', function() {
    if (this.value.trim() === '') {
        mostrarError(this, 'El email es obligatorio');
    } else if (!this.value.includes('@') || !this.value.includes('.')) {
        mostrarError(this, 'Ingresa un email válido');
    } else {
        limpiarError(this);
    }
});
*/

asunto.addEventListener('change', function() {
    if (this.value === '') {
        mostrarError(this, 'Selecciona un asunto');
    } else {
        limpiarError(this);
    }       
});

mensaje.addEventListener('input', function() {
    if (this.value.trim().length < 10) {
        mostrarError(this, 'El mensaje debe tener al menos 10 caracteres');
    } else {
        limpiarError(this);
    }
});


//ENVIO DEL FORMULARIO
formulario.addEventListener('submit', function(event) {
    event.preventDefault(); 
    let valido = true;

    //VALIDACIONES
    if (nombre.value.trim().length < 3) {
        mostrarError(nombre, 'El nombre debe tener al menos 3 caracteres');
        valido = false;
    }   
  /*  if (email.value.trim() === '') {
       mostrarError(email, 'El email es obligatorio');
        valido = false;
   } */

    if (asunto.value === '') {
        mostrarError(asunto, 'Selecciona un asunto');
        valido = false;
    } 
    if (mensaje.value.trim().length < 10) {
        mostrarError(mensaje, 'El mensaje debe tener al menos 10 caracteres');
        valido = false;
    } 

    if (valido) {
        successMessage.style.display = 'block';
        formulario.style.display = 'none';
        
        const serviceID = 'default_service';
        const templateID = 'template_4o47hr5';
        
        emailjs.sendForm(serviceID, templateID, formulario)
            .then(() => {
                // Mostrar mensaje de éxito
                successMessage.style.display = 'block';
                formulario.style.display = 'none';
    

     setTimeout(function() {
        successMessage.style.display = 'none';
        formulario.style.display = 'block';
        formulario.reset(); 
        limpiarError(nombre);
       // limpiarError(email);
        limpiarError(asunto);
        limpiarError(mensaje);
    }, 5000);
})
            .catch((err) => {
                alert('Error al enviar el mensaje: ' + JSON.stringify(err));
                btn.textContent = 'Enviar Mensaje';
                btn.disabled = false;
            });
    }   
});

function mostrarError(campo, mensaje) {
    console.log(campo)
    const errorElemento = document.getElementById(`error${campo.id.charAt(0).toUpperCase() + campo.id.slice(1)}`);
    errorElemento.textContent = mensaje;
    campo.classList.add('invalid');
    campo.classList.remove('valid');
}

function limpiarError(campo) {
    const errorElemento = document.getElementById(`error${campo.id.charAt(0).toUpperCase() + campo.id.slice(1)}`);
    errorElemento.textContent = '';
    campo.classList.remove('invalid');
    campo.classList.add('valid');
}

/* ========================================= */
            /* BOTON PARA SUBIR */
/* ========================================= */

const btnSubir = document.getElementById('btnSubir');

// Mostrar/ocultar el botón según el scroll
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 100) { // Aparece después de 100px
        btnSubir.classList.add('mostrar');
    } else {
        btnSubir.classList.remove('mostrar');
    }
});

// Al hacer clic, subir suavemente
btnSubir.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});