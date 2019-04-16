import React, { Component } from 'react';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            authaccts: null,
            authdata: null,
            isach: null
        };
    }
    //Handle event when cleardata prop is true (clears all data from component state)
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.cleardata !== nextProps.cleardata && nextProps.cleardata === true) {
            this.setState({authaccts: null, authdata: null, isach: null});
        }
        return true;
    }
    updateAuth = (data) => {
        if (typeof data !== 'undefined' && (typeof data) === 'object') {
            if (data.error !== null) {
                this.props.errmodal(data.error);
            } else {
                const authdata = data.auth;
                const isAch = authdata.numbers.ach.length > 0;
                const accts = isAch ? authdata.numbers.ach : authdata.numbers.eft;
                this.setState({
                    authaccts: accts,
                    authdata: authdata,
                    isach: isAch
                });
            }
        }
    };
    authbtn_click = (e) => {
        e.preventDefault();
        this.props.apicall('auth', this.updateAuth);
    };
    render() {
        const {authaccts, authdata, isach} = this.state;
        const routingLabel = isach ? 'Routing #' : 'Institution and Branch #';
        const tablehead = authaccts !== null ? <tr><td><strong>Name</strong></td><td><strong>Balance</strong></td><td><strong>Account #</strong></td><td><strong>{routingLabel}</strong></td></tr> : null;
        return(
            <div className="item-data-row">
                <div className="item-data-row__left">
                    <div className="item-data-row__request-type">post</div>
                </div>
                <div className="item-data-row__center">
                    <div className="item-data-row__nicename">Auth</div>
                    <div className="item-data-row__endpoint">/auth/get</div>
                    <div className="item-data-row__description">Retrieve account and routing numbers
                        for checking and savings accounts.
                    </div>
                </div>
                <div className="item-data-row__right">
                    <button id="get-auth-btn"
                            className="button button--is-small button--is-default button--is-full-width" onClick={this.authbtn_click}>Send
                        request
                    </button>
                </div>
                <div className="item-data-row__response">
                    <table>
                        <tbody id="get-auth-data">{tablehead}{authaccts !== null ?
                            authaccts.map((acct, key) => {
                                // Find the account associated with this set of account and routing numbers
                                const account = authdata.accounts.filter(function(a) {
                                    return a.account_id === acct.account_id;
                                })[0];
                                return (
                                    <tr key={key}>
                                        <td>{account.name}</td>
                                        <td>${(account.balances.available != null ? account.balances.available : account.balances.current)}</td>
                                        <td>{acct.account}</td>
                                        <td>{acct.routing}</td>
                                    </tr>
                                )
                            }) : null}</tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default Auth;
