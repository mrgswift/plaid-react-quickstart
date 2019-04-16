import React, { Component } from 'react';

class Identity extends Component {
    constructor() {
        super();
        this.state = {
            identitydata: null
        };
    }
    //Handle event when cleardata prop is true (clears all data from component state)
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.cleardata !== nextProps.cleardata && nextProps.cleardata === true) {
            this.setState({identitydata: null});
        }
        return true;
    }
    updateIdentity = (data) => {
        if (data.error !== null) {
            this.props.errmodal(data.error);
        } else {
            this.setState({identitydata: data.identity.identity});
        }
    };
    transbtn_click = (e) => {
        e.preventDefault();
        this.props.apicall('identity', this.updateIdentity);
    };
    render() {
        const {identitydata} = this.state;
        const tablehead = identitydata !== null ? <tr className="response-row response-row--is-identity">
            <td><strong>Names</strong></td>
            <td><strong>Emails</strong></td>
            <td><strong>Phone numbers</strong></td>
            <td><strong>Addresses</strong></td>
        </tr> : null;
        return(
            <div className="item-data-row">
                <div className="item-data-row__left">
                    <div className="item-data-row__request-type">post</div>
                </div>
                <div className="item-data-row__center">
                    <div className="item-data-row__nicename">Identity</div>
                    <div className="item-data-row__endpoint">/identity/get</div>
                    <div className="item-data-row__description">Retrieve Identity information on
                        file with the bank. Reduce fraud by comparing user-submitted data to
                        validate identity.
                    </div>
                </div>
                <div className="item-data-row__right">
                    <button id="get-identity-btn"
                            className="button button--is-small button--is-default button--is-full-width" onClick={this.transbtn_click}>Send
                        request
                    </button>
                </div>
                <div className="item-data-row__response">
                    <table>
                        <tbody id="get-identity-data">
                        {tablehead}
                        {identitydata !== null ?
                            <tr className="response-row response-row--is-identity">
                                <td>
                                    {identitydata.names.map((name, key) => {
                                        return name + "\n\n";
                                    })}
                                </td>
                                <td>
                                    {identitydata.emails.map((email, key) => {
                                        return email.data + "\n\n";
                                    })}
                                </td>
                                <td>
                                    {identitydata.phone_numbers.map((number, key) => {
                                        return number.data + "\n\n";
                                    })}
                                </td>
                                <td>
                                    {identitydata.addresses.map((address, key) => {
                                        return (
                                            <p key={key}>{address.data.street}<br/>
                                                {address.data.city + ', ' + address.data.state + ' ' + address.data.zip}</p>
                                        )
                                    })}
                                </td>
                            </tr> : null
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default Identity;
