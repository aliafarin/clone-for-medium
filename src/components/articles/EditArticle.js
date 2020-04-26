import React from 'react';
import { connect } from "react-redux";
import $ from "jquery";

import Form from "../Form";
import { fetchArticle, updateArticle } from "../../actions";
import Loading from "../Loading";

class EditArticle extends React.Component {

  componentDidMount() {
    this.id = this.props.params.id;
    this.props.fetchArticle(this.id);
    $("#writeEdit-indicator").text("Edit");
    $("#writeEdit-indicator").css("margin-left", "0px");
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
        <React.Fragment>
          <Loading />
        </React.Fragment>
      );
    }
  }

}

const mapStateToProps = (state) => {
  return { article: state.articles };
}

export default connect( mapStateToProps, {
  fetchArticle, updateArticle
} )(EditArticle);