import React from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";

import EditorFieldComponent from "./EditorFieldComponent";
import { topics } from '../Topics';

class Form extends React.Component {

  renderError(meta) {
    if( meta.touched && meta.error ){
      return(
        <ul style={{color: "#b30000"}}>
          <li><h3>{meta.error}</h3></li>
        </ul>
      ); 
    } 
  }

  inputComponent = (formProps) => {
    return(
      <div className={formProps.className}> 
        <input {...formProps.input} placeholder={formProps.placeholder} />
        {this.renderError(formProps.meta)}
      </div>
    );
  } 

  imageComponent = (formProps) => {
    return(
      <div className="article-image">
        <span><i className="large camera icon"></i></span>
        <input type="url" {...formProps.input} placeholder="image url ..." required />
      </div>
    );
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  } 

  //specify which buttons to be used
  renderFormButtons() {
    let buttonClassName;
    let cancelLink;
    let cancelName;
    if(this.props.button === "Publish") {
      buttonClassName = "publish-button";
      cancelLink = "/articles";
      cancelName = "Cancel"; 
    }
    else {
      buttonClassName = "publish-button edit-button";
      cancelLink = `/articles/${this.props.id}`;
      cancelName = "Discard Changes";
    }
    return(
      <React.Fragment>
        <button className={buttonClassName} type="submit" value="Submit">{this.props.button}</button>
        <Link className="cancel-button" to={cancelLink}>
          {cancelName}
        </Link>.
      </React.Fragment>  
    );
  }

  renderTopics = () => {
    return topics.map((topic) => {
      return(
        <option value={topic}>{topic}</option>
      );
    });
  }

  render() {
    return (
      <div className="editor-form">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete="off">
          <div className="g-container">
            <Field name="title" className="form-input" type="text" placeholder="Title" component={this.inputComponent} />
            <Field name="topic" className="select-css" required component="select">
              <option value="">Choose a Topic</option>
              {this.renderTopics()}
            </Field>
            <Field name="description" className="desc" type="text" placeholder="What is your article about ?" component={this.inputComponent} />
          </div>
          <Field name="image" type="text" component={this.imageComponent} />
          <Field name="editor" type="text" component={EditorFieldComponent} editorDefault={this.props.editorDefault} />
          <div className="form-buttons">
            {this.renderFormButtons()}
          </div>
        </form>
      </div>
  )};

}

const validate = (formValues) => {
  const errors = {};

  if( formValues.title ) {
    if( formValues.title.length < 10 ) {
      errors.title = "Your Title must be longer.";
    }
    else if( formValues.title.length > 60 ) {
      errors.title = "Your Title is longer than allowed."
    }
  }

  if( formValues.description ) {
    if( formValues.description.length < 10 ) {
      errors.description = "Your Description must be longer.";
    }
    else if( formValues.description.length > 140 ) {
      errors.description = "Your Description is longer than allowed."
    }
  }

  if( formValues.editor ) {
    if( formValues.editor.length < 1000 ) {
      errors.editor = "Your Article must be longer.";
    }
    else if( formValues.editor.length > 30000 ) {
      errors.editor = "Your Article is longer than allowed."
    }
  }

  return errors;
}


export default reduxForm({
  form: "editorForm",
  validate
})(Form);

