import React from 'react';
import $ from "jquery";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Styles.css";
import history from "../history";

class Home extends React.Component {

  state = { interests: [] };


  componentDidMount() {
    setInterval(() => this.changeSlide(), 5000);  
  }

  componentDidUpdate() {
    if(this.props.isSignedIn === true ) {
      history.push("/articles");
    }
  }

  selectInterest = (e) => {
    //only add class of interest-selected if the target element id is null
    //(if the element is not div.interests)
    if(!e.target.id) {
      $(e.target).toggleClass("interest-select");
    }
    //get the interest text
    let interest = $(e.target).text();
    //put the interest into state.interests only if it is not in already
    if( !this.state.interests.includes(interest) ) {
      this.setState((state) => ({
        interests: [...state.interests, interest]
      }));
    }
  }


  changeSlide = () => {
    let slides = Array.from($(".slide"));
    let indicators = Array.from($(".indicator i"));
    let activeSlide = $(".slide-active")[0];
    let activeIndex = slides.indexOf(activeSlide);
    let lastIndicator;

    if( activeIndex === slides.length-1 ) {
      activeIndex = 0;
      lastIndicator = slides.length - 1
    }
    else {
      activeIndex += 1;
      lastIndicator = activeIndex - 1;
    }
    
    $(indicators[lastIndicator]).css({"opacity": "0.5"});
    $(indicators[activeIndex]).css({"opacity": "1"});

    $(activeSlide).removeClass("slide-active");
    $(slides[activeIndex]).addClass("slide-active");

  }


  render() {
    
    return(
      <section id="home">
        <div className="home-interests" >
          <h1>Get Smarter About What Matters to You</h1>
          <div id="interests" onClick={this.selectInterest}> 
            <span className="interest"><i className="slack hash icon"></i>Programming</span>
            <span className="interest"><i className="slack hash icon"></i>Culture</span>
            <span className="interest"><i className="slack hash icon"></i>language</span>
            <span className="interest"><i className="slack hash icon"></i>Music</span>
            <span className="interest"><i className="slack hash icon"></i>Politics</span>
            <span className="interest"><i className="slack hash icon"></i>Science</span>
            <span className="interest"><i className="slack hash icon"></i>Business</span>
            <span className="interest"><i className="slack hash icon"></i>Android</span>
            <span className="interest"><i className="slack hash icon"></i>WallStreet</span>
            <span className="interest"><i className="slack hash icon"></i>Smart Phones</span>
            <span className="interest"><i className="slack hash icon"></i>Fiction</span>
            <span className="interest"><i className="slack hash icon"></i>Romance</span>
            <span className="interest"><i className="slack hash icon"></i>Social Issues</span>
            <span className="interest"><i className="slack hash icon"></i>Murder</span>
            <span className="interest"><i className="slack hash icon"></i>Movies</span>
            <span className="interest"><i className="slack hash icon"></i>Tv Shows</span>
            <span className="interest"><i className="slack hash icon"></i>Life</span>
            <span className="interest"><i className="slack hash icon"></i>Animals</span>
            <span className="interest"><i className="slack hash icon"></i>Celebrities</span>
          </div>

          <div className="get-started">
            <h4>Select your interests and we will find you stuff to read.</h4>
            <Link to="#" className="getStarted-button">
              Get Started
            </Link>
          </div>
        </div>

        <div className="no-ads">
          <h2>No Ads, No Problems</h2>
          <p>lorem ipsum lorem upsum lorem ipsum lorem upsum lorem ipsum lorem upsum.</p>
        </div>
    
        <div className="grid-container">
          <div className="grid-item1">
            <Link to="#" className="getStarted-button grid-button">
              Get Started
            </Link>
          </div>
          <div className="grid-item2">
            <h4>We do things diffrently</h4>
            <p>Medium is not like any other platform on the internet. Our sole purpose is to help you find compelling ideas, knowledge, and perspectives. We don’t serve ads—we serve you, the curious reader who loves to learn new things. Medium is home to thousands of independent voices, and we combine humans and technology to find the best reading for you—and filter out the rest.</p>
          </div>
        </div>

        <div className="grid-container">
            <div className="grid-item3">
              <h4>120 million curious readers and growing.</h4>
            </div>
            <div className="grid-item4">
              <div id="grid-background" onClick={this.changeSlide}>
                <div className="slider">
                  <div className="slide slide-active">
                    <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat odio facilisis mauris sit amet massa vitae.</h5>
                    <span className="slide-author"><i className="pencil alternate icon"></i>Sam</span>
                  </div>
                  <div className="slide">
                    <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis egestas pretium aenean pharetra magna ac.</h5>
                    <span className="slide-author"><i className="pencil alternate icon"></i>Richard</span>
                  </div>
                  <div className="slide">
                    <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h5>
                    <span className="slide-author"><i className="pencil alternate icon"></i>Steven</span>
                  </div>
                  <div className="slide">
                    <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi.</h5>
                    <span className="slide-author"><i className="pencil alternate icon"></i>Mike</span>
                  </div>
                  <div className="slide">
                    <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h5>
                    <span className="slide-author"><i className="pencil alternate icon"></i>Liam</span>
                  </div>
                </div>
                <div className="indicator">
                  <i style={{opacity: "1"}} className="small circle outline icon"></i>
                  <i className="small circle outline icon"></i>
                  <i className="small circle outline icon"></i>
                  <i className="small circle outline icon"></i>
                  <i className="small circle outline icon"></i>
                </div>
              </div>
            </div>
        </div>
      </section>
    );
  }

}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps)(Home);