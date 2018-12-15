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
import NumberFormat from 'react-number-format'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import purple from '@material-ui/core/colors/purple'
import FormHelperText from '@material-ui/core/FormHelperText'
import StepLabel from '@material-ui/core/StepLabel'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import MaskedInput from 'react-text-mask'
import Icon from '@material-ui/core/Icon'
import SaveIcon from '@material-ui/icons/Save'
import classNames from 'classnames'
import ViaCep from '../service/viaCep'

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
  error: {
    color: purple[500],
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
  rightIcon: {
    marginLeft: theme.spacing.unit / 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const selectSex = [
  {
    value: 0,
    label: '',
  },
  {
    value: 1,
    label: 'Feminino',
  },
  {
    value: 2,
    label: 'Masculino',
  },
];

const officer = [
  {
    value: 0,
    label: '',
  },
  {
    value: 1,
    label: 'Atendente',
  },
  {
    value: 2,
    label: 'Vendedor',
  },
  {
    value: 3,
    label: 'Veterinário',
  },
  {
    value: 4,
    label: 'Administrador',
  }
]

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="R$"
    />
  );
}

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

function TextMaskEmail(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/[A-Z]/, /\d/, '@', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
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
      error: true,
      verifyCrmv: true,
      invalidLocation: false,
      errorMessage: {
        name: '',
        registerCode: '',
        dateBIrth: '',
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
        street: '',
        zipCode: '',
        number: 0,
        complement: '',
        neighborhood: '',
        city: '',
        states: '',
        country: '',
      },
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
        userName: '',
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





  handleChange = name => event => {

    const contact = this.state.contact;
    contact[name] = event.target.value;
    this.setState({ contact: contact });
    console.log(name)

    if (contact[name] === 3) {
      this.setState({ verifyCrmv: false })
    } else {
      this.setState({ verifyCrmv: true })
    }

    this.validation()
  }


  validation() {
    if (this.state.contact.name === '') {
      this.state.errorMessage.name = '* Por favor, preencha o campo nome!'
      this.state.error = false
    }
    else if (this.state.contact.registerCode == '') {
      this.state.errorMessage.registerCode = '* CPF Inválido. '
      this.state.error = false
    }
    else if (this.state.contact.sex == '') {
      this.state.errorMessage.sex = '* Por favor, preencha o campo sexo.'
      this.state.error = false
    }
    else if (this.state.contact.comission < 0) {
      this.state.errorMessage.comission = '* Preencha um valor válido.'
      this.state.error = false
    }
    else if (this.state.contact.salary < 0) {
      this.state.errorMessage.salary = '* Preencha um valor válido.'
      this.state.error = false
    }
    else if (this.state.contact.phone == '' || this.state.contact.phone.length != 14) {
      this.state.errorMessage.phone = '* Preencha um valor válido.'
      this.state.error = false
    }
    else if (this.state.contact.phone1 == '' || this.state.contact.phone1.length != 13) {
      this.state.errorMessage.phone1 = '* Preencha um valor válido.'
      this.state.error = false
    }
    else if (this.state.address.zipCode == '' || this.state.address.zipCode.length != 9) {
      this.state.errorMessage.zipCode = '* Preencha o CEP.'
      this.state.error = false
    }
    else if (this.state.contact.office == '') {
      this.state.errorMessage.zipCode = '* Preencha o Cargo correto.'
      this.state.error = false
    } else if (this.state.contact.salary <= 0) {
      this.state.error = false
    } else {
      this.state.error = true
    }
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
    const { activeStep } = this.state;


    return (
      <div className={classes.rootHeader}>
        <Header />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <form ref="form" className={classes.root} noValidate autoComplete="off" onSubmit={this.handleSubmit}>

            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>Cadastro de Funcionários</Typography>
                <Divider light />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  className={classes.containerInput}
                  label="Nome"
                  value={this.state.contact.name}
                  onChange={this.handleChange('name')}
                  id="name"
                  required
                />
                {this.state.contact.name === '' &&
                  <span className={classes.error} >Here</span>

                }
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.containerInput}
                  label="Usuário"
                  value={this.state.contact.userName}
                  onChange={this.handleChange('userName')}
                  id="userName"
                  required
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  className={classes.containerInput}
                  label="CPF"
                  value={this.state.contact.registerCode}
                  onChange={this.handleChange('registerCode')}
                  id="registerCode"
                  required
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  className={classes.containerInput}
                  label="Data de Nascimento"
                  value={this.state.contact.dateBirth}
                  onChange={this.handleChange('dateBirth')}
                  id="dateBirth"
                  type="date"
                  required
                  defaultValue="2017-05-24"
                  InputLabelProps={{
                    shrink: true,
                  }}

                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  className={classes.containerInput}
                  label="Email"
                  value={this.state.contact.email}
                  onChange={this.handleChange('email')}
                  type="email"
                  required
                  id="email"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="sex"
                  select
                  label="Sexo"
                  required
                  className={classes.containerInput}
                  value={this.state.contact.sex}
                  onChange={this.handleChange('sex')}
                  helperText="Selecione seu Sexo"
                >
                  {selectSex.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.containerInput}
                  label="Telefone Celular"
                  value={this.state.contact.phone}
                  onChange={this.handleChange('phone')}
                  id="phone"
                  InputProps={{
                    inputComponent: TextMaskCustom,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.containerInput}
                  label="Telefone Residencial"
                  value={this.state.contact.phone1}
                  onChange={this.handleChange('phone1')}
                  id="phone1"
                  InputProps={{
                    inputComponent: TextMaskCustom,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.containerInput}
                  label="Salário"
                  required
                  value={this.state.contact.salary}
                  onChange={this.handleChange('salary')}
                  id="salary"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </Grid>
              <Grid item xs={3} >
                <TextField
                  id="comission"
                  label="Comissão (%)"
                  value={this.state.contact.comission}
                  onChange={this.handleChange('commission')}
                  type="number"
                  className={classes.containerInput}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="office"
                  select
                  label="Cargo"
                  required
                  className={classes.containerInput}
                  value={this.state.contact.office}
                  onChange={this.handleChange('office')}
                  SelectProps={{
                    native: false,
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select your currency"
                >
                  {officer.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={3} >
                <TextField
                  id="crmv"
                  label="CRMV"
                  disabled={this.state.verifyCrmv}
                  className={classes.containerInput}
                  value={this.state.contact.crmv}
                  onChange={this.handleChange('crmv')}
                />
              </Grid>
              <Grid item xs={3} >
                <TextField
                  id="zipCode"
                  label="CEP"
                  required
                  className={classes.containerInput}
                  value={this.state.address.zipCode}
                  onChange={this.handleChangeAddress('zipCode')}
                />
              </Grid>
              <Grid item xs={9} >
                <TextField
                  id="street"
                  label="Logradouro"
                  className={classes.containerInput}
                  value={this.state.address.street}
                  onChange={this.handleChangeAddress('street')}
                />
              </Grid>

              <Grid item xs={3} >
                <TextField
                  id="number"
                  type="number"
                  label="Número"
                  className={classes.containerInput}
                  value={this.state.address.number}
                  onChange={this.handleChangeAddress('number')}
                />
              </Grid>

              <Grid item xs={3} >
                <TextField
                  id="complement"
                  label="Complemento"
                  className={classes.containerInput}
                  value={this.state.address.complement}
                  onChange={this.handleChangeAddress('complement')}
                />
              </Grid>

              <Grid item xs={6} >
                <TextField
                  id="neighborhood"
                  label="Neighborhood"
                  className={classes.containerInput}
                  value={this.state.address.neighborhood}
                  onChange={this.handleChangeAddress('neighborhood')}
                />
              </Grid>

              <Grid item xs={4} >
                <TextField
                  id="city"
                  label="Cidade"
                  className={classes.containerInput}
                  value={this.state.address.city}
                  onChange={this.handleChangeAddress('city')}
                />
              </Grid>

              <Grid item xs={4} >
                <TextField
                  id="state"
                  label="Estado"
                  className={classes.containerInput}
                  value={this.state.address.states}
                  onChange={this.handleChangeAddress('states')}
                />
              </Grid>


              <Grid item xs={4} >
                <TextField
                  id="country"
                  label="País"
                  className={classes.containerInput}
                  value={this.state.address.country}
                  onChange={this.handleChangeAddress('country')}
                />
              </Grid>

              <Grid item xs={9}></Grid>
              <Grid item xs={3}>
                <Button variant="contained" color="primary" 
                className={classes.button} 
                disabled={this.state.error}
                type="submit">
                  Salvar<SaveIcon className={classNames(classes.rightIcon)} />
                </Button>
              </Grid>
            </Grid>
          </form>

        </main>
      </div>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(User);
