import React, { Component } from 'react';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';

import RichTextEditor from '../forms/rich-text-editor';

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            title: "",
            blog_status: "",
            content: "",
            featured_image: "",
            apiUrl: "https://carlosterrero.devcamp.space/portfolio/portfolio_blogs",
            apiAction: "post"
        }

        this.handleChange = this.handleChange.bind(this);
        this.hendleSubmit = this.hendleSubmit.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this)

        /* Estos se encargaren de la configuracion de dropzone (receptor de imagenes) */
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.hendleFeaturedImageDrop = this.hendleFeaturedImageDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.featuredImageRef = React.createRef();
        
    }

    deleteImage(imageType) {
        axios.delete(
            `https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${this.props.blogToEdit
              .id}?image_type=${imageType}`,
            { withCredentials: true }
        ).then(response => {
           this.props.handleFeaturedImageDelete();
        })
        .catch(error => {
            console.log("deleteImage error", error)
        })
    }

    /* Este ciclo de vida detecta si es una edicion y rellena los campos con la informacion que se quiere
     editar para su posterior manejo*/
    componentWillMount(){
        if (this.props.editMode) {
            this.setState({                
                id: this.props.blogToEdit.id,
                title: this.props.blogToEdit.title,
                blog_status: this.props.blogToEdit.blog_status,
                content: this.props.blogToEdit.content,
                apiUrl: `https://carlosterrero.devcamp.space/portfolio/portfolio_blogs/${this.props.blogToEdit.id}`,
                apiAction: "patch"
            });
        }
    }

    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    hendleFeaturedImageDrop(){
        return {
            addedfile: file => this.setState({ featured_image: file })
        }
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

        if (this.state.featured_image){
            formData.append("portfolio_blog[featured_image]", this.state.featured_image);
        }

        return formData;
    }

    hendleSubmit(event) {
        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: this.buildForm(),
            withCredentials: true
            })
            .then(response => {
                if (this.state.featured_image) {
                    this.featuredImageRef.current.dropzone.removeAllFiles()
                }

                this.setState({
                    title: "",
                    blog_status: "",
                    content: "",
                    featured_image: ""
                });
            
                if (this.props.editMode) {
                    // Update blog detail
                    this.props.handleUpdateFormSubmission(response.data.portfolio_blog);
                } else {
                this.props.handleSuccessfullFormSubmission(response.data.portfolio_blog);
                }
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
                    <RichTextEditor 
                        handleRichTextEditorChange={this.handleRichTextEditorChange}
                        editMode={this.props.editMode}
                        contentToEdit={
                            this.props.editMode && this.props.blogToEdit.content
                                ? this.props.blogToEdit.content : null 
                        }
                    />
                </div>

                <div className="image-uploaders">
                    {this.props.editMode && this.props.blogToEdit.featured_image_url ?
                    ( <div className="portfolio-manager-image-wrapper">
                        <img className="img-img" src={this.props.blogToEdit.featured_image_url}/>

                        <div className="image-removal-link">
                            <a onClick={() => this.deleteImage("featured_image")}>
                                Remove file
                            </a>
                        </div>
                    </div>
                    ) : (
                    <DropzoneComponent
                        ref={this.featuredImageRef}
                        config={this.componentConfig()}
                        djsConfig={this.djsConfig()}
                        eventHandlers={this.hendleFeaturedImageDrop()}
                    >
                        <div className="dz-message">Featured Image</div>
                    </DropzoneComponent>)}
                </div>

                <button className="btn">Save</button>
            </form>
        );
    }
}