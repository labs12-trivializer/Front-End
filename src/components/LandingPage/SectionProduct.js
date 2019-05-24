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
        <div>
          <h2 className={classes.title}>Application Features:</h2>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4}>
              <InfoArea
                title="Create Games"
                description="Create games, rounds and questions by leveraging a trivia question API or by creating your own custom entries - you have complete freedom whichever way you choose"
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
