import React, { Component } from 'react';

class ItemOverview extends Component {
    render() {
        return(
            <div className="item-overview">
                <div className="item-overview__column">
                    <h3 className="item-overview__heading">item_id</h3>
                    <p className="item-overview__id" id="item_id">{this.props.item_id}</p>
                </div>
                <div className="item-overview__column">
                    <h3 className="item-overview__heading">access_token</h3>
                    <p className="item-overview__id"
                       id="access_token">{this.props.access_token}</p>
                </div>

                <div style={{clear: 'both'}}/>
            </div>
        )
    }
}
export default ItemOverview;
