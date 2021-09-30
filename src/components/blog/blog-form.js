import React, { Component } from 'react';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';

import RichTextEditor from '../forms/rich-text-editor';

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            blog_status: "",
            content: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.hendleSubmit = this.hendleSubmit.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this)
        this.componentConfig = this.componentConfig.bind(this);
    }

    handleRichTextEditorChange(content){
        //Esta sintaxis es la misma que la que hacemos siempre
        this.setState({ content });
    }

    buildForm() {
        let formData = new FormData();

        formData.append("portfolio_blog[title]", this.state.title);
        formData.append("portfolio_blog[blog_status]", this.state.blog_status);
        formData.append("portfolio_blog[content]", this.state.content);

        return formData;
    }

    hendleSubmit(event) {
        axios
            .post("https://carlosterrero.devcamp.space/portfolio/portfolio_blogs", 
                this.buildForm(),
                { withCredentials: true }
                )
                .then(response => {
                    this.setState({
                        title: "",
                        blog_status: "",
                        content: ""
                    });

                    this.props.handleSuccessfullFormSubmission(response.data.portfolio_blog);
                })
                .catch(error => {
                    console.log("handleSubmit for blog error", error);
                });

        event.preventDefault();
    }

    /* Esta funcion se encargade de los cambios en los input y gestiona que se guarden
    los datos. La sintaxis de dentro es universal para cualquier campo que se maneje,
    así se evita poner una linea de codigo por cada campo.
    */
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.hendleSubmit} className="blog-form-wrapper">
                <div className="two-column">
                    <input 
                        type="text"
                        onChange={this.handleChange}  
                        name="title"
                        placeholder="Blog Title"
                        value={this.state.title}
                    />
                
                    <input 
                        type="text"
                        onChange={this.handleChange}  
                        name="blog_status"
                        placeholder="Blog status"
                        value={this.state.blog_status}
                    />
                </div>

                <div className="one-column">
                    <RichTextEditor handleRichTextEditorChange={this.handleRichTextEditorChange}/>
                </div>

                <button className="btn">Save</button>
            </form>
        );
    }
}