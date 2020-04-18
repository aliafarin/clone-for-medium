import React from 'react';
import { connect } from "react-redux";

import "../Styles.css";
import Form from "../Form";
import { createArticle } from "../../actions";

class CreateArticle extends React.Component {

  onFormSubmit = (formValues) => {
    this.props.createArticle(formValues);
  }

  render(){

    return(
      <div id="create-article">
        <div className="page-name"><h2>Write</h2></div>
        <Form
          onSubmit={this.onFormSubmit}
          editorDefault="<p>--Start Writing--</p>"
          button="Publish" />
      </div>
    );

  }

}


export default connect(null, {
  createArticle
})(CreateArticle);