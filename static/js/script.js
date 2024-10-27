document.addEventListener('DOMContentLoaded', function() {
    const formularioPacientes = document.getElementById('formulario-pacientes');
    const formularioCitas = document.getElementById('formulario-citas');
    const citaModal = document.getElementById('cita-modal');
    const comprobanteModal = document.getElementById('comprobante-modal');
    const closeModal = document.querySelector('.close');
    const closeComprobante = document.querySelector('.close-comprobante');
    const printButton = document.getElementById('print-button');

    let nombrePaciente, cedulaPaciente; // Variables para almacenar los datos del paciente
    let notificacionMostrada = false; // Bandera para controlar la notificación

    formularioPacientes.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        nombrePaciente = document.getElementById('nombre').value; // Obtener el nombre ingresado
        cedulaPaciente = document.getElementById('cedula').value; // Obtener la cédula ingresada

        // Simulación de envío exitoso
        setTimeout(() => {
            if (!notificacionMostrada) {
                mostrarNotificacion(`¡Registro exitoso de ${nombrePaciente}!`); // Mostrar notificación
                notificacionMostrada = true; // Cambiar el estado de la bandera
            }
            formularioPacientes.reset(); // Limpiar el formulario después de enviar
            citaModal.style.display = 'block'; // Mostrar el modal de cita
        }, 500); // Simular un pequeño retraso para el efecto
    });

    formularioCitas.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        const fechaCita = document.getElementById('fecha_cita').value; // Obtener la fecha de la cita
        const horaCita = document.getElementById('hora_cita').value; // Obtener la hora de la cita

        // Simulación de envío exitoso
        setTimeout(() => {
            // Mostrar el comprobante
            document.getElementById('comprobante-nombre').textContent = nombrePaciente;
            document.getElementById('comprobante-cedula').textContent = cedulaPaciente;
            document.getElementById('comprobante-fecha').textContent = fechaCita;
            document.getElementById('comprobante-hora').textContent = horaCita;
            comprobanteModal.style.display = 'block'; // Mostrar el modal del comprobante
            
            // Mostrar notificación de cita agendada
            mostrarNotificacion('¡Cita agendada exitosamente!'); // Mostrar notificación
            formularioCitas.reset(); // Limpiar el formulario de cita
            citaModal.style.display = 'none'; // Ocultar el modal después de agendar
        }, 500); // Simular un pequeño retraso para el efecto
    });

    closeModal.addEventListener('click', function() {
        citaModal.style.display = 'none'; // Cerrar el modal de cita
        notificacionMostrada = false; // Resetea la bandera al cerrar
    });

    closeComprobante.addEventListener('click', function() {
        comprobanteModal.style.display = 'none'; // Cerrar el modal del comprobante
    });

    printButton.addEventListener('click', function() {
        window.print(); // Imprimir el contenido del comprobante
    });

    window.addEventListener('click', function(event) {
        if (event.target === citaModal) {
            citaModal.style.display = 'none'; // Cerrar el modal si se hace clic fuera de él
            notificacionMostrada = false; // Resetea la bandera al cerrar
        }
        if (event.target === comprobanteModal) {
            comprobanteModal.style.display = 'none'; // Cerrar el comprobante si se hace clic fuera de él
        }
    });
});

// Función para permitir solo números
function soloNumeros(event) {
    const key = event.key;
    const isNumber = /^[0-9]$/.test(key);
    if (!isNumber && key !== "Backspace" && key !== "Tab") {
        event.preventDefault(); // Evitar la entrada de caracteres no numéricos
    }
}

// Seleccionar los campos de cédula y teléfono
const cedulaInput = document.getElementById('cedula');
const telefonoInput = document.getElementById('telefono');

// Agregar el evento keypress para los campos
cedulaInput.addEventListener('keypress', soloNumeros);
telefonoInput.addEventListener('keypress', soloNumeros);

// Almacenar la referencia a la notificación
const notificacion = document.getElementById('notificacion');
const mensajeNotificacion = document.getElementById('mensaje-notificacion');

// Función para mostrar la notificación
function mostrarNotificacion(mensaje) {
    mensajeNotificacion.textContent = mensaje; // Establecer el mensaje de la notificación
    notificacion.classList.add('show'); // Agregar la clase para la animación de aparición
    notificacion.style.display = 'block'; // Asegurarse de que se muestre

    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
        notificacion.classList.remove('show'); // Quitar la clase de animación
        // Esperar un tiempo para que la animación de desaparición ocurra antes de ocultar completamente
        setTimeout(() => {
            notificacion.style.display = 'none'; // Ocultar completamente la notificación
        }, 500); // Debe coincidir con la duración de la animación
    }, 3000); // Mostrar la notificación durante 3 segundos
}