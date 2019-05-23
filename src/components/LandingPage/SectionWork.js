import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';

// @material-ui/icons

// core components
import GridContainer from './GridContainer';
import GridItem from './GridItem';
import CustomInput from './CustomInput';
import { toast } from 'react-toastify';

import workStyle from './assets/style/workStyle';
import FormSubmitButton from './FormSubmitButton';

class SectionWork extends React.Component {
  state = {
    message: '',
    email: '',
    name: ''
  };

  changeHandler = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = async () => {
    axios
      .post('https://lambda-trivializer.herokuapp.com/api/contact', {
        ...this.state
      })
      .then(res => {
        if (res.status === 200) {
          toast.success(`Message Sent!`, {
            position: toast.POSITION.TOP_CENTER,
            textAlign: 'center'
          });
        }
      })
      .catch(err => console.log(err));
    this.setState({
      message: '',
      email: '',
      name: ''
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={8} md={8}>
            <h2 className={classes.title}>Get In Touch</h2>
            <h4 className={classes.description}>
              Divide details about your product or agency work into parts. Write
              a few lines about each one and contact us about any further
              collaboration. We will responde get back to you in a couple of
              hours.
            </h4>
            <form onSubmit={() => this.handleSubmit()}>
              <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                  <CustomInput
                    labelText="Your Name"
                    id="name"
                    name="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={this.state.name}
                    changeHandler={this.changeHandler}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                  <CustomInput
                    labelText="Your Email"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={this.state.email}
                    changeHandler={this.changeHandler}
                  />
                </GridItem>
                <CustomInput
                  labelText="Your Message"
                  id="message"
                  formControlProps={{
                    fullWidth: true,
                    className: classes.textArea
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5
                  }}
                  value={this.state.message}
                  changeHandler={this.changeHandler}
                />
                <GridItem
                  xs={12}
                  sm={4}
                  md={4}
                  className={`${classes.mrAuto} ${classes.mlAuto}`}
                  style={{ textAlign: 'center' }}
                >
                  <FormSubmitButton
                    handleSubmit={this.handleSubmit}
                    color="primary"
                  >
                    Send Message
                  </FormSubmitButton>
                </GridItem>
              </GridContainer>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(workStyle)(SectionWork);
