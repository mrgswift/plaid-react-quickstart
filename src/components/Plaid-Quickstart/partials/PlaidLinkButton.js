import React, { Component, Fragment } from 'react';
import PlaidLink from "react-plaid-link";

class PlaidLinkButton extends Component {
    /**
     * Callback function to handle successful Plaid Link connect
     * @param token
     * @param metadata
     */
    handleOnSuccess = (token, metadata) => {
        this.props.connect(token, metadata);
    };

    /**
     * Callback function to handle user exiting Plaid Link
     */
    handleOnExit = () => {
        console.log('user exited link');
    };

    render() {
        //Make sure REACT_APP_PLAID_PRODUCTS environment variable is a valid JSON array
        let plaid_products;
        try {
            plaid_products = JSON.parse(process.env.REACT_APP_PLAID_PRODUCTS);
        } catch(err) {
            throw new Error('REACT_APP_PLAID_PRODUCTS value in .env file is not a valid JSON array');
        }
      return(
         <Fragment>
              <p className="initial-view__description">
                  Click the button below to open a list of Institutions. After you select one, you’ll be
                  guided through an authentication process. Upon completion, a public_token will be passed
                  back to the server and exchanged for access_token.
              </p>
              <PlaidLink ref="linkbtn" className="button button--is-primary"
                  style={{}} //No need for default inline styles
                  clientName={process.env.REACT_APP_PLAID_CLIENT_NAME}
                  env={process.env.REACT_APP_PLAID_ENVIRONMENT}
                  product={plaid_products}
                  apiVersion={process.env.REACT_APP_PLAID_API_VER}
                  publicKey={process.env.REACT_APP_PLAID_PUBLIC_KEY}
                  onExit={this.handleOnExit}
                  onSuccess={this.handleOnSuccess}>
                  {process.env.REACT_APP_PLAID_LINK_BTN_LABEL}
              </PlaidLink>
         </Fragment>
      );
    }
}
export default PlaidLinkButton;
