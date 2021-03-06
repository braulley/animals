import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Header from '../header/header'
import Autosuggest from 'react-autosuggest'
import Paper from '@material-ui/core/Paper'
import match from 'autosuggest-highlight/umd/match'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import deburr from 'lodash/deburr'
import parse from 'autosuggest-highlight/umd/parse'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './pet.css'

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
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
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

const suggestions = []

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => { }, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            );
        })}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  console.log('value',value)
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;
  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
      const keep =
        count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

class Pet extends React.Component {

  constructor(props){
    super(props);    
    this.state = {
      single: '',
      suggestions: [],
      pet: {
        nameClient: '',
        name: '',
        breed: '',
        weight: 0,
        height: 0,
        typeOfAnimal: '',
        observation: '',
      }
    };
  }  

  clear() {
    let pets = Object.assign({}, this.state.pet)
    pets.name = ''
    pets.nameClient = ''
    pets.typeOfAnimal = ''
    pets.weight = 0
    pets.height = 0
    pets.breed = ''
    pets.observation = ''
    this.setState((state) => ({pet: pets}))
  }
  
  componentDidMount() {
    let clients;
    axios.get('http://localhost:4000/users/userClient')
      .then(res => {
        clients = res.data.rows
        clients.forEach(element => {
          suggestions.push({label: element.name })
        })
      }).catch(err => {
        console.log(err)
      })
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => event => {
    let pet = Object.assign({}, this.state.pet)
    pet[name] = event.target.value
    this.setState((state) => ({ pet: pet }))
  }

  save = () => {
    let data = this.state.pet
    axios.post(`http://localhost:4000/pets/save`, {data})
      .then(data => {
        console.log(data)
        this.clear()
      }).catch(err => {
        console.log(err)
    })
  }


  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };
    return (
      <div className={classes.rootHeader}>
        <Header />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.rootLayout}>

            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography component="h2" variant="headline" gutterBottom>
                  Cadastro de Pets
              </Typography>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.root}>
                  <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                      classes,
                      placeholder: 'Nome do Cliente',
                      value: this.state.pet.nameClient,
                      onChange: this.handleChange('nameClient'),
                    }}
                    theme={{
                      container: classes.container,
                      suggestionsContainerOpen: classes.suggestionsContainerOpen,
                      suggestionsList: classes.suggestionsList,
                      suggestion: classes.suggestion,
                    }}
                    renderSuggestionsContainer={options => (
                      <Paper {...options.containerProps} square>
                        {options.children}
                      </Paper>
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.root}>
                  <TextField
                    id="name"
                    fullWidth
                    label="Nome Pet"
                    className="input"
                    value={this.state.pet.name}
                    onChange={this.handleChange('name')}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.root}>
                  <TextField
                    id="breed"
                    fullWidth
                    label="Raça"
                    className="input"
                    value={this.state.pet.breed}
                    onChange={this.handleChange('breed')}
                  />
                </div>
              </Grid>

              <Grid item xs={3}>
                <div className={classes.root}>
                  <TextField
                    id="weight"
                    fullWidth
                    label="Peso"
                    className="input"
                    type="number"
                    value={this.state.pet.weight}
                    onChange={this.handleChange('weight')}
                  />
                </div>
              </Grid>

              <Grid item xs={3}>
                <div className={classes.containerInput}>
                  <TextField
                    id="height"
                    fullWidth
                    label="Altura"
                    type="number"
                    className="input"
                    value={this.state.pet.height}
                    onChange={this.handleChange('height')}
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className={classes.containerInput}>
                  <TextField
                    id="typeOfAnimal"
                    fullWidth
                    label="Tipo de Animal"
                    className="input"
                    value={this.state.pet.typeOfAnimal}
                    onChange={this.handleChange('typeOfAnimal')}
                  />
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className={classes.containerInput}>
                  <TextField
                    id="observation"
                    fullWidth
                    label="Observação"
                    className="input"
                    value={this.state.pet.observation}
                    onChange={this.handleChange('observation')}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" color="primary" 
                  className={classes.button}
                  onClick={this.save}
                  >
                  Salvar
                </Button>

                <Button variant="outlined" color="secondary" 
                  className={classes.button}
                  component={Link} to="/pets" >                
                  Voltar
                </Button>
              </Grid>
            </Grid>
          </div>
        </main>
      </div>
    );
  }
}

Pet.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Pet);
