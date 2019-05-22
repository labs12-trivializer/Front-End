import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons
import { Add, Tune, Print } from '@material-ui/icons/';
// core components
import GridContainer from './GridContainer';
import GridItem from './GridItem';
import InfoArea from './InfoArea';

import productStyle from './assets/style/productStyle';

class SectionProduct extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8} md={8}>
            <h2 className={classes.title}>Let's talk product</h2>
            <h5 className={classes.description} style={{ textAlign: 'left' }}>
              This is the paragraph where you can write more details about your
              product. Keep you user engaged by providing meaningful
              information. Remember that by this time, the user is curious,
              otherwise he wouldn't scroll to get here. Add a button if you want
              the user to see more.
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4}>
              <InfoArea
                title="Create Games"
                description="Create games and rounds and questions and lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"
                icon={Add}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <InfoArea
                title="Customize Experience"
                description="Tailor trivia games to your audience by choosing from an assortment of question categories ranging from Anime to Literature"
                icon={Tune}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <InfoArea
                title="Print Question and Answer Sheets"
                description="When you've completed making your game, easily generate PDFs of question and answers sheets and you are on your way"
                icon={Print}
                iconColor="danger"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(SectionProduct);
