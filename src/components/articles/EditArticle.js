import React from 'react';
import { connect } from "react-redux";

import "../Styles.css";
import Form from "../Form";
import { displayArticle, updateArticle } from "../../actions";

class EditArticle extends React.Component {

  componentDidMount() {
    this.id = this.props.params.id;
    this.props.displayArticle(this.id);
  }

  onFormSubmit = (formValues) => {
    this.props.updateArticle(this.id, formValues);
  }

  render() {
    if( this.props.article[this.id] ) {
      let article = this.props.article[this.id];
      return(
        <div>
          <div className="page-name"><h2>Edit</h2></div>
          <Form
           onSubmit={this.onFormSubmit}
           initialValues={article}
           editorDefault = {article.editor}
           button="Update"
           id={this.id}
          />
        </div>
      );
    }
    else {
      return(
        <div>
          Loading ...
        </div>
      );
    }
  }

}

const mapStateToProps = (state) => {
  return { article: state.articles };
}

export default connect( mapStateToProps, {
  displayArticle, updateArticle
} )(EditArticle);