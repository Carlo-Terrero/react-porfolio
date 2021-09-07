//Componente de navegacion, el navegador
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

export default class NavigationContainet extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="nav-wrapper">
                <div className="left-side">
                    {/* Estos son los lisk de React, son muy practicos por que asi sigues tabajando 
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
                </div>

                <div className="right-side">Carlos José Terrero Méndez</div>
            </div>
        );
    }
}