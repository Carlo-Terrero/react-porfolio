/* Esto es un componente de clase */
import React, { Component } from "react";
import axios from "axios";//Con esta biblioteca accedemos a la API.

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {

    /* Solo puede haber 1 constructor por componente clase */
    constructor(){
        super();/* hay que llamar al padre que es component (que no se te olvide) */

        this.state = {
            pageTitle: "Bienvenido a mi portfolio",
            isLoading: false,
            /* Dejamos data vacio para meterle los datos de la API */
            data: [
               
            ]
        };

        /* Recuerda que con esto podemos hacer referencia a este codigo
        dentro de la clase. Siempre ponlo para que no te de error al llamar al metodo*/
        this.handleFilter = this.handleFilter.bind(this);
    }

    //Con esta funcion hacemos un filtro de lo seleccionado con los botones
    handleFilter(filter){
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            })
        });
    }

    /*Con este metodo tratamos los datos de la api.Es un copyPast de los ejemplos
    de esta biblioteca que esta en npm.com */
    getPortfolioItems(){
        axios
        .get("https://carlosterrero.devcamp.space/portfolio/portfolio_items")
        .then(response => {
            
            this.setState({
                /*Aqui accedemos atraves de response a los data.portfolio_items de la api  */
                data: response.data.portfolio_items
            });
        })
        .catch(error => {
            console.log(error);
        })
    }

    /* Funcion personalizada. En esta funcion se itera sobre los datos(objetos) que tenemos. 
    Vamos es la cumpable de que se repitan uno debajo de otro sin repetir ningun codigo */
    PortfolioItems() {     
        return this.state.data.map(item => {
            /* debugger; puede hacer lo mismo que el consol.log pero mostrando de 1 en 1 y derectamente poniendo 
            el nombre de la variable de iteracion en la consola
            ---> En consola si ponemos object.keys(nomVarIteracion) nos devuelve lo que necesitamos.
            */

            /*console.log("Datos de respuesta en item", item); Esto nos sirve para saber como se llaman los
            campos que contiene los datos y asi poder acceder a ellos como hacemos en el proximo return. */

            /* return <h2>{item.datoRequerido}</h2> de esta manera mostramos directamente los datos de la matriz.
            Aquí despues de llamar al hijo le añadimos los atributos como title, etc...
            Ahora los nombres despues de item.etc tiene que coincidir con como optienes los datos en este 
            caso es una api*/
            return (
                <PortfolioItem 
                    key={item.id} 
                    item={item} /* de esta manera pasamos el objeto completo */
                />
            );
        });
    }

    /* ciclos de vida o hooks: hay que mirarlos, este es uno de muchos */
    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        //Esto lo que hace es pausar aqui a render
        if(this.state.isLoading) {
            return <div>Loading...</div>
        }
        
        return (    
            <div className="portfolio-items-wrapper">
                {/* Con JS la llamada a la funciones a traves de clic se hacen de esta manenera
                en caso de que sean con argumentos. Si son sin argumentos no se utilizas ningun
                parentesis. */}
                <button className="btn" onClick={() => this.handleFilter("eCommerce")}>eCommerce</button>
                <button className="btn" onClick={() => this.handleFilter("Scheduling")}>Scheduling</button>
                <button className="btn" onClick={() => this.handleFilter("Enterprise")}>Enterprise</button>

                    {/* llamamos a la funcion personalizada */}
                    {this.PortfolioItems()} 
            </div>
        );
    }
}