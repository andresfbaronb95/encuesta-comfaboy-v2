import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Encuesta.css';
import robotImage from './images/robot.jpeg';
import printerImage from './images/3dprinter.jpeg';
import rocketGif from './images/rocket.gif';

const Encuesta = () => {
    const [respuestas, setRespuestas] = useState({});
    const [enviada, setEnviada] = useState(false);
    const [imagen, setImagen] = useState(null);
    const [mostrarGif, setMostrarGif] = useState(true);

    useEffect(() => {
        setTimeout(() => setMostrarGif(false), 3000);
    }, []);

    const preguntas = [
        { id: 1, texto: "🚀 Nombre", tipo: "texto" },
        { id: 2, texto: "🤖 Correo Electrónico", tipo: "texto" },
        { id: 3, texto: "🚀 Teléfono", tipo: "texto" },
        { id: 4, texto: "🤖 Institución Educativa", tipo: "texto" },
        { id: 5, texto: "🚀 ¿Qué experiencia previa tienes con robótica o impresión 3D? Explica si has trabajado con algún robot o impresora 3D.", tipo: "texto", imagen: robotImage },
        { id: 6, texto: "🤖 Si tu respuesta anterior fue sí, ¿Cuál robot o impresora has trabajado?", tipo: "texto", imagen: printerImage },
        { id: 7, texto: "🚀 Imagina que tienes la oportunidad de diseñar un robot para ayudar en tu escuela. ¿Cómo sería y qué funciones tendría?", tipo: "texto", imagen: robotImage },
        { id: 8, texto: "🤖 Explica cómo crees que funciona una impresora 3D", tipo: "texto", imagen: printerImage },
        { id: 9, texto: "🚀 ¿Crees que la impresión 3D y la robótica pueden trabajar en conjunto?", tipo: "texto", imagen: robotImage },
        { id: 10, texto: "🤖 ¿Cuál de los siguientes programas crees que se usa para programar robots en educación?", tipo: "opcion", opciones: ["Microsoft Word", "mBlock", "Photoshop", "Excel"], imagen: robotImage },
        { id: 11, texto: "🚀 ¿Para qué crees que se usa principalmente la impresión 3D en la actualidad?", tipo: "opcion", opciones: ["Crear juguetes y figuras decorativas", "Prototipado de productos y piezas funcionales", "Para arte y diseño", "Todas las anteriores"], imagen: printerImage },
        { id: 12, texto: "🤖 ¿Qué tipo de material se usa más comúnmente en la impresión 3D educativa?", tipo: "opcion", opciones: ["Papel", "Madera", "PLA", "Aluminio"], imagen: printerImage },
        { id: 13, texto: "🚀 ¿Cuál de los siguientes no es un Robot Educativo?", tipo: "opcion", opciones: ["CodeyRocky", "VinciBot", "ABS", "mBot"], imagen: robotImage },
        { id: 14, texto: "🤖 ¿Cuál de la siguiente es una parte de la impresora 3D?", tipo: "opcion", opciones: ["Escáner", "Tinta", "Rodillo", "Boquilla"], imagen: printerImage }
    ];

    const manejarCambio = (id, valor, img) => {
        setRespuestas({ ...respuestas, [id]: valor });
        setImagen(img);
    };

    const enviarRespuestas = async () => {
        const scriptURL = "https://script.google.com/macros/s/AKfycbzjY6rINDPTLD5KgdAf140jRWp2Ij0hJaVJC9sSeHGfP0P052kAceEmGbxKrakvEzrz/exec";
        
        const datos = {};
        preguntas.forEach((p) => {
            datos[p.id] = respuestas[p.id] || "";
        });
    
        try {
            await fetch(scriptURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos),
            });
            setEnviada(true);
        } catch (error) {
            console.error("Error al enviar:", error);
        }
    };

    return (
        <div className="container encuesta-container">
            {mostrarGif && <img src={rocketGif} alt="Rocket" className="cohete-gif animacion-cohete" />}
            <h1 className="text-center encuesta-titulo">Encuesta Escuela COMFABOT Tunja 🚀 </h1>
            {!enviada ? (
                <div>
                    {preguntas.map((pregunta) => (
                        <div key={pregunta.id} className="pregunta-container fade-in">
                            <p className="pregunta-texto">{pregunta.texto}</p>
                            {pregunta.tipo === "texto" ? (
                                <input
                                    type="text"
                                    className="form-control input-animado"
                                    onChange={(e) => manejarCambio(pregunta.id, e.target.value, pregunta.imagen)}
                                />
                            ) : (
                                <div className="opciones-container">
                                    {pregunta.opciones.map((opcion, index) => (
                                        <button
                                            key={index}
                                            className={`btn btn-opcion ${respuestas[pregunta.id] === opcion ? 'seleccionado' : ''}`}
                                            onClick={() => manejarCambio(pregunta.id, opcion, pregunta.imagen)}
                                            style={{ backgroundColor: respuestas[pregunta.id] === opcion ? '#ff7300' : '#007bff', color: 'white' }}
                                        >
                                            {opcion}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    {imagen && <div className="imagen-respuesta slide-in"><img src={imagen} alt="Visual" /></div>}
                    <button className="btn btn-primary btn-enviar pulse" style={{ backgroundColor: '#ff7300', borderColor: '#ff7300' }} onClick={enviarRespuestas}>Enviar Encuesta</button>
                </div>
            ) : (
                <div className="text-center mensaje-enviado zoom-in">
                    <h2>¡Gracias por participar!</h2>
                    <p>Tu encuesta ha sido enviada.</p>
                </div>
            )}
        </div>
    );
};

export default Encuesta;

    ;
;


