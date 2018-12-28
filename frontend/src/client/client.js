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
import ViaCep from '../service/viaCep'
import Icon from '@material-ui/core/Icon'
import SaveIcon from '@material-ui/icons/Save'
import classNames from 'classnames'
import axios from 'axios'

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

  constructor(props){
    super(props);

    this.state = {
      contact: {
        name: '',
        registerCode: '',
        nacionality: '',
        dateBirth:'',
        type: 'C',
        email: '',
        phone: '',
        phone1: '',
        phone2: '',
        sex: '',
        maritalStatus: '',
      },
      address: {
        street: '',
        number: 0,
        complement: '',
        neighborhood: '',
        city: '',
        states: '',
        country: '',
        zipCode: '',
        local: '',
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let user = {
      contact: this.state.contact,
      address: this.state.address
    }
    axios.post(`http://localhost:4000/users/signup`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      
  }

  handleChange = name => event => {
    let user = this.state.contact
    user[name] = event.target.value
    this.setState({contact: user})
  }

  handleChangeAddredd = name => event => {
    let address = this.state.address
    address[name] = event.target.value
    this.setState({address : address})
  }

  handleBlur() {
    if (this.state.address.zipCode != '') {
      let address = Object.assign({}, this.state.address)
      ViaCep.getByCep(this.state.address.zipCode)
        .then(res => {
          address.neighborhood = res.bairro
          address.city = res.localidade
          address.street = res.logradouro
          address.states = res.uf
          this.setState({ address: address })
        }).catch(err => {
          alert(err);
        })
    }
  }


  render() {
    const { activeStep } = this.state

    const { handleSubmit, pristine, reset, submitting, classes } = this.props


    return (
      <div className={classes.rootHeader}>
        <Header />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
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
                  onChange={this.handleChange('name')}                  
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="cpf"
                  label="CPF"
                  className={classes.textField}
                  value={this.state.contact.registerCode}  
                  onChange={this.handleChange('registerCode')}                            
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="nac"
                  label="Nacionalidade"
                  className={classes.textField}
                  value={this.state.contact.nacionality}
                  onChange={this.handleChange('nacionality')}                                    
                />
              </Grid>
              <Grid item xs={4} >
                <TextField
                  id="birth"
                  label="Data de Nascimento"
                  value={this.state.contact.dateBirth}              
                  type="date"
                  defaultValue="2017-05-24"
                  className={classes.textField}
                  onChange={this.handleChange('dateBirth')}                  
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Sexo"
                  className={classes.textField}
                  value={this.state.contact.sex}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Selecione o sexo"
                  onChange={this.handleChange('sex')}                  
                >
                  {sexArray.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="email"
                  label="Email"
                  className={classes.textField}
                  value={this.state.contact.email}
                  onChange={this.handleChange('email')}                                    
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="tel"
                  label="Celular"
                  className={classes.textField}
                  value={this.state.contact.phone}
                  onChange={this.handleChange('phone')}                                   
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="tel1"
                  label="Residencial"
                  className={classes.textField}
                  value={this.state.contact.phone1}
                  onChange={this.handleChange('phone1')}                                   
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="maritalStatus"
                  label="Estado Civil"
                  className={classes.textField}
                  value={this.state.contact.maritalStatus}
                  onChange={this.handleChange('maritalStatus')}                                   
                />
              </Grid>              
              <Grid item xs={8}>
                <TextField
                  id="street"
                  label="Logradouro"
                  className={classes.textField}
                  value={this.state.address.street}
                  onChange={this.handleChangeAddredd('street')}                                  
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="cep"
                  label="CEP"
                  className={classes.textField}
                  value={this.state.address.zipCode}
                  onChange={this.handleChangeAddredd('zipCode')} 
                  onBlur={this.handleBlur}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="number"
                  label="Número"
                  className={classes.textField}
                  value={this.state.address.number}
                  onChange={this.handleChangeAddredd('number')}                                    
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="complement"
                  label="Complemento"
                  className={classes.textField}
                  value={this.state.address.complement} 
                  onChange={this.handleChangeAddredd('complement')}                                   
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="neighborhood"
                  label="Bairro"
                  className={classes.textField}
                  value={this.state.address.neighborhood}
                  onChange={this.handleChangeAddredd('neighborhood')}                                   
                />
              </Grid>


              <Grid item xs={4}>
                <TextField
                  id="city"
                  label="Cidade"
                  className={classes.textField}
                  value={this.state.address.city} 
                  onChange={this.handleChangeAddredd('city')}                                   
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="state"
                  label="Estado"
                  className={classes.textField}
                  value={this.state.address.states}  
                  onChange={this.handleChangeAddredd('states')}                                  
                />
              </Grid>
              <Grid item xs={5}></Grid>
              <Grid item xs={5}></Grid>
              <Grid item xs={2}>
                <Button variant="outlined" type="submit" color="primary" className={classes.button}>
                  <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                  Salvar
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

