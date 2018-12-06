import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
import Collapse from '@material-ui/core/Collapse'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'
import ListSubheader from '@material-ui/core/ListSubheader'


const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  rootList: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class Header extends React.Component {
  state = {
    client: true,
    pet: true,
  };

  handleClick(t, e) {
    if (t == 'client') {
      this.setState(state => ({ client: !state.client }));
    }
    if (t == 'pet') {
      this.setState(state => ({ pet: !state.pet }));
    }
  }



  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Clínica Veterinária
              </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List component="nav" subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
            className={classes.rootList}>
            <ListItem button onClick={(e) => this.handleClick('client', e)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText inset primary="Clientes" />
              {this.state.client ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.client} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/client">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText inset primary="Cadastrar" />
                  </ListItem>
                </Link>
                <Link to="/clients">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText inset primary="Lista de Clientes" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
            <ListItem button onClick={(e) => this.handleClick('pet', e)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText inset primary="Pets" />
              {this.state.pet ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.pet} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/pet">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText inset primary="Cadastrar" />
                  </ListItem>
                </Link>

                <Link to="/pets">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText inset primary="Lista de Pets" />
                  </ListItem>
                </Link>

              </List>
            </Collapse>

            <ListItem button onClick={(e) => this.handleClick('user', e)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText inset primary="Funcionários" />
              {this.state.client ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.client} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/user">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText inset primary="Cadastrar" />
                  </ListItem>
                </Link>
                <Link to="/users">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText inset primary="Lista de Usuários" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
          </List>
          <Divider />
          <List component="nav">
            <ListItem button>
              <ListItemText primary="Trash" />
            </ListItem>
            <ListItemLink href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemLink>
          </List>
        </Drawer>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
