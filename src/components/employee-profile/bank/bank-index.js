import React, { Component } from "react";
// import BankItem from "./components/bank/bank-item";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import MyAppBar from "../../appBar";

const styles = theme => ({
  button: {
    width: 30,
    marginRight: 5
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
            <b className="col-sm-3 d-none d-sm-block">Account Type</b>
            <b className="col-sm-3 d-none d-sm-block">Account No</b>
            <b className="col-sm-3 d-none d-sm-block">Expiration Date</b>
            <b className="col-sm-3 d-none d-sm-block">Action</b>
          </div>
          <ul style={{ listStyleType: "none" }}>
            {this.state.banks.map((bank, index) => (
              <li className="row" style={{ marginTop: 10 }} key={index}>
                <label className="col-sm-3">
                  <b style={{ color: "black" }} className="d-inline d-sm-none">
                    Account Type:{" "}
                  </b>
                  {bank.name}
                </label>

                <label className="col-sm-3">
                  <b className="d-inline d-sm-none">Account No: </b>
                  {bank.accountNo}
                </label>
                <label className="col-sm-3">
                  <b className="d-inline d-sm-none">Expiration Date: </b>
                  {bank.expiration}
                </label>
                <div className="col-sm-3">
                  <Link to={"/bank/edit/" + bank.bankId}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      EDIT
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleDeleteBankAccount.bind(
                      this,
                      bank.bankId
                    )}
                    className={classes.button}
                  >
                    DELETE
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
