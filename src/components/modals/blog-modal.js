import React, { Component } from 'react';
import ReactModal from 'react-modal';

import BlogForm from "../blog/blog-form";

ReactModal.setAppElement(".app-wrapper");/*Este componente es el popap */

export default class BlogModal extends Component {
    constructor(props) {
        super(props);

        /* Añadiremos los styles aqui(es como si lo pasaramos en linea), esta informacion se encuentrea en la documentacion*/
        this.customStyles = {
            content: {
                top: "50%",
                left: "50%",
                right: "auto",
                marginRignht: "-50%",
                transform: "translate(-50%, -50%)",
                width: "800px",
                height: "75%"
            },
            overlay: {
                backgroundColor: "rgba(1, 1, 1, 0.75)"
            }
        }

        this.handleSuccessfullFormSubmission = this.handleSuccessfullFormSubmission.bind(this);
    }

    handleSuccessfullFormSubmission(blog) {
        this.props.handleSuccessfulNewBlogSubmission(blog);
    }

    render() {
        return (
            <ReactModal 
            style={this.customStyles}
            /*El atributo onRequestClose se encarga de cerrar el modal/popap
            ya sea dando click fuera o dandole a esc (destro necesita una funcion) */
            onRequestClose={() => {this.props.handleModalClose()}}
            isOpen={this.props.modalIsOpen}
            >
            
            <BlogForm handleSuccessfullFormSubmission={this.handleSuccessfullFormSubmission}/>
            </ReactModal>
        );
    }
}