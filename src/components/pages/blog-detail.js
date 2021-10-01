import React, { Component } from 'react';
import axios from 'axios';
/* Con esta bliblioteca, el texto se que guardaba como html es limpiado se muestra normal */
import ReactHtmlParser from "react-html-parser";

import BlogForm from "../blog/blog-form";
import BlogFeaturedImage from "../blog/blog-featured-image";

export default class BlogDetail extends Component {
    constructor (props){
        super(props);

        this.state = {
            currentId: this.props.match.params.slug,
            blogItem: {},
            editMode: false
        };

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleFeaturedImageDelete = this.handleFeaturedImageDelete.bind(this);
        this.handleUpdateFormSubmission = this.handleUpdateFormSubmission.bind(this);
    }

    handleUpdateFormSubmission(blog) {
        this.setState({
            blogItem: blog,
            editMode: false
        })
    }

    /* Esta funcion es la que se encarga de eliminar la imagen */
    handleFeaturedImageDelete() {
        this.setState({
            blogItem: {
                featured_image_url: ""
            }
        })
    }

    /* Esta funcion se ocupara de permitir actualizar el contenido del blog con un click */
    handleEditClick() {
        console.log("Estamos al aire");
        this.setState({ editMode: true});
    }

    getBlogItem(){
        axios.get(`https://carlosterrero.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`
        )
        .then(response => {
            this.setState({
                blogItem: response.data.portfolio_blog
            })
        })
        .catch(error => {
            console.log("getBlogItem error", error)
        })
    }

    componentDidMount(){
        this.getBlogItem();
    }
    
    render() {
        const {
            title,
            content,
            featured_image_url,
            blog_status
        } = this.state.blogItem;

        /* Gestiona el cambio de estado, se encarga de abrir el editor del blog o mostrarlo segun sea el estado */
        const contentManager = () => {
            if (this.state.editMode) {
                /* le pasamos el estado utilizarlo en BlogForm y el blog a editar*/
                return (<BlogForm 
                            handleFeaturedImageDelete={this.handleFeaturedImageDelete} 
                            handleUpdateFormSubmission={this.handleUpdateFormSubmission}
                            editMode={this.state.editMode} 
                            blogToEdit={this.state.blogItem}
                        />)
            } else {
                return (
                    <div className="content-container">
                        <h1 onClick={this.handleEditClick}>{title}</h1>

                        {/*Se encarga de renderizar,pasamos la imagen
                        para que la muestre si la hay*/}
                        <BlogFeaturedImage img={featured_image_url}/>

                        <div className="content">
                            {ReactHtmlParser(content)} {/* la biblioteca funciona como una funcion */}
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="blog-container">
                {contentManager()}
            </div>
        );
    }
}