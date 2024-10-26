import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCqfOQTdRNYTPGYiGh7E-UTFmrWcTPiRRI",
  authDomain: "agenda-de-pacientes-4349b.firebaseapp.com",
  projectId: "agenda-de-pacientes-4349b",
  storageBucket: "agenda-de-pacientes-4349b.appspot.com",
  messagingSenderId: "653031457613",
  appId: "1:653031457613:web:3d9300916b99793dd4ad04",
  measurementId: "G-BTLL9MX2MF"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Código existente
document.addEventListener('DOMContentLoaded', function() {
    const formularioPacientes = document.getElementById('formulario-pacientes');
    const formularioCitas = document.getElementById('formulario-citas');
    const citaModal = document.getElementById('cita-modal');
    const comprobanteModal = document.getElementById('comprobante-modal');
    const closeModal = document.querySelector('.close');
    const closeComprobante = document.querySelector('.close-comprobante');
    const printButton = document.getElementById('print-button');

    let nombrePaciente, cedulaPaciente;
    let notificacionMostrada = false;

    formularioPacientes.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        nombrePaciente = document.getElementById('nombre').value;
        cedulaPaciente = document.getElementById('cedula').value;

        try {
            // Agregar el paciente a Firestore
            await addDoc(collection(db, "pacientes"), {
                nombre: nombrePaciente,
                cedula: cedulaPaciente
            });
            
            mostrarNotificacion(`¡Registro exitoso de ${nombrePaciente}!`);
            formularioPacientes.reset();
            citaModal.style.display = 'block';

            // Llamar a la función para actualizar la lista de pacientes
            obtenerPacientes();
        } catch (error) {
            console.error("Error al registrar el paciente: ", error);
        }
    });

    formularioCitas.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const fechaCita = document.getElementById('fecha_cita').value; 
        const horaCita = document.getElementById('hora_cita').value;

        setTimeout(() => {
            document.getElementById('comprobante-nombre').textContent = nombrePaciente;
            document.getElementById('comprobante-cedula').textContent = cedulaPaciente;
            document.getElementById('comprobante-fecha').textContent = fechaCita;
            document.getElementById('comprobante-hora').textContent = horaCita;
            comprobanteModal.style.display = 'block';
            
            mostrarNotificacion('¡Cita agendada exitosamente!');
            formularioCitas.reset();
            citaModal.style.display = 'none';
        }, 500);
    });

    closeModal.addEventListener('click', function() {
        citaModal.style.display = 'none';
        notificacionMostrada = false;
    });

    closeComprobante.addEventListener('click', function() {
        comprobanteModal.style.display = 'none'; 
    });

    printButton.addEventListener('click', function() {
        window.print(); 
    });

    window.addEventListener('click', function(event) {
        if (event.target === citaModal) {
            citaModal.style.display = 'none';
            notificacionMostrada = false;
        }
        if (event.target === comprobanteModal) {
            comprobanteModal.style.display = 'none';
        }
    });

    obtenerPacientes(); // Llamar para obtener pacientes al cargar la página
});

// Función para obtener y mostrar pacientes
async function obtenerPacientes() {
    const pacientesList = document.getElementById('pacientes-list');
    const totalPacientes = document.getElementById('total-pacientes');
    pacientesList.innerHTML = ''; // Limpiar la lista

    const querySnapshot = await getDocs(collection(db, "pacientes"));
    totalPacientes.textContent = `Total de Pacientes: ${querySnapshot.size}`;

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement('li');
        li.textContent = `${data.nombre} (Cédula: ${data.cedula})`;
        pacientesList.appendChild(li);
    });
});

function soloNumeros(event) {
    const key = event.key;
    const isNumber = /^[0-9]$/.test(key);
    if (!isNumber && key !== "Backspace" && key !== "Tab") {
        event.preventDefault();
    }
}

const cedulaInput = document.getElementById('cedula');
const telefonoInput = document.getElementById('telefono');

cedulaInput.addEventListener('keypress', soloNumeros);
telefonoInput.addEventListener('keypress', soloNumeros);

const notificacion = document.getElementById('notificacion');
const mensajeNotificacion = document.getElementById('mensaje-notificacion');

function mostrarNotificacion(mensaje) {
    mensajeNotificacion.textContent = mensaje;
    notificacion.classList.add('show');
    notificacion.style.display = 'block';

    setTimeout(() => {
        notificacion.classList.remove('show');
        setTimeout(() => {
            notificacion.style.display = 'none';
        }, 500);
    }, 3000);
}


