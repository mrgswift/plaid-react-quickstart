import React, { Component } from 'react';

class Accounts extends Component {
    constructor() {
        super();
        this.state = {
            accounts: null
        };
    }
    //Handle event when cleardata prop is true (clears all data from component state)
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.cleardata !== nextProps.cleardata && nextProps.cleardata === true) {
            this.setState({accounts: null});
        }
        return true;
    }
    updateAccts = (data) => {
        if (data.error !== null) {
            this.props.errmodal(data.error);
        } else {
            this.setState({accounts: data.accounts.accounts});
        }
    };
    acctsbtn_click = (e) => {
        e.preventDefault();
        this.props.apicall('accounts', this.updateAccts);
    };
    render() {
        const {accounts} = this.state;
        const tablehead = accounts !== null ? <tr><td><strong>Name</strong></td><td><strong>Balances</strong></td><td><strong>Subtype</strong></td><td><strong>Mask</strong></td></tr> : null;
        return(
            <div className="item-data-row">
                <div className="item-data-row__left">
                    <div className="item-data-row__request-type">post</div>
                </div>
                <div className="item-data-row__center">
                    <div className="item-data-row__nicename">Accounts</div>
                    <div className="item-data-row__endpoint">/accounts/get</div>
                    <div className="item-data-row__description">Retrieve high-level information
                        about all accounts associated with an Item.
                    </div>
                </div>

                <div className="item-data-row__right">
                    <button id="get-accounts-btn"
                            className="button button--is-small button--is-default button--is-full-width" onClick={this.acctsbtn_click}>Send
                        request
                    </button>
                </div>

                <div className="item-data-row__response">
                    <table>
                        <tbody id="get-accounts-data">
                        {tablehead}
                        {
                            accounts !== null ?
                                accounts.map((acct, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{acct.name}</td>
                                            <td>${(acct.balances.available != null ? acct.balances.available : acct.balances.current)}</td>
                                            <td>{acct.subtype}</td>
                                            <td>{acct.mask}</td>
                                        </tr>
                                    )
                                })
                                : null
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default Accounts;
