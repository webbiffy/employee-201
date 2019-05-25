import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/Inbox";
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10
  }
};

class MyAppBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
      menu: "Employee Profile",
      link: "/"
    };
  }
  render() {
    const { classes } = this.props;
    const { opened } = this.state;

    const toggleDrawer = isOpen => event => {
      if (
        event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      this.setState({ opened: isOpen });
    };

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon onClick={toggleDrawer(true)} />
            </IconButton>
            <Typography variant="h6" color="inherit">
              <Link
                style={{ textDecoration: "none", color: "White" }}
                to={this.state.link}
              >
                {this.state.menu}
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={opened}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <List>
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <Link
                style={{ textDecoration: "none", color: "Black" }}
                to="/bank"
              >
                <ListItemText primary="Bank Account" />
              </Link>
            </ListItem>
          </List>
        </SwipeableDrawer>
      </div>
    );
  }
}

MyAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyAppBar);
