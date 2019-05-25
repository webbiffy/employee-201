import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { saveToDB } from "../../../Database";
import MyAppBar from "../../appBar";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

class BankAdd extends Component {
  state = {
    name: "",
    account_no: "",
    expiration: ""
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleAddBankAccountsOnClick = () => {
    var toBeInserted = {
      name: this.state.name,
      accountNo: this.state.account_no,
      expiration: this.state.expiration
    };

    var result = saveToDB("bank", toBeInserted, event => {
      console.log(event);
      this.props.history.push("/bank");
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <MyAppBar />
        <div className="container-wrapper">
          <h3>Add Bank Account</h3>
          <TextField
            id="bank_name"
            label="Bank Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange("name")}
            margin="normal"
          />{" "}
          <br />
          <TextField
            id="account_no"
            label="Account No."
            className={classes.textField}
            value={this.state.account_no}
            onChange={this.handleChange("account_no")}
            margin="normal"
          />
          <br />
          <TextField
            id="account_expiration"
            label="Expiration"
            type="date"
            defaultValue={this.state.expiration}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            onChange={this.handleChange("expiration")}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleAddBankAccountsOnClick}
          >
            SAVE
          </Button>
          <Link to="/bank">Back</Link>
        </div>
      </React.Fragment>
    );
  }
}

BankAdd.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BankAdd);
