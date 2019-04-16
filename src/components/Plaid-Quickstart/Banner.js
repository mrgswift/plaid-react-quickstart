import React, { Component } from 'react';
import './assets/plaid-quickstart.css';

class Banner extends Component {
    render() {
        const {connected} = this.props;
        //Change Banner area based on if Plaid Link has been connected sucessfully
        return(
            <div id="banner" className="everpresent-content">
                <h1 className="everpresent-content__heading">Plaid Quickstart</h1>
                {connected ?
                    <p id="steps" className="everpresent-content__subheading">
                        Success! You just created an Item by linking your account.
                    </p>
                :
                    <p id="intro" className="everpresent-content__subheading">
                        An example application that outlines an end-to-end integration with Plaid
                    </p>
                }
            </div>
        );
    }
}
export default Banner;
