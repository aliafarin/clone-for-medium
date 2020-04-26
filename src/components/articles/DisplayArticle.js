import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import parser from "html-react-parser";
import $ from "jquery";

import { fetchArticle } from "../../actions";
import ProfileIcons from "../ProfileIcons";
import Loading from "../Loading";

class DisplayArticle extends React.Component {

  componentDidMount() {
    $("#writeEdit-indicator").css("margin-left", "-100px");
    this.id = this.props.params.id;
    this.props.fetchArticle(this.id);
  }

  //add scroll event listener when the state updates (the aticle is in state)
  componentDidUpdate() {
    window.addEventListener("scroll", this.onProgress);
  }

  getReadingTime = () => {
    let articleWords = this.props.article[this.id].editor.split(" ");
    let minutesToRead = Math.ceil(articleWords.length / 265);
    
    return minutesToRead;
  }

  onClickLike = (e) => {
    $(e.target).css("transform", "scale(1.5)");
    $(e.target).toggleClass("like-article");
  }

  onTransitionEnd = (e) => {
    $(e.target).css("transform", "scale(1)");
  }

  //progress bar functionality
  onProgress = () => {

    let articleContent = document.getElementsByClassName("articleD-content")[0];
    let coords = articleContent.getBoundingClientRect();
    let top = coords.y;
    let articleHeight = coords.height;
    let windowHeight = document.documentElement.clientHeight;

    //show progress bar when window reaches article content
    if( (windowHeight + window.pageYOffset) > top ) {
      $("progress").css("display", "block");
      let currentProgress =  Math.floor((windowHeight - top) / articleHeight * 100);
      $("progress").val(currentProgress);
    }

    //hide progress bar when window go back to the beginning of page 
    else if( (windowHeight + window.pageYOffset) <= top) {
      $("progress").css("display", "none");
    }

    //hide progress bar when window passes article content
    if( windowHeight - coords.bottom - 200 > 0 ) {
      $("progress").css("display", "none");
    }
  
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onProgress);
  }
  
  renderArticle() {

    if(this.props.article[this.id]) {
      let article = this.props.article[this.id];

      return(
        <section id="display-article">
          <div className="articleD-item">
            <div className="articleD-info">
              <div className="articleD-title">
                <span className="articleD-topic"><h4><i className="slack hash icon"></i>{article.topic}</h4></span>
                <h1>{article.title}</h1>
              </div>
              <div className="articleD-date">
                {article.publishedAt} 
              </div>
              <div className="articleD-desc">
                <h4>{article.description}</h4>
              </div>
              
              <div className="articleD-author">
                <img src={article.authorImage} alt="Profile Image"/>
                <Link to="#">
                  <div className="authorD-info">
                    <div><h5>{article.authorName}</h5></div>
                    <b><span style={{color: "rgba(46, 112, 41, 1)", fontSize: "15px"}}>{this.getReadingTime()} Minutes Read</span></b>
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
            className="huge heart icon notliked-article"></i>
            <ProfileIcons authorId={article.authorId} userId={this.props.userId} articleId={article.id} />
          </div>
      </section>
      );
    }
    else{
      return(
        <React.Fragment>
          <Loading />
        </React.Fragment>
      );
    }
  }

  render() {
    return(
      <React.Fragment>
        {this.renderArticle()}
        <progress id="progress-bar" value="0" max="100"></progress>
      </React.Fragment>
    );
  }

}

const mapStateToProps = (state) => {
  return { article: state.articles,
      userId: state.auth.userId };
} 

export default connect( mapStateToProps, {
  fetchArticle
} )(DisplayArticle);