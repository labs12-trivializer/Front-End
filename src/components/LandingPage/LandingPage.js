import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// @material-ui/icons
// import Favorite from '@material-ui/icons/Favorite';
// core components
// import Header from './Header.js';
// import Footer from './Footer.js';
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

class LandingPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        {/* <Header
          color="transparent"
          brand="Material Kit PRO React"
          links={<HeaderLinks dropdownHoverColor="info" />}
          fixed
          changeColorOnScroll={{
            height: 300,
            color: 'info'
          }}
          {...rest}
        /> */}
        <Parallax image={require('./assets/img/bar.jpg')} filter="dark">
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <h1 className={classes.title}>Bar Trivia Nights Made Easy.</h1>
                <h4>
                  Every landing page needs a small description after the big
                  bold title, that's why we added this text here. Add here all
                  the information that can make you or your product create the
                  first impression.
                </h4>
                <br />
                <Button
                  color="danger"
                  size="lg"
                  // href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
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
            <SectionTeam />
            <SectionWork />
          </div>
        </div>
        {/* <Footer
          content={
            <div>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/"
                      className={classes.block}
                    >
                      Creative Tim
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/presentation"
                      className={classes.block}
                    >
                      About us
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="//blog.creative-tim.com/"
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/license"
                      className={classes.block}
                    >
                      Licenses
                    </a>
                  </ListItem>
                </List>
              </div>
              <div className={classes.right}>
                &copy; {1900 + new Date().getYear()} , made with{' '}
                <Favorite className={classes.icon} /> by{' '}
                <a href="https://www.creative-tim.com">Creative Tim</a> for a
                better web.
              </div>
            </div>
          }
        /> */}
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
