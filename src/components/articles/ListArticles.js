import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import $ from "jquery";

import "../../Styles/index.css";
import Loading from "../Loading";
import { listArticles, listArticlesOnTopic } from "../../actions";
import { topics } from '../../Topics';

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
          return null;
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
              <div className="article-img"><img src={article.image} /></div>
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

  renderTopics = () => {
    return topics.map((topic) => {
      return(
        <span className="topic-menu">{topic}</span>
      );
    });
  }

  render() {
    return(
      <div id="list-articles">
        <div className="topics-menu">
          <div onClick={this.onTopicSelect} className="topics-scroll"> 
            <span className="topic-menu topic-select">All</span>
            {this.renderTopics()}
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
