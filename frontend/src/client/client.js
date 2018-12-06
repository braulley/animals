import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Header from '../header/header'
import Input from '@material-ui/core/Input'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import './client.css'

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  rootHeader: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  input: {
    margin: theme.spacing.unit,
  },
  containerInput: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  rootLayout: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

function getSteps() {
  return ['Dados Pessoais', 'Contato', 'Endereço', 'Finalizar'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Step 1: Select campaign settings...';
    case 1:
      return 'Step 2: What is an ad group anyways?';
    case 2:
      return 'Step 3: This is the bit I really care about!';
    case 3:
      return 'Step 4: FInally';
    default:
      return 'Unknown step';
  }
}

class Client extends React.Component {
  state = {
    activeStep: 0,
    completed: {},
    step: 1,
  };

  totalSteps = () => {
    return getSteps().length;
  };

  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  handleComplete = () => {
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed,
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {},
    });
  };

  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.rootHeader}>
        <Header />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <div className={classes.root}>
                <Stepper nonLinear activeStep={activeStep}>
                  {steps.map((label, index) => {
                    return (
                      <Step key={label}>
                        <StepButton
                          onClick={this.handleStep(index)}
                          completed={this.state.completed[index]}
                        >
                          {label}
                        </StepButton>
                      </Step>
                    );
                  })}
                </Stepper>
                <div>
                  {this.allStepsCompleted() ? (
                    <div>
                      <Typography className={classes.instructions}>
                        All steps completed - you&apos;re finished
                </Typography>
                      <Button onClick={this.handleReset}>Reset</Button>
                    </div>
                  ) : (
                      <div >
                        {this.state.activeStep === 0 && <div className={classes.rootLayout}>
                          <Grid container spacing={24}>

                            <Grid item xs={12} >
                              <div className={classes.containerInput}>
                                <Input
                                  defaultValue="Nome"
                                  className="input"
                                  inputProps={{
                                    'aria-label': 'Description',
                                  }}
                                />
                              </div>
                            </Grid>
                            <Grid item xs={6} >
                              <div className={classes.containerInput}>
                                <Input
                                  placeholder="CPF"
                                  className="input"
                                  inputProps={{
                                    'aria-label': 'Description',
                                  }}
                                />
                              </div>
                            </Grid>

                            <Grid item xs={6} >
                              <div className={classes.containerInput}>
                                <Input
                                  placeholder="Nacionalidade"
                                  className="input"
                                  inputProps={{
                                    'aria-label': 'Description',
                                  }}
                                />
                              </div>
                            </Grid>

                            <Grid item xs={4} >
                              <div className={classes.containerInput}>
                                <Input
                                  id="date"
                                  label="Data de Nascimento"
                                  type="date"
                                  defaultValue="2017-05-24"
                                  className={classes.textField}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              </div>
                            </Grid>

                            <Grid item xs={4} >
                              <div className={classes.containerInput}>
                                <Input
                                  placeholder="Estado Civil"
                                  className="input"
                                  inputProps={{
                                    'aria-label': 'Description',
                                  }}
                                />
                              </div>
                            </Grid>

                            <Grid item xs={4} >
                              <div className={classes.containerInput}>
                                <Input
                                  placeholder="Sexo"
                                  className="input"
                                  inputProps={{
                                    'aria-label': 'Description',
                                  }}
                                />
                              </div>
                            </Grid>
                          </Grid>
                        </div>}

                        {this.state.activeStep === 1 && <div className={classes.rootLayout}>
                          <Grid container spacing={24}>

                            <Grid item xs={6} >
                              <div className={classes.containerInput}>
                                <Input
                                  placeholder="Email"
                                  className="input"
                                  inputProps={{
                                    'aria-label': 'Description',
                                  }}
                                />
                              </div>
                            </Grid>
                            <Grid item xs={6} >
                              <div className={classes.containerInput}>
                                <Input
                                  placeholder="Celular 1"
                                  className="input"
                                  inputProps={{
                                    'aria-label': 'Description',
                                  }}
                                />
                              </div>
                            </Grid>

                            <Grid item xs={6} >
                              <div className={classes.containerInput}>
                                <Input
                                  placeholder="Telefone Comercial"
                                  className="input"
                                  inputProps={{
                                    'aria-label': 'Description',
                                  }}
                                />
                              </div>
                            </Grid>

                            <Grid item xs={6} >
                              <div className={classes.containerInput}>
                                <Input
                                  placeholder="Telefone Residencial"
                                  className="input"
                                  inputProps={{
                                    'aria-label': 'Description',
                                  }}
                                />
                              </div>
                            </Grid>
                          </Grid>
                        </div>}

                        {this.state.activeStep === 2 && <div className={classes.rootLayout}>
                          <Grid container spacing={24}>

                            <Grid item xs={12} >
                              <div className={classes.containerInput}>
                                <Input
                                  placeholder="Logradouro"
                                  className="input"
                                  inputProps={{
                                    'aria-label': 'Description',
                                  }}
                                />
                              </div>
                            </Grid>

                            <Grid item xs={4} >
                              <div className={classes.containerInput}>
                                <Input
                                  placeholder="CEP"
                                  className="input"
                                  inputProps={{
                                    'aria-label': 'Description',
                                  }}
                                />
                              </div>
                            </Grid>

                            <Grid item xs={4} >
                              <div className={classes.containerInput}>
                                <Input
                                  placeholder="Número"
                                  className="input"
                                  inputProps={{
                                    'aria-label': 'Description',
                                  }}
                                />
                              </div>
                            </Grid>

                            <Grid item xs={4} >
                              <div className={classes.containerInput}>
                                <Input
                                  placeholder="Complemento"
                                  className="input"
                                  inputProps={{
                                    'aria-label': 'Description',
                                  }}
                                />
                              </div>
                            </Grid>

                            <Grid item xs={6} >
                              <div className={classes.containerInput}>
                                <Input
                                  placeholder="Bairro"
                                  className="input"
                                  inputProps={{
                                    'aria-label': 'Description',
                                  }}
                                />
                              </div>
                            </Grid>

                            <Grid item xs={6} >
                              <div className={classes.containerInput}>
                                <Input
                                  placeholder="Cidade"
                                  className="input"
                                  inputProps={{
                                    'aria-label': 'Description',
                                  }}
                                />
                              </div>
                            </Grid>

                            <Grid item xs={6} >
                              <div className={classes.containerInput}>
                                <Input
                                  placeholder="Estado"
                                  className="input"
                                  inputProps={{
                                    'aria-label': 'Description',
                                  }}
                                />
                              </div>
                            </Grid>

                            <Grid item xs={6} >
                              <div className={classes.containerInput}>
                                <Input
                                  placeholder="País"
                                  className="input"
                                  inputProps={{
                                    'aria-label': 'Description',
                                  }}
                                />
                              </div>
                            </Grid>
                          </Grid>
                        </div>}

                        {this.state.activeStep === 3 && <div className={classes.rootLayout}>
                          <Card className={classes.card}>
                            <CardActionArea>
                              <CardMedia
                                className={classes.media}
                                image="/static/images/cards/contemplative-reptile.jpg"
                                title="Contemplative Reptile"
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Lizard
          </Typography>
                                <Typography component="p">
                                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                  across all continents except Antarctica
          </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions>
                              <Button size="small" color="primary">
                                Share
        </Button>
                              <Button size="small" color="primary">
                                Learn More
        </Button>
                            </CardActions>
                          </Card>
                        </div>}


                        <div>
                          <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                          >
                            Back
                  </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                            disabled={activeStep >= 3}
                          >
                            Next
                  </Button>
                          {activeStep !== steps.length &&
                            (this.state.completed[this.state.activeStep] ? (
                              <Typography variant="caption" className={classes.completed}>
                                Step {activeStep + 1} already completed
                      </Typography>
                            ) : (
                                <Button variant="contained" color="primary" onClick={this.handleComplete}>
                                  {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                                </Button>
                              ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>

            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

Client.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Client);
