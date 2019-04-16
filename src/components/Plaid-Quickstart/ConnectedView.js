import React, { Component, Fragment } from 'react';
import ItemOverview from "./partials/ItemOverview";
import Auth from "./partials/Auth";
import Transactions from "./partials/Transactions";
import Identity from "./partials/Identity";
import Balance from "./partials/Balance";
import Item from "./partials/Item";
import Accounts from "./partials/Accounts";
import Invalidate from "./partials/Invalidate";
import Modal from "./partials/Modal";

class ConnectedView extends Component {
    constructor() {
        super();
        this.state = {
            clearall: false,
            isModalOpen: false,
            modalcontent: null
        }
    }
    /**
     * Trigger clear all data in all sub-components
     */
    clearall = () => {
        this.setState({clearall: true},() =>{
            setTimeout(() => {
                this.setState({clearall: false});
            },300)
        })
    };
    /**
     * Toggle showing modal
     * @param content
     */
    toggleModal = (content) => {
        const mcontent = typeof content !== 'undefined' ? content : null;
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            modalcontent: mcontent
        });
    };
    /**
     * Function to handle creating an error message modal
     * @param error
     */
    errorModal = (error) => {
        const errormsg =
        <Fragment>
            <h3 className="box__heading">An Error Occurred</h3> <br/>
            <span><strong>Error Information:</strong></span><br />
            <span>error_message: {error.error_message}</span> <br />
            <span>error_code: {error.error_code}</span><br/>
            <span>error_type: {error.error_type}</span><br/>
        </Fragment>;
        this.toggleModal(errormsg);
    };
    render() {
        const {access_token, apicall, item_id, rotatetoken} = this.props;
        const {clearall, isModalOpen, modalcontent} = this.state;
        return(
            <div id="app" className="connected-view">
                <ItemOverview access_token={access_token} item_id={item_id}/>
                <p>Now that you have an access_token you can make all of the following API requests:</p>
                {isModalOpen ?
                    <Modal show={isModalOpen}
                           onClose={this.toggleModal}>
                        {modalcontent}
                    </Modal>
                    :
                    <Fragment>
                        <div className="box">
                            <h3 className="box__heading">Products</h3>
                            <Auth apicall={apicall} cleardata={clearall} errmodal={this.errorModal}/>
                            <Transactions apicall={apicall} cleardata={clearall} errmodal={this.errorModal}/>
                            <Identity apicall={apicall} cleardata={clearall} errmodal={this.errorModal}/>
                            <Balance apicall={apicall} cleardata={clearall} errmodal={this.errorModal}/>
                        </div>

                        <div className="box">
                            <h3 className="box__heading">Item management</h3>
                            <Item apicall={apicall} cleardata={clearall} errmodal={this.errorModal}/>
                            <Accounts apicall={apicall} cleardata={clearall} errmodal={this.errorModal}/>
                            <Invalidate clearall={this.clearall} updatetoken={rotatetoken} errmodal={this.errorModal} modal={this.toggleModal}/>
                        </div>
                    </Fragment>
                }
            </div>
        )
    }
}
export default ConnectedView;
