import React from 'react';
import { connect } from "react-redux"; 
import history from "../../history";

import { displayArticle, deleteArticle } from "../../actions";

class DeleteArticle extends React.Component {

  componentDidMount() {
    this.id = this.props.params.id;
    this.props.displayArticle(this.id);
  }

  onCancelDelete = (articleId) => {
    history.push(`/articles/${articleId}`);
  }

  onConfirmDelete = (articleId) => {
    this.props.deleteArticle(articleId);
  }

  renderDeleteMessage() {
    if(this.props.article[this.id]) {
      let article = this.props.article[this.id];
      return(
          <div className="deleteA-card">
            <h3>Are You Sure To Delete <span style={{"backgroundColor": "rgba(12, 242, 143, 0.4)"}}>"{article.title}"</span>?</h3>
              <div className="delete-buttons">
                <button onClick={() => this.onConfirmDelete(article.id)}to="#" className="delete-confirm">Delete</button>
                <button onClick={() => this.onCancelDelete(article.id)} to="#" className="delete-cancel">Cancel</button>
              </div>
          </div>
      );
    }
    else{
      return(
        <div>
          Loading...
        </div>
      );
    }
  }

  render() {
    return(
      <section id="delete-article"> 
        {this.renderDeleteMessage()}
      </section>
    );
  }

}

const mapStateToProps = (state) => {
  return { article: state.articles };
}

export default connect(mapStateToProps, {
  displayArticle, deleteArticle
})(DeleteArticle);