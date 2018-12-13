import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Header from '../header/header'
import Input from '@material-ui/core/Input'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { Field, reduxForm } from 'redux-form'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import StepLabel from '@material-ui/core/StepLabel'

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


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => {
    // simulate server latency
    if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
      // eslint-disable-next-line no-throw-literal
      throw { email: 'Email already Exists' }
    }
  })
}

const validate = values => {
  const errors = {}
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'favoriteColor',
    'notes'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}



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
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
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
    const steps = getSteps()
    const { activeStep } = this.state


    const { handleSubmit, pristine, reset, submitting, classes } = this.props


    return (
      <div className={classes.rootHeader}>
        <Header />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <div className={classes.root}>
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => {
                      return (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
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
                              className={classes.backButton}
                            >Back</Button>
                            {activeStep === steps.length - 1 &&
                            <Button variant="contained" color="primary" onClick={this.handleNext}>
                              Concluir
                            </Button>} 
                            {activeStep !== steps.length - 1 &&
                              <Button variant="contained" color="primary" onClick={this.handleNext}>
                              Próximo
                            </Button>
                            }                           
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>

              </Grid>
            </Grid>
          </form>
        </main>
      </div>
    );
  }
}

Client.propTypes = {
  classes: PropTypes.object,
};

//export default withStyles(styles)(Client);

export default reduxForm({
  form: 'Client', // a unique identifier for this form
  validate,
  asyncValidate
})(withStyles(styles)(Client))
