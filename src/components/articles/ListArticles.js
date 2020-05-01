import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import $ from "jquery";

import "../../Styles/index.css";
import Loading from "../Loading";
import { listArticles, listArticlesOnTopic } from "../../actions";

class ListArticles extends React.Component {

  componentDidMount() {
    this.props.listArticles();
    $("#writeEdit-indicator").css("margin-left", "-100px");
  }

  onMouseEnterArticle = (e) => {
    if(e.target.className === "dark-overlay") {
      $(e.target).css("opacity", "1");
    }
  }

  onMouseLeaveArticle = () => {
    $(".dark-overlay").css("opacity", "0");
  }

  //fade the deleted article message
  fadeDeletedMessage = () => {
    $(".deletedA-m").css("opacity", "0");
    setTimeout( () => $(".deletedA-m").css("display", "none"), 5000 );
  }

  //get appropriate articles on topic select
  onTopicSelect = (e) => {
    if(e.target.className === "topic-menu") {
      $(".topic-select").removeClass("topic-select");
      $(e.target).addClass("topic-select");
      if($(e.target).text() === "All") {
        this.props.listArticles();
      }
      else {
        this.props.listArticlesOnTopic($(e.target).text());
      }
    }
  }

  renderList() {
    
    if(this.props.articles.length !== 0) {
      //show the newest articles on top
      //sort descending
      this.props.articles.sort((a, b) => b.id - a.id);
      return this.props.articles.map((article) => {
        if(!article) {
          {this.fadeDeletedMessage()}
          return(
            <div className="deletedA-m">
              <i className="red large trash alternate icon"></i>
            </div>
            );
        }
        return(
          <div 
            key={article.id}
            className="article-item"
            onMouseLeave={this.onMouseLeaveArticle}>
              <Link className="article-order" to={`/articles/${article.id}`}>
                <div
                className="dark-overlay"
                onMouseEnter={(e) => this.onMouseEnterArticle(e)}
                onMouseOver={(e) => this.onMouseEnterArticle(e)}>
                    <i className="huge arrow circle right icon"></i>
                </div>
                <div className="article-info">
                  <div className="article-topic"><h4>{article.topic}</h4></div>
                  <div className="article-title"><h3>{article.title}</h3></div>
                  <div className="article-desc">{article.description}</div>
                  <div className="article-author"><h5>{article.authorName}</h5></div>
                  <div className="article-date"><p>{article.publishedAt}</p></div>
                </div>
              </Link>
              <div className="article-img"><img src={require("./kristine-weilert-tLNRTxieD7k-unsplash.jpg")} /></div>
          </div>
        );
      });
    }

    else {
      return(
        <React.Fragment>
          <Loading />
        </React.Fragment>
      );
    }
  }

  render() {
    return(
      <div id="list-articles">
        <div className="topics-menu">
          <div onClick={this.onTopicSelect} className="topics-scroll"> 
            <span className="topic-menu topic-select">All</span>
            <span className="topic-menu">Programming</span>
            <span className="topic-menu">Other</span>
            <span className="topic-menu">Culture</span>
            <span className="topic-menu">Science</span>
            <span className="topic-menu">Art</span>
            <span className="topic-menu">Medicine</span>
            <span className="topic-menu">Language</span>
            <span className="topic-menu">Smart</span>
            <span className="topic-menu">Scycology</span>
            <span className="topic-menu">Tv</span>
            <span className="topic-menu">Life</span>
            <span className="topic-menu">Animals</span>
            <span className="topic-menu">Murder</span>
            <span className="topic-menu">Fiction</span>
            <span className="topic-menu">WallStreet</span>
            <span className="topic-menu">Music</span>
            <span className="topic-menu">Politics</span>
          </div>
        </div>  
        <div className="article-items">
          {this.renderList()}
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return { articles: Object.values(state.articles) };
}


export default connect( mapStateToProps, {
  listArticles, listArticlesOnTopic
} )(ListArticles);
