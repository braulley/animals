import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FaceIcon from '@material-ui/icons/FaceOutlined'
import PetIcon from '@material-ui/icons/PetsOutlined'
import SupervisorIcon from '@material-ui/icons/SupervisorAccountOutlined'
import ScheduleIcon from '@material-ui/icons/ScheduleOutlined'
import LibraryIcon from '@material-ui/icons/LibraryAddOutlined'
import AddIcon from '@material-ui/icons/AddOutlined'
import ShoppingIcon from '@material-ui/icons/ShoppingCartSharp'
import ListIcon from '@material-ui/icons/ListAltOutlined'
import ShopCartIcon from '@material-ui/icons/ShoppingCartOutlined'
import { Link } from 'react-router-dom'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import './header.css'

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    flexGrow: 1,
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
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class Header extends React.Component {
  state = {
    client: false,
    pet: false,
    user: false,
    veterinary_consultation: false,
    product: false,
    sales: false,
    anchorEl: null,
  };

  handleClick(t, e) {
    if (t == 'client') {
      this.setState(state => ({ client: !state.client }));
    }
    if (t == 'pet') {
      this.setState(state => ({ pet: !state.pet }));
    }
    if (t == 'user') {
      this.setState(state => ({ user: !state.user }));
    }
    if (t == 'veterinary_consultation') {
      this.setState(state => ({ veterinary_consultation: !state.veterinary_consultation }));
    }
    if (t == "product") {
      this.setState(state => ({ product: !state.product }));
    }
    if (t == "sale") {
      this.setState(state => ({ sales: !state.sales }));
    }

  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };



  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Clínica São Judas
              </Typography>
            <div className="floatRigh">
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"                
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
              </Menu>
            </div>
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
          <List component="nav" subheader={<ListSubheader component="div">Clínica Veterinária e Petshop</ListSubheader>}
            className={classes.rootList}>
            <ListItem button onClick={(e) => this.handleClick('client', e)}>
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText inset primary="Clientes" />
              {this.state.client ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.client} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/client">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Cadastrar" />
                  </ListItem>
                </Link>
                <Link to="/clients">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Lista de Clientes" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
            <ListItem button onClick={(e) => this.handleClick('pet', e)}>
              <ListItemIcon>
                <PetIcon />
              </ListItemIcon>
              <ListItemText inset primary="Pets" />
              {this.state.pet ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.pet} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/pet">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Cadastrar" />
                  </ListItem>
                </Link>

                <Link to="/pets">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Lista de Pets" />
                  </ListItem>
                </Link>

              </List>
            </Collapse>

            <ListItem button onClick={(e) => this.handleClick('user', e)}>
              <ListItemIcon>
                <SupervisorIcon />
              </ListItemIcon>
              <ListItemText inset primary="Funcionários" />
              {this.state.user ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.user} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/user">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Cadastrar" />
                  </ListItem>
                </Link>
                <Link to="/users">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Lista de Usuários" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>

            <ListItem button onClick={(e) => this.handleClick('veterinary_consultation', e)}>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText inset primary="Consultas" />
              {this.state.veterinary_consultation ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.veterinary_consultation} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/veterinary_consultation">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Registrar Consultas" />
                  </ListItem>
                </Link>
                <Link to="/veterinary_consultations">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Lista de Consultas" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>


            <ListItem button onClick={(e) => this.handleClick('product', e)}>
              <ListItemIcon>
                <LibraryIcon />
              </ListItemIcon>
              <ListItemText inset primary="Produtos" />
              {this.state.product ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.product} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/product">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Cadastrar" />
                  </ListItem>
                </Link>

                <Link to="/products">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Lista de Produtos" />
                  </ListItem>
                </Link>

              </List>
            </Collapse>


            <ListItem button onClick={(e) => this.handleClick('sale', e)}>
              <ListItemIcon>
                <ShopCartIcon />
              </ListItemIcon>
              <ListItemText inset primary="Vendas" />
              {this.state.sales ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.sales} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/sale">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <ShoppingIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Nova Venda" />
                  </ListItem>
                </Link>

                <Link to="/salesDone">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Registros de Vendas" />
                  </ListItem>
                </Link>

              </List>
            </Collapse>
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
