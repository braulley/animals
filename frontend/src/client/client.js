import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Header from '../header/header'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import './client.css'
import MenuItem from '@material-ui/core/MenuItem'
import ViaCep from '../service/viaCep'
import SaveIcon from '@material-ui/icons/Save'
import classNames from 'classnames'
import axios from 'axios'
import MaskedInput from 'react-text-mask'
import * as cpf from '@fnando/cpf'
import { Link } from 'react-router-dom'

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



function Phone(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/,/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

function Phone1(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

function RegisterCode(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[ /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'.',  /\d/, /\d/, /\d/,'-', /\d/, /\d/,]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

function zipCode(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/,'-',  /\d/, /\d/, /\d/,]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
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
      },
      validationError: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }


  clear (){
    let clearData = Object.assign({}, this.state.contact)
    let clearAddress = Object.assign({}, this.state.address)
    clearData.name = ''
    clearData.registerCode = ''
    clearData.nacionality = ''
    clearData.phone = ''
    clearData.phone1 = ''
    clearData.sex = ''
    clearData.type = ''
    clearData.maritalStatus = ''
    clearData.email = ''
    clearData.dateBirth = new Date()
    this.setState((state) => ({contact: clearData }) )
    clearAddress.zipCode = ''
    clearAddress.street = ' '
    clearAddress.neighborhood = ''
    clearAddress.states = ''
    clearAddress.local = ''
    clearAddress.number = 0
    clearAddress.complement = ''
    clearAddress.city = ''
    this.setState((state) => ({contact: clearAddress}))
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
          this.clear()
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
                  required                  
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="cpf"
                  label="CPF"
                  className={classes.textField}
                  value={this.state.contact.registerCode}  
                  onChange={this.handleChange('registerCode')} 
                  InputProps={{
                    inputComponent: RegisterCode,
                  }}
                  required                           
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
                  required
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
                  required                                   
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="tel"
                  label="Celular"
                  className={classes.textField}
                  value={this.state.contact.phone}
                  onChange={this.handleChange('phone')}
                  InputProps={{
                    inputComponent: Phone,
                  }}
                  required                                    
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="tel1"
                  label="Residencial"
                  className={classes.textField}
                  value={this.state.contact.phone1}
                  onChange={this.handleChange('phone1')}
                  InputProps={{
                    inputComponent: Phone1,
                  }}                                                         
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
                  InputProps={{
                    inputComponent: zipCode,
                  }}
                  required
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
              <Grid item xs={3}></Grid>
              <Grid item xs={2}>
              <Button variant="outlined" 
                color="secondary" 
                onClick={this.clear}
                className={classes.button} 
                 component={Link} to="/clients">
                  <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                  Voltar
      </Button>
              </Grid>
              <Grid item xs={2}>
                <Button variant="outlined" type="submit" color="primary" 
                className={classes.button}
                disabled={false}>
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

