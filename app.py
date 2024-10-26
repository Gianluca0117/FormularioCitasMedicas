from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    nombre = request.form['nombre']
    cedula = request.form['cedula']
    telefono = request.form['telefono']
    correo = request.form['correo']
    direccion = request.form['direccion']
    fecha_nacimiento = request.form['fecha_nacimiento']
    # Procesa los datos aquí (p.ej. guárdalos en una base de datos)
    return f"Paciente {nombre} registrado con éxito."

@app.route('/solicitar-certificado')
def solicitar_certificado():
    # Aquí puedes manejar la lógica para generar o descargar un certificado
    return "Funcionalidad para solicitar certificado no implementada aún."

@app.route('/agendar-cita')
def agendar_cita():
    # Aquí puedes manejar la lógica para agendar una cita
    return "Funcionalidad para agendar una cita no implementada aún."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)