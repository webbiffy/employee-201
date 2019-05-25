import React, { Component } from "react";
// import BankItem from "./components/bank/bank-item";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import MyAppBar from "../../appBar";

const styles = theme => ({
  button: {
    width: 30
  }
});

class BankIndex extends Component {
  state = {
    banks: []
  };

  handleDeleteBankAccount = id => {
    let db = indexedDB.open("MyData");
    db.onsuccess = event => {
      let tx = event.target.result.transaction(["bank"], "readwrite");
      let store = tx.objectStore("bank");
      let item = store.delete(Number(id));

      item.onsuccess = event => {
        this.setState({
          banks: [...this.state.banks.filter(e => e.bankId !== id)]
        });
      };
    };
  };

  componentDidMount() {
    let db = indexedDB.open("MyData");
    db.onsuccess = event => {
      let tx = event.target.result.transaction(["bank"], "readonly");
      let store = tx.objectStore("bank");
      let allItems = store.getAll();

      allItems.onsuccess = event => {
        this.setState({
          banks: event.target.result
        });
      };
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <MyAppBar />
        <div className="container-fluid">
          <div className="row">
            <b className="col-sm-3">Account Type</b>
            <b className="col-sm-3">Account No</b>
            <b className="col-sm-3">Expiration Date</b>
            <b className="col-sm-3">&nbsp;</b>
          </div>
          <ul style={{ listStyleType: "none" }}>
            {this.state.banks.map((bank, index) => (
              <li className="row" style={{ marginTop: 10 }} key={index}>
                <Link to={"/bank/edit/" + bank.bankId} className="col-sm-3">
                  {bank.name}
                </Link>
                <label className="col-sm-3">{bank.accountNo}</label>
                <label className="col-sm-3">{bank.expiration}</label>
                <div className="col-sm-3">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleDeleteBankAccount.bind(
                      this,
                      bank.bankId
                    )}
                    className={classes.button}
                  >
                    X
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <br />
          <br />
          <Button variant="outlined" color="primary">
            <Link to="/bank/add">ADD</Link>
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

BankIndex.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BankIndex);
