import React from 'react';
import GridContainer from './GridContainer';
import GridItem from './GridItem';
import { Card, Button } from '@material-ui/core/';
import CardBody from '@material-ui/core/Card';

function TierDetails() {
  return (
    <>
      <GridContainer spacing={0}>
        <GridItem md={3} sm={4}>
          <Card plain pricing>
            <CardBody pricing>
              <h6>Bronze</h6>
              <h1>
                <small>$</small>0 <small>/yr</small>
              </h1>
              <ul>
                <li>
                  <b>1</b> Game
                </li>
                <li>
                  <b>2</b> Rounds per game
                </li>
                <li>
                  <b>4</b> Questions per round
                </li>
              </ul>
              <Button href="#pablo" color="rose" round>
                Get started
              </Button>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem md={3} sm={4}>
          <Card raised pricing color="rose">
            <CardBody pricing>
              <h6>Silver</h6>
              <h1>
                <small>$</small>9.99 <small>/yr</small>
              </h1>
              <ul>
                <li>
                  <b>10</b> Games
                </li>
                <li>
                  <b>4</b> Rounds per game
                </li>
                <li>
                  <b>10</b> Questions per round
                </li>
              </ul>
              <Button href="#pablo" color="white" round>
                Get started
              </Button>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem md={3} sm={4}>
          <Card plain pricing>
            <CardBody pricing>
              <h6>Gold</h6>
              <h1>
                <small>$</small>29.99 <small>/yr</small>
              </h1>
              <ul>
                <li>
                  <b>30</b> Games
                </li>
                <li>
                  <b>10</b> Rounds per game
                </li>
                <li>
                  <b>200</b> Questions per round
                </li>
              </ul>
              <Button href="#pablo" color="rose" round>
                Get started
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}

export default TierDetails;
