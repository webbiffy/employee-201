import React, { Component } from "react";
// import BankItem from "./components/bank/bank-item";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import MyAppBar from "../../appBar";

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  label: {
    paddingRight: 10
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
        <div className="container-wrapper">
          <ul style={{ listStyleType: "none" }}>
            {this.state.banks.map((bank, index) => (
              <li key={index}>
                <Link
                  to={"/bank/edit/" + bank.bankId}
                  className={classes.label}
                >
                  {bank.name}
                </Link>
                <label className={classes.label}>{bank.accountNo}</label>
                <label className={classes.label}>{bank.expiration}</label>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={this.handleDeleteBankAccount.bind(this, bank.bankId)}
                >
                  X
                </Button>
              </li>
            ))}
          </ul>
          <br />
          <br />
          <Button variant="outlined" color="primary" className={classes.button}>
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
