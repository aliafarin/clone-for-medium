import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import parser from "html-react-parser";
import $ from "jquery";

import "../Styles.css";
import { displayArticle } from "../../actions";
import ProfileIcons from "../ProfileIcons";

class DisplayArticle extends React.Component {

  componentDidMount() {
    this.id = this.props.params.id;
    this.props.displayArticle(this.id);
  }

  onClickLike = (e) => {
    $(e.target).css("transform", "scale(1.5)");
    $(e.target).toggleClass("like-article");
  }

  onTransitionEnd = (e) => {
    $(e.target).css("transform", "scale(1)");
  }
  
  renderArticle() {

    if(this.props.article[this.id]) {
      let article = this.props.article[this.id];

      return(
        <section id="display-article">
          <div className="articleD-item">
            <div className="articleD-info">
              <div className="articleD-title">
                <h4>{article.topic}</h4>
                <h1>{article.title}</h1>
              </div>
              <div className="articleD-date">
                {article.date}
              </div>
              <div className="articleD-desc">
                <h4>{article.description}</h4>
              </div>
              
              <div className="articleD-author">
                <img src={this.props.userImage} alt="Profile Image"/>
                <Link to="#">
                  <div className="authorD-info">
                    <div><h5>{article.authorName}</h5></div>
                    <div><p>Joined December 9</p></div>
                  </div>
                </Link>
                <ProfileIcons authorId={article.authorId} userId={this.props.userId} articleId={article.id} />
              </div>
            </div>
            <div className="articleD-image">
              <img src={require("./kristine-weilert-tLNRTxieD7k-unsplash.jpg")} />
              <p>Some Photo Taken a Long Time Ago</p>
            </div>
            <div className="articleD-content">
              {parser(article.editor)}
            </div>
          </div>
          <div className="like-icons">
            <i
            onClick={this.onClickLike}
            onTransitionEnd={this.onTransitionEnd}
            className="huge heart icon unlike-article"></i>
            <ProfileIcons authorId={article.authorId} userId={this.props.userId} articleId={article.id} />
          </div>
      </section>
      );
    }
    else{
      return("Loading...");
    }
  }

  render() {
    return(
      <React.Fragment>
        {this.renderArticle()}
      </React.Fragment>
    );
  }

}

const mapStateToProps = (state) => {
  return { article: state.articles,
      userImage: state.auth.userImage,
      userId: state.auth.userId };
} 

export default connect( mapStateToProps, {
  displayArticle
} )(DisplayArticle);