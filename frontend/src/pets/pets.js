import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Header from '../header/header'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'
import NavigationIcon from '@material-ui/icons/Navigation'
import { Link } from 'react-router-dom'
import axios from 'axios'


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700
  },
  rootLayout: {
    flexGrow: 1,
  },
  paperLayout: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  rootHeader: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class Pets extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      rows: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/pets')
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  }
  render() {
    const { classes } = this.props;



    return (
      <div className={classes.rootHeader}>
        <Header />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <h2>Lista de Pets</h2>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={1} >
              <Link to="/pet">
                <Fab color="primary" aria-label="Add" className={classes.fab}>
                  <AddIcon />
                </Fab>
              </Link>
            </Grid>
            <Grid item xs={1}>
              <Fab variant="extended" aria-label="Delete" className={classes.fab}>
                <NavigationIcon className={classes.extendedIcon} />Filtro
              </Fab>
            </Grid>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Dessert (100g serving)</TableCell>
                      <TableCell >Calories</TableCell>
                      <TableCell >Fat (g)</TableCell>
                      <TableCell >Carbs (g)</TableCell>
                      <TableCell >Protein (g)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => {
                      return (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell >{row.calories}</TableCell>
                          <TableCell >{row.fat}</TableCell>
                          <TableCell >{row.carbs}</TableCell>
                          <TableCell >{row.protein}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

Pets.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pets);
