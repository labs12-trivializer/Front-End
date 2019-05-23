import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// @material-ui/icons
// core components
// import Header from './Header.js';
import Footer from './Footer.js';
import GridContainer from './GridContainer.js';
import GridItem from './GridItem.js';
import Button from './Button.js';
// import HeaderLinks from './HeaderLinks.js';
import Parallax from './Parallax.js';

import landingPageStyle from './assets/style/landingPageStyle';

// Sections for this page
import SectionProduct from './SectionProduct.js';
import SectionTeam from './SectionTeam.js';
import SectionWork from './SectionWork.js';
import { HashLink as Link } from 'react-router-hash-link';

class LandingPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    const { classes } = this.props;
    return (
      <div id="about">
        <Parallax image={require('./assets/img/bar.jpg')} filter="dark">
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <h1 className={classes.title}>Bar Trivia Nights Made Easy.</h1>
                <h4>
                  By taking the hassle out of creating unique trivia games for
                  bar trivia night hosts, our product helps generate games and
                  prepare question and answer sheets needed to host the event.
                </h4>
                <br />
                <Button
                  color="danger"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-play" />
                  Watch video
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <SectionProduct />
            <div id="team">
              <SectionTeam />
            </div>
            <div id="contact">
              <SectionWork />
            </div>
          </div>
        </div>
        <Footer
          content={
            <div>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <Link className={classes.block} to="/#about">
                      About
                    </Link>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <Link className={classes.block} to="/#team">
                      Our Team
                    </Link>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <Link className={classes.block} to="/#contact">
                      Contact Us
                    </Link>
                  </ListItem>
                </List>
              </div>
              <div className={classes.right}>
                &copy; {1900 + new Date().getYear()} Triviabase
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
