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
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import purple from '@material-ui/core/colors/purple'
import FormHelperText from '@material-ui/core/FormHelperText'

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
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500],
    },
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

function getSteps() {
  return ['Dados Pessoais', 'Contato', 'Endereço', 'Tipo Colaborador', 'Finalizar'];
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
      return 'Step 3: This is the bit I really care about!';
    case 4:
      return 'Step 4: FInally';
    default:
      return 'Unknown step';
  }
}


class User extends React.Component {
  state = {
    activeStep: 0,
    completed: {},
    step: 1,
    age: '',
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

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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
            <form className={classes.root} novalidate autoComplete="off">

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
                                <FormControl className={classes.containerInput} >
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    Nome
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={6} >
                                <FormControl className={classes.containerInput}>
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    CPF
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={6} >
                                <FormControl className={classes.containerInput}>
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    Nacionalidade
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={4} >
                                <FormControl className={classes.containerInput}>                                
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    Data de Nascimento
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    type="date"
                                    defaultValue="2017-05-24"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={4} >
                                <FormControl className={classes.containerInput}>
                                  <InputLabel htmlFor="age-required">Estado Civil</InputLabel>
                                  <Select
                                    value={this.state.age}
                                    onChange={this.handleChangeSelect}
                                    name="age"
                                    inputProps={{
                                      id: 'age-required',
                                    }}
                                  >
                                    <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                                  <FormHelperText>Required</FormHelperText>
                                </FormControl>
                              </Grid>

                              <Grid item xs={4} >
                                <FormControl className={classes.containerInput}>
                                  <InputLabel htmlFor="age-required">Sexo</InputLabel>
                                  <Select
                                    value={this.state.age}
                                    onChange={this.handleChangeSelect}
                                    name="age"
                                    inputProps={{
                                      id: 'age-required',
                                    }}
                                  >
                                    <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Masculino</MenuItem>
                                    <MenuItem value={20}>Feminino</MenuItem>
                                  </Select>
                                  <FormHelperText>Required</FormHelperText>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </div>}

                          {this.state.activeStep === 3 && <div className={classes.rootLayout}>
                            <Grid container spacing={24}>

                              <Grid item xs={6} >
                              <FormControl className={classes.containerInput}>
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    Cargo
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={6} >
                              <FormControl className={classes.containerInput}>
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    CRMV
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    type="number"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={6} >
                              <FormControl className={classes.containerInput}>
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    Comissão
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    type="number"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={6} >
                              <FormControl className={classes.containerInput}>
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    Salário
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    type="number"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>
                            </Grid>
                          </div>}

                          {this.state.activeStep === 2 && <div className={classes.rootLayout}>
                            <Grid container spacing={24}>

                              <Grid item xs={12} >
                              <FormControl className={classes.containerInput}>
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    Logradouro
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={4} >
                              <FormControl className={classes.containerInput}>
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    CEP
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={4} >
                              <FormControl className={classes.containerInput}>
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    Número
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    type="number"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={4} >
                              <FormControl className={classes.containerInput}>
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    Complemento
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={6} >
                              <FormControl className={classes.containerInput}>
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    Bairro
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={6} >
                              <FormControl className={classes.containerInput}>
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    Cidade
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={6} >
                              <FormControl className={classes.containerInput}>
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    Estado
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={6} >
                              <FormControl className={classes.containerInput}>
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    País
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>
                            </Grid>
                          </div>}

                          {this.state.activeStep === 1 && <div className={classes.rootLayout}>
                            <Grid container spacing={24}>

                              <Grid item xs={6} >
                              <FormControl className={classes.containerInput}>
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    Email
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    type="email"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={6} >
                              <FormControl className={classes.containerInput}>
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    Celular I
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={6} >
                              <FormControl className={classes.containerInput}>
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    Telefone Comercial
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={6} >
                              <FormControl className={classes.containerInput}>
                                  <InputLabel
                                    htmlFor="custom-css-standard-input"
                                    classes={{
                                      root: classes.cssLabel,
                                      focused: classes.cssFocused,
                                    }}
                                  >
                                    Telefone Residencial
                                  </InputLabel>
                                  <Input
                                    id="custom-css-standard-input"
                                    classes={{
                                      underline: classes.cssUnderline,
                                    }}
                                  />
                                </FormControl>
                              </Grid>
                            </Grid>
                          </div>}

                          {this.state.activeStep === 4 && <div className={classes.rootLayout}>
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
                              disabled={activeStep >= 4}
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
            </form>
          </Grid>
        </main>
      </div>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(User);
