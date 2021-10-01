// Este es el componente de editor de texto enriquesido
import React, { Component } from "react";
// Para el editor de texto enriquesido, tienes que instalar e importar los siguientes componentes
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export default class RichTextEditor extends Component {
    constructor(props) {
        super(props);
        
        //El editor tiene su propio estado con funciones
        this.state = {
            editorState: EditorState.createEmpty()
        }

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    componentWillMount() {
        if (this.props.editMode && this.props.contentToEdit) {
            const blocksFromHtml = htmlToDraft(this.props.contentToEdit);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(
                contentBlocks,
                entityMap
            );
            const editorState = EditorState.createWithContent(contentState);
            this.setState({ editorState });
        }
    }

    //Coge el estado del editor como argumento y dentro se encarga de tomar lo que se escribe e implantarlo
    onEditorStateChange(editorState){
        /*al ponerle dos argumentos (como vemos en la documentacion) resovemos
        el problema asincrono */
        this.setState({ editorState }, 
            this.props.handleRichTextEditorChange(
                draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
            )
        );
    }

    /* Se encarga de pasar el archivo img a texto para poder guardalo */
    getBase64(file, callback) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callback(reader.result);
        reader.onerror = error => {};
    }

    uploadFile(file) {
        return new Promise((resolve, reject) => {
            this.getBase64(file, data => resolve({ data: { link: data } }));
        });
    }

    render() {
        return (
            <div>
                <Editor editorState={this.state.editorState}
                /* Estos nombres se una de las bibliotecas que importamos, con los cual si son importantes */
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
                /* Aqui estamos estilizando la barra de props(iconos) del 
                cajon de texto*/
                toolbar={{
                    inline: {inDropdown: true},
                    list: {inDropdown: true},
                    textAlign: {inDropdown: true},
                    link: {inDropdown: true},
                    history: {inDropdown: true},
                    /* aqui se gestiona las imagenes que se pueden poner dentro del
                    area del texto */
                    image: {
                        uploadCallback: this.uploadFile,
                        alt: { present: true, mandatory: false },
                        previewImage: true,
                        inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg"
                      }
                }}
                />
            </div>
        );
    }
}