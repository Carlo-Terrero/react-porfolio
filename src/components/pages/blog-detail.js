import React, { Component } from 'react';
import axios from 'axios';
/* Con esta bliblioteca, el texto se que guardaba como html es limpiado se muestra normal */
import ReactHtmlParser from "react-html-parser";

import BlogFeaturedImage from "../blog/blog-featured-image";

export default class BlogDetail extends Component {
    constructor (props){
        super(props);

        this.state = {
            currentId: this.props.match.params.slug,
            blogItem: {}
        };
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

        return (
            <div className="blog-container">
                <div className="content-container">
                    <h1>{title}</h1>

                    {/*Se encarga de renderizar,pasamos la imagen
                    para que la muestre si la hay*/}
                    <BlogFeaturedImage img={featured_image_url}/>

                    <div className="content">
                        {ReactHtmlParser(content)} {/* la biblioteca funciona como una funcion */}
                    </div>
                </div>
            </div>
        );
    }
}