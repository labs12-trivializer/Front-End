import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons
// import  from "@material-ui/icons/";
// core components
import GridContainer from './GridContainer';
import GridItem from './GridItem';
import Card from './Card';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import Muted from './Muted';
import Button from './Button';

import cardProfile1Square from './assets/img/card-profile1-square.jpg';
import cardProfile2Square from './assets/img/card-profile2-square.jpg';
import cardProfile4Square from './assets/img/card-profile4-square.jpg';
import cardProfile6Square from './assets/img/card-profile6-square.jpg';

import teamsStyle from './assets/style/teamsStyle';
import teamStyle from './assets/style/teamStyle';

const style = {
  ...teamsStyle,
  ...teamStyle,
  justifyContentCenter: {
    justifyContent: 'center'
  }
};

class SectionTeam extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>Here is our team</h2>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <Card profile plain className={classes.card3}>
                <GridContainer>
                  <GridItem xs={12} sm={5} md={5}>
                    <CardHeader image plain>
                      <a href="https://github.com/heyjuststart" target="_blank">
                        <img
                          src="https://github.com/heyjuststart.png"
                          alt="Steve Delfaus"
                        />
                      </a>
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: `url(${cardProfile1Square})`,
                          opacity: '1'
                        }}
                      />
                    </CardHeader>
                  </GridItem>
                  <GridItem xs={12} sm={7} md={7}>
                    <CardBody plain>
                      <h4 className={classes.cardTitle}>Steve Delfaus</h4>
                      <Muted>
                        <h6 className={classes.cardCategory}>
                          Frontend/Backend Developer
                        </h6>
                      </Muted>
                      <p className={classes.description}>
                        Don't be scared of the truth because we need to restart
                        the human foundation in truth...
                      </p>
                    </CardBody>
                    <CardFooter plain className={classes.justifyContentCenter}>
                      <Button justIcon simple color="twitter">
                        <i className="fab fa-twitter" />
                      </Button>
                      <Button justIcon simple color="facebook">
                        <i className="fab fa-facebook-square" />
                      </Button>
                      <Button justIcon simple color="google">
                        <i className="fab fa-google" />
                      </Button>
                    </CardFooter>
                  </GridItem>
                </GridContainer>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <Card profile plain className={classes.card3}>
                <GridContainer>
                  <GridItem xs={12} sm={5} md={5}>
                    <CardHeader image plain>
                      <a href="https://github.com/IVB107" target="_blank">
                        <img
                          src="https://github.com/IVB107.png"
                          alt="Ian Van Buren"
                        />
                      </a>
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: `url(${cardProfile6Square})`,
                          opacity: '1'
                        }}
                      />
                    </CardHeader>
                  </GridItem>
                  <GridItem xs={12} sm={7} md={7}>
                    <CardBody plain>
                      <h4 className={classes.cardTitle}>Ian Van Buren</h4>
                      <Muted>
                        <h6 className={classes.cardCategory}>
                          Frontend/Backend Developer
                        </h6>
                      </Muted>
                      <p className={classes.description}>
                        Don't be scared of the truth because we need to restart
                        the human foundation in truth...
                      </p>
                    </CardBody>
                    <CardFooter plain className={classes.justifyContentCenter}>
                      <Button justIcon simple color="linkedin">
                        <i className="fab fa-linkedin-in" />
                      </Button>
                      <Button justIcon simple color="facebook">
                        <i className="fab fa-facebook-square" />
                      </Button>
                      <Button justIcon simple color="dribbble">
                        <i className="fab fa-dribbble" />
                      </Button>
                      <Button justIcon simple color="google">
                        <i className="fab fa-google" />
                      </Button>
                    </CardFooter>
                  </GridItem>
                </GridContainer>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <Card profile plain className={classes.card3}>
                <GridContainer>
                  <GridItem xs={12} sm={5} md={5}>
                    <CardHeader image plain>
                      <a href="https://github.com/macjabeth" target="_blank">
                        <img
                          src="https://github.com/macjabeth.png"
                          alt="Jonathan Picazo"
                        />
                      </a>
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: `url(${cardProfile4Square})`,
                          opacity: '1'
                        }}
                      />
                    </CardHeader>
                  </GridItem>
                  <GridItem xs={12} sm={7} md={7}>
                    <CardBody plain>
                      <h4 className={classes.cardTitle}>Jonathan Picazo</h4>
                      <Muted>
                        <h6 className={classes.cardCategory}>
                          Frontend/Backend Developer
                        </h6>
                      </Muted>
                      <p className={classes.description}>
                        I love you like Kanye loves Kanye. Don't be scared of
                        the truth.
                      </p>
                    </CardBody>
                    <CardFooter plain className={classes.justifyContentCenter}>
                      <Button justIcon simple color="youtube">
                        <i className="fab fa-youtube" />
                      </Button>
                      <Button justIcon simple color="twitter">
                        <i className="fab fa-twitter" />
                      </Button>
                      <Button justIcon simple color="instagram">
                        <i className="fab fa-instagram" />
                      </Button>
                    </CardFooter>
                  </GridItem>
                </GridContainer>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <Card profile plain className={classes.card3}>
                <GridContainer>
                  <GridItem xs={12} sm={5} md={5}>
                    <CardHeader image plain>
                      <a href="https://github.com/korynewton" target="_blank">
                        <img
                          src="https://github.com/korynewton.png"
                          alt="Kory Newton"
                        />
                      </a>
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: `url(${cardProfile2Square})`,
                          opacity: '1'
                        }}
                      />
                    </CardHeader>
                  </GridItem>
                  <GridItem xs={12} sm={7} md={7}>
                    <CardBody plain>
                      <h4 className={classes.cardTitle}>Kory Newton</h4>
                      <Muted>
                        <h6 className={classes.cardCategory}>
                          Frontend/Backend Developer
                        </h6>
                      </Muted>
                      <p className={classes.description}>
                        I love you like Kanye loves Kanye. Don't be scared of
                        the truth.
                      </p>
                    </CardBody>
                    <CardFooter plain className={classes.justifyContentCenter}>
                      <Button justIcon simple color="linkedin">
                        <i className="fab fa-linkedin-in" />
                      </Button>
                      <Button justIcon simple color="facebook">
                        <i className="fab fa-facebook-square" />
                      </Button>
                      <Button justIcon simple color="google">
                        <i className="fab fa-google" />
                      </Button>
                    </CardFooter>
                  </GridItem>
                </GridContainer>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(SectionTeam);
