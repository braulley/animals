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
import StepLabel from '@material-ui/core/StepLabel'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'



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


class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      completed: {},
      step: 1,
      age: '',
      skipped: new Set(),
      contact: {
        name: '',
        registerCode: '',
        nacionality: '',
        dateBirth: Date(),
        maritalStatus: '',
        sex: '',
        office: '',
        crmv: '',
        comission: 0,
        salary: 0.00,
        email: '',
        phone: '',
        phone1: '',
        phone2: '',
      },
      address: {
        street: '',
        zipCode: '',
        number: 0,
        complement: '',
        neighborhood: '',
        city: '',
        states: '',
        country: '',
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }


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
    const contact = this.state.contact;
    contact[name] = event.target.value;
    this.setState({ contact: contact });
  }

  handleChangeAddress = propertyName => event => {
    const address = this.state.address;
    address[propertyName] = event.target.value;
    this.setState({ address: address });
  }

  /*handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };*/


  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.contact);
    event.preventDefault();
    console.log(this.state.contact)
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
            <form ref="form" className={classes.root} autoComplete="off" onSubmit={this.handleSubmit}>

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
                                id="name"
                                value={this.state.contact.name} 
                                onChange={this.handleChange('name')}
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
                                id="cpf"
                                value={this.state.contact.registerCode} 
                                onChange={this.handleChange('registerCode')}
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
                                id="nac"
                                value={this.state.contact.nacionality} 
                                onChange={this.handleChange('nacionality')}
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
                                id="date"
                                type="date"
                                value={this.state.contact.dateBirth} 
                                onChange={this.handleChange('dateBirth')}
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
                                value={this.state.contact.maritalStatus}
                                onChange={this.handleChange('maritalStatus')}
                                name="age"
                                inputProps={{
                                  id: 'age-required',
                                }}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>Solteirx</MenuItem>
                                <MenuItem value={2}>Casadx</MenuItem>
                                <MenuItem value={3}>Divorciadx</MenuItem>
                                <MenuItem value={4}>Amigadx</MenuItem>
                              </Select>
                              <FormHelperText>Required</FormHelperText>
                            </FormControl>
                          </Grid>

                          <Grid item xs={4} >
                            <FormControl className={classes.containerInput}>
                              <InputLabel htmlFor="age-required">Sexo</InputLabel>
                              <Select
                                value={this.state.contact.sex}
                                onChange={this.handleChange('sex')}
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
                                id="office"
                                value={this.state.contact.office}
                                onChange={this.handleChange('office')}
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
                                id="crmv"                        
                                value={this.state.contact.crmv}
                                onChange={this.handleChange('crmv')}
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
                                value={this.state.contact.comission}
                                onChange={this.handleChange('comission')}
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
                                id="salary"
                                type="number"
                                value={this.state.contact.salary}
                                onChange={this.handleChange('salary')}
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
                                id="street"
                                value={this.state.address.street}
                                onChange={this.handleChangeAddress('street')}
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
                                id="zipCode"
                                value={this.state.address.zipCode}
                                onChange={this.handleChangeAddress('zipCode')}
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
                                id="number"
                                type="number"
                                value={this.state.address.number}
                                onChange={this.handleChangeAddress('number')}
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
                                id="complement"
                                value={this.state.address.complement}
                                onChange={this.handleChangeAddress('complement')}
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
                                id="neighborhood"
                                value={this.state.address.neighborhood}
                                onChange={this.handleChangeAddress('neighborhood')}
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
                                id="city"
                                value={this.state.address.city}
                                onChange={this.handleChangeAddress('city')}
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
                                id="state"
                                value={this.state.address.states}
                                onChange={this.handleChangeAddress('state')}
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
                                id="country"
                                value={this.state.address.country}
                                onChange={this.handleChangeAddress('country')}
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
                                id="email"
                                type="email"
                                value={this.state.contact.email}
                                onChange={this.handleChange('email')}
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
                                id="phone"
                                value={this.state.contact.phone}
                                onChange={this.handleChange('phone')}
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
                                id="phone1"
                                value={this.state.contact.phone1}
                                onChange={this.handleChange('phone1')}
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
                                id="phone2"
                                value={this.state.contact.phone2}
                                onChange={this.handleChange('phone2')}
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

                        {this.state.activeStep === steps.length ? (
                          <div>
                            <Typography className={classes.instructions}>All steps completed</Typography>
                            <Button onClick={this.handleReset}>Reset</Button>
                          </div>
                        ) : (
                            <div>
                              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                              <div>
                                <Button
                                  disabled={activeStep === 0}
                                  onClick={this.handleBack}
                                  className={classes.backButton}>
                                  Back
                                </Button>
                                
                                {activeStep === steps.length - 1 && 
                                <Button variant="contained" color="primary" type="submit">
                                   Concluir
                                </Button>

                                 }
                                 { activeStep != steps.length - 1 &&
                                    <Button variant="contained" color="primary" onClick={this.handleNext}>
                                    Próximo
                                  </Button>
                                 }                                
                              </div>
                            </div>
                          )}
                      </div>

                    </div>
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
