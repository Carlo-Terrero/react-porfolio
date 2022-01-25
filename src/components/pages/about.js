import React from 'react';
import myImg from "../../../static/assets/image/auth/perfil/devtrunk.jpg"

export default function() {
    return (
        <div className="content-wrapper">
            <div 
                className="left-wrapper" 
                style={{ 
                    backgroundImage: `url(${myImg})`
                }} 
            >
            </div>

            <div className="right-wrapper">
                <h1>Sobre mí</h1>

                <p>
                    Busco mi primera experiencia laboral como desarrollador, preferiblemente de 
                    Frontend, Backend o Full stack.
                </p>

                <p>
                    Empecé en el mundo del desarrollo por la inquietud de conocer qué hay detrás 
                    de la creación de un programa informático y descubrí que es algo con lo que 
                    de verdad disfruto y a lo que me encantaría dedicarme profesionalmente. 
                    Crear apps, webs y herramientas funcionales para mejorar, automatizar o poner 
                    en marcha un ecommerce es como un sueño cumplido. 
                </p>

                <p>
                    Me gustan los retos, trabajar en equipo, aunque también disfruto de afrontar 
                    desafíos en solitario y ver como logro mis objetivos; soy persistente, 
                    carismático y responsable.
                </p>


            </div>
        </div>
    )
}