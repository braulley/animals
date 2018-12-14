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
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import StepLabel from '@material-ui/core/StepLabel'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Divider from '@material-ui/core/Divider'
import './client.css'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'


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
    display: 'flex',
    flexWrap: 'wrap',
  },
});


const sexArray = [
  {
    value: '0',
    label: '',
  },
  {
    value: '1',
    label: 'Feminino',
  },
  {
    value: '2',
    label: 'Masculino',
  },
];

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
    contact: {
      name: '',
      registerCode: '',
      nacionality: '',
      dateBirth: Date(),
      office: '',
      email: '',
      phone: '',
      phone1: '',
      phone2: '',
      sex: '',
    },
    address: {
      street: '',
      number: 0,
      complement: '',
      neighborhood: '',
      city: '',
      states: '',
      country: '',

    }
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
          <form noValidate autoComplete="off">
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>Cadastro de Clientes</Typography>
                <Divider light />
              </Grid>
              <Grid item xs={7}>
                <TextField
                  id="name"
                  label="Name"
                  className={classes.textField}
                  value={this.state.contact.name}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="cpf"
                  label="CPF"
                  className={classes.textField}
                  value={this.state.contact.registerCode}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="nac"
                  label="Nacionalidade"
                  className={classes.textField}
                  value={this.state.contact.nacionality}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4} >
                <TextField
                  id="birth"
                  label="Data de Nascimento"
                  className={classes.textField}
                  value={this.state.contact.dateBirth}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Select"
                  className={classes.textField}
                  value={this.state.contact.sex }
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select your currency"
                  margin="normal"
                >
                  {sexArray.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="office"
                  label="Cargo"
                  className={classes.textField}
                  value={this.state.contact.office}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="email"
                  label="Email"
                  className={classes.textField}
                  value={this.state.contact.email}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="tel"
                  label="Celular"
                  className={classes.textField}
                  value={this.state.contact.phone}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="tel1"
                  label="Residencial"
                  className={classes.textField}
                  value={this.state.contact.phone1}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="tel2"
                  label="Tel.COmercial"
                  className={classes.textField}
                  value={this.state.contact.phone2}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="cep"
                  label="CEP"
                  className={classes.textField}
                  value={this.state.zipCode}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="street"
                  label="Logradouro"
                  className={classes.textField}
                  value={this.state.address.street}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="number"
                  label="Número"
                  className={classes.textField}
                  value={this.state.address.number}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="complement"
                  label="Complemento"
                  className={classes.textField}
                  value={this.state.address.complement}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="neighborhood"
                  label="Bairro"
                  className={classes.textField}
                  value={this.state.address.neighborhood}
                  margin="normal"
                />
              </Grid>


              <Grid item xs={4}>
                <TextField
                  id="city"
                  label="Cidade"
                  className={classes.textField}
                  value={this.state.address.city}
                  margin="normal"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="state"
                  label="Estado"
                  className={classes.textField}
                  value={this.state.address.states}
                  margin="normal"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="country"
                  label="País"
                  className={classes.textField}
                  value={this.state.address.country}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" color="primary" className={classes.button}>
                  Primary
      </Button>
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

export default withStyles(styles)(Client);

