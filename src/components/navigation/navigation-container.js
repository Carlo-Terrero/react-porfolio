//Componente de navegacion, el navegador
import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router"; // componente de alto orden en minucula.
import { NavLink } from "react-router-dom"; // esto es un componente.

const NavigationContainer = props => {
   
    const dynamicLink = (route, linkText) => {
        return (
            <div className="nav-link-wrapper">
                <NavLink to ={route} activeClassName="nav-link-active">
                    {linkText}
                </NavLink>
            </div>
        );
    };

    //Con esta funcion hacemos posible cerrar session.
    const handleSigOut = () => {
        axios.delete("https://api.devcamp.space/logout", { withCredentials: true })
        .then(response => {
            if (response.status === 200){
                props.history.push("/");
                props.handleSuccessfulLogout();
            }
            return response.data;
        }).catch(error => {
            console.log("Error signing out", error);
        })
            
    };

    return (
        <div className="nav-wrapper">
            <div className="left-side">
                {/* Estos son los links de React, son muy practicos por que asi sigues tabajando 
                de forma dinamica como una unica pagina(Lo cual lo es) y que no se recargue. */}
                <div className="nav-link-wrapper">
                    <NavLink exact to ="/" activeClassName="nav-link-active">Home</NavLink>
                </div>

                <div className="nav-link-wrapper">
                    <NavLink to ="/about-me" activeClassName="nav-link-active">About</NavLink>
                </div>

                <div className="nav-link-wrapper">
                    <NavLink to ="/contact" activeClassName="nav-link-active">Contact</NavLink>
                </div>

                <div className="nav-link-wrapper">
                <NavLink to ="/blog" activeClassName="nav-link-active">Blog</NavLink>
                </div>

                {props.loggedInStatus === "LOGGED_IN" ? (
                    dynamicLink("/portfolio-manager", "PortfolioManager")
                ) : null}
                
            </div>

            <div className="right-side">
                CARLOS JOSÉ TERRERO MÉNDEZ
            
                {props.loggedInStatus === 'LOGGED_IN' ? <a onClick={handleSigOut}>
                    <FontAwesomeIcon icon="sign-out-alt"/>                    
                    </a> 
                    : null }
            </div>
            
        </div>
    );
}

/* para usar withRouter lo tienes que pasar como una funcion por defecto 
y como argumento le pasamos el componente funcional que hemos creado. */
export default withRouter(NavigationContainer);