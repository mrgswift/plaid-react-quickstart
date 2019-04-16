import React, { Component, Fragment } from 'react';

class Item extends Component {
    constructor() {
        super();
        this.state = {
            itemdata: null
        };
    }
    //Handle event when cleardata prop is true (clears all data from component state)
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.cleardata !== nextProps.cleardata && nextProps.cleardata === true) {
            this.setState({itemdata: null});
        }
        return true;
    }
    updateItem = (data) => {
        if (data.error !== null) {
            this.props.errmodal(data.error);
        } else {
            this.setState({itemdata: data});
        }
    };
    itembtn_click = (e) => {
        e.preventDefault();
        this.props.apicall('item', this.updateItem);
    };
    render() {
        const {itemdata} = this.state;
        return(
            <div className="item-data-row">
                <div className="item-data-row__left">
                    <div className="item-data-row__request-type">post</div>
                </div>
                <div className="item-data-row__center">
                    <div className="item-data-row__nicename">Item</div>
                    <div className="item-data-row__endpoint">/item/get</div>
                    <div className="item-data-row__description">Retrieve information about an Item,
                        like the institution, billed products, available products, and webhook
                        information.
                    </div>
                </div>

                <div className="item-data-row__right">
                    <button id="get-item-btn"
                            className="button button--is-small button--is-default button--is-full-width" onClick={this.itembtn_click}>Send
                        request
                    </button>
                </div>

                <div className="item-data-row__response">
                    <table>
                        <tbody id="get-item-data">
                        {itemdata !== null ?
                            <Fragment>
                                <tr><td>Institution name</td><td>{itemdata.institution.name}</td></tr>
                                <tr><td>Billed products</td><td>{itemdata.item.billed_products.join(', ')}</td></tr>
                                <tr><td>Available products</td><td>{itemdata.item.available_products.join(', ')}</td></tr>
                            </Fragment>
                            : null
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default Item;
