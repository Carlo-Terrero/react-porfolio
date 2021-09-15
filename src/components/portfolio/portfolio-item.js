/* Esto es un componenete funcional */
import React, { Component } from "react";

/* Los props son objetos a los cuales puedes acceder a su lista cuando las declares 
en la funcion padre(contenedor-portfolio) */
export default class PortfolioItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            portfolioItemClass: ""
        };
    }

    /* Oyentes de eventos(lo que se ejecuta cuando se activa el oyente). 
    handle se pone siempre delante de metodo, es una estandarizacion para saber 
    mas rapido que hece el codigo. */
    handleMouseEnter(){
        this.setState({ portfolioItemClass: "image-blur" });
    }

    handleMouseLeave(){
        this.setState({ portfolioItemClass: "" });
    }

    render() {
        /* esto es la desestruturacion, cogemos un objeto y cada parte de este la metemos
        en una variable */
        const {id, description, thumb_image_url, logo_url} = this.props.item;
        return (
            <div 
                className="portfolio-item-wrapper"
                onMouseEnter={() => this.handleMouseEnter()}
                onMouseLeave={() => this.handleMouseLeave()}
            >
                {/* Esta imagen se usa en background, por eso le estamos dando style en jsx */}
                <div 
                    className={"portfolio-img-background " + this.state.portfolioItemClass}
                    style={{
                        backgroundImage: "url(" + thumb_image_url + ")"
                    }}
                />

                <div className="img-text-wrapper">
                    <div className="logo-wrapper">
                        <img src={logo_url} />
                    </div>

                    <div className="subtitle">{description}</div>
                </div>
            </div>
        );
    }
}

