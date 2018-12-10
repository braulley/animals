import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Header from '../header/header'
import purple from '@material-ui/core/colors/purple'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    display: 'flex',
    flexWrap: 'wrap',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
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
});


class Veterinary_consultation extends Component {

  state = {
    name: '',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  render() {
    const { classes } = this.props;


    return (
      <div className={classes.rootHeader}>
        <Header />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <form className={classes.container} noValidate autoComplete="off">
            <Grid container spacing={24}>
              <Grid item xs={12}>
              <TextField
                  id="standard-name"
                  label="Atendente"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="standard-name"
                  label="Nome do Cliente"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="standard-name"
                  label="Nome do Pet"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
              <TextField
                  id="standard-name"
                  label="Veterinário"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="datetime-local"
                  label="Agendamento"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
              <TextField
          id="standard-textarea"
          label="Prontuário"
          placeholder="Placeholder"
          multiline
          className={classes.textField}
          margin="normal"
        />
              </Grid>

            <Grid item xs={12} >
            <TextField
          id="standard-textarea"
          label="Receita"
          placeholder="Placeholder"
          multiline
          className={classes.textField}
          margin="normal"
        />
            </Grid>
            </Grid>
          </form>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Veterinary_consultation);
