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
    width: 200
  }
});

class BankEdit extends Component {
  state = {
    bankId: "",
    name: "",
    accountNo: "",
    expiration: ""
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleAddBankAccountsOnClick = () => {
    var toBeInserted = {
      bankId: this.state.bankId,
      name: this.state.name,
      accountNo: this.state.accountNo,
      expiration: this.state.expiration
    };

    var result = saveToDB("bank", toBeInserted, event => {
      //console.log(event);
      this.props.history.push("/bank");
    });
  };

  componentDidMount() {
    let db = indexedDB.open("MyData");
    db.onsuccess = event => {
      let tx = event.target.result.transaction(["bank"], "readonly");
      let store = tx.objectStore("bank");
      let item = store.get(Number(this.props.match.params.id));

      item.onsuccess = event => {
        // console.log(event.target.result);
        this.setState(event.target.result);
      };
    };
  }

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
          />
          <br />
          <TextField
            id="account_no"
            label="Account No."
            className={classes.textField}
            value={this.state.accountNo}
            onChange={this.handleChange("accountNo")}
            margin="normal"
          />
          <br />
          <TextField
            id="account_expiration"
            label="Expiration"
            type="date"
            value={this.state.expiration}
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
            onClick={this.handleAddBankAccountsOnClick}
          >
            SAVE
          </Button>
          <Link style={{ marginLeft: 10 }} to="/bank">
            Back
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

BankEdit.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BankEdit);
