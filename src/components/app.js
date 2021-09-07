import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from "axios";
import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import PortfolioDetail from "./profolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this)
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

  checkLoginStatus() {
    return axios
      .get("https://api.devcamp.space/logged_in", { 
      withCredentials: true
    })
    .then(response => {
      //Cuando optenemos la respuesta de la api, comprobamos el estado.
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;

      if (loggedIn && loggedInStatus === 'LOGGED_IN') {
        return loggedIn;
      } else if (loggedIn && loggedInStatus === 'NOT_LOGGED_IN') {
        this.setState({
          loggedInStatus: "LOGGED_IN"
        });
      } else if (!loggedIn && loggedInStatus === 'NOT_LOGGED_IN') {
        this.setState({
          loggedInStatus: "LOGGED_IN"
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

  render() {
    return (
      <div className='container'>
        <Router>
          <div>      
            <NavigationContainer />

            <h2>{this.state.loggedInStatus}</h2>

            {/* Con esto lo que hacemos es marcar un orden en el cual se muestren los componentes,
            el primero se mostrará cuando iniciemos la app y los siguentes cuando los seleccionemos
            en el navegador. En este caso Switch es una estructura de cambio y no como en programacion
            normal como se utiliza.En este caso va banado hata que encuenrea una coincidencia de url 
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

              {/* <Route path="/auth" component={Auth} /> */}
              <Route path="/about-me" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/blog" component={Blog} />
              {/* Colocamos exact aqui para que no sea alterado de ninguna manera en la wep */}
              <Route exact path="/portfolio/:slug" component={PortfolioDetail} />
              <Route path="/blog" component={Blog} />
              <Route component={NoMatch} /> {/* Este es por si ponen una url inexistente en la app,
              que llame directamente a este componente */}
            </Switch>
          </div>
        </Router>
        
      </div>
    );
  }
}
