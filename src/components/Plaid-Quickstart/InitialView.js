import React, { Component } from 'react';
import ProgressCircles from "./partials/ProgressCircles";
import PlaidLinkButton from "./partials/PlaidLinkButton";

class InitialView extends Component {
    render() {
        return(
            <div id="container" className="initial-view">
                {this.props.progresscircles ?
                    <ProgressCircles/>
                    :
                    <PlaidLinkButton connect={this.props.connect}/>
                }
            </div>
        )
    }
}
export default InitialView;
