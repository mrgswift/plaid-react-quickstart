import React, { Component, Fragment } from 'react';

class Invalidate extends Component {
    constructor() {
        super();
        this.state = {
            access_token: null
        };
    }
    updateToken = (token) => {
        if (typeof token.error !== 'undefined') {
            this.props.errmodal(token.error);
        } else {
            this.props.clearall();
            const modalcontent = <Fragment>
                <h3 className="box__heading">Access Token Rotation</h3>
                <span>The ACCESS_TOKEN token was successfully changed to</span><br/>
                <span style={{fontWeight: 600}}>{token}</span><br/>
                <span>You can repeat testing with this value.</span>
            </Fragment>;
            this.props.modal(modalcontent);
        }
    };
    invalidatebtn_click = (e) => {
        e.preventDefault();
        this.props.updatetoken(this.updateToken);
    };
    render() {
        return(
            <div className="item-data-row">
                <div className="item-data-row__left">
                    <div className="item-data-row__request-type">post</div>
                </div>
                <div className="item-data-row__center">
                    <div className="item-data-row__nicename">Item</div>
                    <div className="item-data-row__endpoint">/item/access_token/invalidate</div>
                    <div className="item-data-row__description">Rotate the access_token associated
                        with an Item.
                    </div>
                </div>

                <div className="item-data-row__right">
                    <button id="invalidate-token-btn"
                            className="button button--is-small button--is-default button--is-full-width" onClick={this.invalidatebtn_click}>Send
                        request
                    </button>
                </div>

                <div className="item-data-row__response">
                    <p id="invalidate-token-data" style={{display: 'inline-block', paddingTop: '10px'}}/>
                </div>
            </div>
        )
    }
}
export default Invalidate;
