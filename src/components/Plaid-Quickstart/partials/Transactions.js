import React, { Component } from 'react';

class Transactions extends Component {
    constructor() {
        super();
        this.state = {
            transactions: null
        };
    }
    //Handle event when cleardata prop is true (clears all data from component state)
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.cleardata !== nextProps.cleardata && nextProps.cleardata === true) {
            this.setState({transactions: null});
        }
        return true;
    }
    updateTrans = (data) => {
        if (data.error !== null) {
            this.props.errmodal(data.error);
        } else {
            this.setState({transactions: data.transactions.transactions});
        }
    };
    transbtn_click = (e) => {
        e.preventDefault();
        this.props.apicall('transactions', this.updateTrans);
    };
    render() {
        const {transactions} = this.state;
        const tableheading = transactions !== null ? <tr><td><strong>Name</strong></td><td><strong>Amount</strong></td><td><strong>Date</strong></td></tr> : null;
        return(
            <div className="item-data-row">
                <div className="item-data-row__left">
                    <div className="item-data-row__request-type">post</div>
                </div>
                <div className="item-data-row__center">
                    <div className="item-data-row__nicename">Transactions</div>
                    <div className="item-data-row__endpoint">/transactions/get</div>
                    <div className="item-data-row__description">Retrieve transactions for credit and
                        depository accounts.
                    </div>
                </div>
                <div className="item-data-row__right">
                    <button id="get-transactions-btn"
                            className="button button--is-small button--is-default button--is-full-width" onClick={this.transbtn_click}>Send
                        request
                    </button>
                </div>
                <div className="item-data-row__response">
                    <table>
                        <tbody id="get-transactions-data">{tableheading}{ transactions !== null  && !this.props.cleardata ?
                                transactions.map((txn, key) => {
                                   return (
                                       <tr key={key}>
                                           <td>{txn.name}</td>
                                           <td>${txn.amount}</td>
                                           <td>{txn.date}</td>
                                       </tr>
                                   )
                                })
                            : null
                        }</tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default Transactions;
