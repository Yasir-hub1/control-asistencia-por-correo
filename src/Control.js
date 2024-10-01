import './App.css';
import { useState } from 'react';
import emailjs from 'emailjs-com';

function Control() {
  const [mostrarEntrada, setMostrarEntrada] = useState(true); // Estado para alternar los botones

  // Formato de la fecha
  const formatearFecha = (fecha) => {
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
    return fecha.toLocaleString('es-ES', opciones).replace(',', ''); // Formato: día-mes-año hora
  }

  // Función para enviar correo
  const enviarCorreo = (tipo, fecha) => {
    const templateParams = {
      to_name: "BRANDON", // Puedes reemplazarlo con un nombre dinámico
      message: `Se ha registrado una ${tipo} a las ${fecha}`, // Mensaje del correo
      subject: `Registro de ${tipo}`,
    };

    // Usa tu propio User ID y Template ID desde EmailJS
    emailjs.send('service_3kngg9e', 'template_dgi2ipo', templateParams, 'pT4PH1epkwywE3vi8')
      .then((response) => {
        console.log('Correo enviado exitosamente!', response.status, response.text);
      }, (error) => {
        console.error('Error al enviar el correo:', error);
      });
  }

  // Captura de fecha y envío de correo
  const capturarFecha = (tipo) => {
    const fechaActual = new Date();
    const fechaFormateada = formatearFecha(fechaActual); // Formatear la fecha

    // Enviar correo con la fecha y tipo (entrada o salida)
    enviarCorreo(tipo, fechaFormateada);

    // Alternar los botones
    setMostrarEntrada(!mostrarEntrada);
  }

  return (
    <div className="App">
      <div style={styles.container}>
        <h3 style={styles.title}>INGRESA TU REGISTRO</h3>
        <div style={styles.buttonContainer}>
          {mostrarEntrada ? (
            <button style={styles.button} onClick={() => capturarFecha("ENTRADA")}>ENTRADA</button>
          ) : (
            <button style={styles.button} onClick={() => capturarFecha("SALIDA")}>SALIDA</button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: '20px',
    padding: '15px 30px',
    margin: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Control;
