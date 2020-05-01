import React from 'react';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

class EditorComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(`${this.props.editorDefault}`)  
        )
      )
    };
    this.props.onChange(
      draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    );
  }

  onEditorStateChange = (editorState) => {
    const { onChange, value } = this.props;

    const newValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    if (value !== newValue) {
      onChange(newValue);
    }

    this.setState({
      editorState
    });
  };

  //renders possible redux form validate errors
  renderError(){

    if(this.props.touched && this.props.error) {
      return(
        <ul style={{color: "#b30000"}}>
          <li><h3>{this.props.error}</h3></li>
        </ul>
      );
    }
    
  }


  render(){

    return(
        <React.Fragment>
          <Editor 
            name="editor"
            editorState={this.state.editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            editorStyle={{ height: "300px", 
            border: "solid 0.1px rgba(0, 0, 0, 0.1)", padding: "10px", fontSize: "25px", lineHeight: "40px"}}
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded'/*, 'emoji'*/, 'image', 'remove', 'history'],
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true }
            }}
          />
          {this.renderError()}
        </React.Fragment>
    );
  }

}


export default EditorComponent;
