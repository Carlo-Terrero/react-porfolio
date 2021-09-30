// Este es el componente de editor de texto enriquesido
import React, { Component } from "react";
// Para el editor de texto enriquesido, tienes que instalar e importar los siguientes componentes
import { EditorState, covertToRaw, convertToRaw } from "draft-js";
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

    render() {
        return (
            <div>
                <Editor editorState={this.state.editorState}
                /* Estos nombres se una de las bibliotecas que importamos, con los cual si son importantes */
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        );
    }
}