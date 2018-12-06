import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Header from '../header/header'
import Input from '@material-ui/core/Input'
import './pet.css'

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
  button: {
    margin: theme.spacing.unit,
  },
});


class Pet extends React.Component {
  state = {
    activeStep: 0,
    completed: {},
    step: 1,
  };


  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

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
                <div className={classes.containerInput}>
                  <Input
                    placeholder="Nome Cliente"
                    className="input"
                    inputProps={{
                      'aria-label': 'Description',
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.containerInput}>

                  <Input
                    placeholder="Nome Pet"
                    className="input"
                    inputProps={{
                      'aria-label': 'Description',
                    }}
                  />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className={classes.containerInput}>
                  <Input
                    placeholder="Raça"
                    className="input"
                    inputProps={{
                      'aria-label': 'Description',
                    }}
                  />
                </div>
              </Grid>

              <Grid item xs={3}>
                <div className={classes.containerInput}>
                  <Input
                    placeholder="Peso"
                    className="input"
                    inputProps={{
                      'aria-label': 'Description',
                    }}
                  />
                </div>
              </Grid>

              <Grid item xs={3}>
                <div className={classes.containerInput}>
                  <Input
                    placeholder="Altura"
                    className="input"
                    inputProps={{
                      'aria-label': 'Description',
                    }}
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className={classes.containerInput}>
                  <Input
                    placeholder="Tipo de Animal"
                    className="input"
                    inputProps={{
                      'aria-label': 'Description',
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className={classes.containerInput}>
                  <Input
                    placeholder="Observação"
                    className="input"
                    inputProps={{
                      'aria-label': 'Description',
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" color="primary" className={classes.button}>
                  Salvar
                </Button> 

                <Button variant="outlined" color="secondary" className={classes.button}>
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
