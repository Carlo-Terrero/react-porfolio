import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from "axios";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioDetail from "./portfolio/portfolio-detail";
import PortfolioManager from "./pages/portfolio-manager";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";
import Icons from "../helpers/icons"; /* importamos los iconos */

export default class App extends Component {
  constructor(props) {
    super(props);

    /* Inicializamos los iconos al ejecutar la app */
    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin(){
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnsuccessfulLogin(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  handleSuccessfulLogout(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  checkLoginStatus() {
    return axios
      .get("https://api.devcamp.space/logged_in", { 
      withCredentials: true
    })
    .then(response => {
      //Cuando optenemos la respuesta de la api, comprobamos el estado.
      //console.log("logged_in return", response)
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;

      if (loggedIn && loggedInStatus === "LOGGED_IN") {
        return loggedIn;
      } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN"
        });
      } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN"
        });
      }
    }) 
    .catch(error => {
      console.log("Error", error);
    })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  //Paginas autorizadas solo se podra acceder a estas pg los que esten logeados
  // se comprueba con un operador ternario.
  authorizedPages() {
    return [  <Route key="portfolio-manager" path="/portfolio-manager" component={PortfolioManager} />]
  }

  render() {
    return (
      <div className='container'>
        <Router>
          <div>      
            <NavigationContainer 
              loggedInStatus={this.state.loggedInStatus}
              handleSuccessfulLogout={this.handleSuccessfulLogout}  
            />


            {/* Con esto lo que hacemos es marcar un orden en el cual se muestren los componentes,
            primero se muestrael menos restrictivo. Los siguentes cuando los seleccionemos
            en el navegador. En este caso Switch es una estructura de cambio y no como en programacion
            normal como se utiliza.En este caso va bajando hasta que encuentre una coincidencia de url 
            para mostrar.*/}
            <Switch>
              <Route exact path="/" component={Home} />

              {/* con esto lo que hacemos es que le damos la capacidad a auth de poder acceder esas funciones 
              que le pasamos que estan en app para influir en el estado. */}
              <Route 
                path="/auth" 
                render={props => (
                  <Auth 
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )}        
              />
              {/* Route lo que hace es enviar props al componente. */}
              <Route path="/about-me" component={About} />
              <Route path="/contact" component={Contact} />

              <Route 
                path="/blog"  
                render={props => (
                  <Blog {...props} loggedInStatus={this.state.loggedInStatus}/>
                )}
              />

              <Route 
                path="/b/:slug" 
                render={props => (
                  <BlogDetail
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                  />
                )}              
              />
              
              {this.state.loggedInStatus === "LOGGED_IN" ? 
                this.authorizedPages(                  
              ) : null }            

              {/* Colocamos exact aqui para que no sea alterado de ninguna manera en la wep */}
              <Route exact path="/portfolio/:slug" component={PortfolioDetail} />
              
              {/* Este es por si ponen una url inexistente en la app,
              que llame directamente a este componente */}
              <Route component={NoMatch} /> 

            </Switch>
          </div>
        </Router>
        
      </div>
    );
  }
}
