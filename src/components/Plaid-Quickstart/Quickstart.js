import React, { Component } from 'react';
import './assets/plaid-quickstart.css';
import Banner from "./Banner";
import InitialView from "./InitialView";
import ConnectedView from "./ConnectedView";
import axios from "axios/index";

class Quickstart extends Component {
    constructor() {
        super();
        //Initial state with null values for condition checks
        this.state = {
            connected: false, //Whether Plaid Link successfully authenticated/connected
            progresscircles: false, //Show Progress Circles
            metadata: null,
            public_token: null,
            access_token: null,
            item_id: null,
            apiresp: null
        }
    }

    /**
     * Check if all necessary parameters have a value for our API transactions
     * @param checkaccesstoken {boolean}
     * @returns {boolean}
     */
    apiConfigIsValid = (checkaccesstoken) => this.state.public_token !== null && typeof process.env.REACT_APP_API_SERVER_URL !== 'undefined' && ((typeof checkaccesstoken !== 'undefined' && ((checkaccesstoken && this.state.access_token !== null) || !checkaccesstoken)) || typeof checkaccesstoken === 'undefined');

    /**
     * Function to generate axios headers object with access_token to use in axios transaction
     * Add additional headers using extraheaders parameter
     * @param extraheaders
     */
    prepareAuthHeaders = (extraheaders) => {
        const axiosconfig = {};
        const headers = {};
        const {access_token} = this.state;
        headers.Authorization = 'Bearer ' + access_token;
        if (typeof extraheaders !== 'undefined') {
            for (var ekey in extraheaders){
                if (extraheaders.hasOwnProperty(ekey)) {
                    headers[ekey] = extraheaders[ekey];
                }
            }
        }
        axiosconfig.headers = headers;
        return axiosconfig;
    };

    /**
     * Function to handle successful Plaid Link connect
     * @param public_token
     * @param metadata
     */
    connectWithPublicToken = (public_token, metadata) => {
        this.setState({
            metadata: metadata,
            public_token: public_token,
            progresscircles: true
        },() => {
            //After public_token is set get the access_token
            this.getAccessToken();
        });
    };
    /**
     * Primary handler for all GET API calls
     * @param callname
     * @param callback
     */
    getFromAPI = (callname, callback) => {
        if (this.apiConfigIsValid(true)) {
            let validcalls = [];
            try {
                validcalls = JSON.parse(process.env.REACT_APP_API_SERVER_CALLS);
            } catch (err) {
                throw new Error('REACT_APP_API_SERVER_CALLS value in .env file is not a valid JSON array');
            }
            if (typeof callname !== 'undefined' && validcalls.includes(callname) ) {
                axios.get(process.env.REACT_APP_API_SERVER_URL + '/' + callname, this.prepareAuthHeaders()).then(function (res) {
                    const getType = {};
                    const isfunc = callback && getType.toString.call(callback) === '[object Function]';
                    if (isfunc) {
                        callback(res.data);
                    }
                }).catch(function (error) {
                    console.error(error.toString());
                });
            } else {
                console.error('Call to getFromAPI function with invalid/undefined callname');
            }
        }
    };

    /**
     * Callback function to retrieve access_token, item_id from our API server and change connected state
     */
    getAccessToken = () => {
        if (this.apiConfigIsValid()) {
            const postdata = {
                public_token: this.state.public_token,
            };
            axios.post(process.env.REACT_APP_API_SERVER_URL + '/get_access_token', postdata).then((res) => {
                if (res.data.error === null) {
                    this.setState({
                        connected: true,
                        access_token: res.data.access_token,
                        item_id: res.data.item_id,
                        progresscircles: false
                    })
                } else {
                    console.error(res.data.error);
                }
            }).catch(function (error) {
                console.error(error.toString());
            });
        } else {
            this.state.public_token === null ?
              console.error('Required parameter public_token is null. Unable to retrieve access_token.')
            : console.error('Required parameter REACT_APP_API_SERVER_URL is not defined. This needs to be defined in your .env file.');
        }
    };
    /**
     * Function to rotate access token
     * @param callback
     */
    rotateAccessToken = (callback) => {
        const postdata = {};
        const getType = {};
        const isfunc = callback && getType.toString.call(callback) === '[object Function]';
        axios.post(process.env.REACT_APP_API_SERVER_URL + '/invalidate_access_token', postdata, this.prepareAuthHeaders()).then((res) => {
            if (res.data.error === null) {
                this.setState({
                    access_token: res.data.access_token,
                },() => {
                    if (isfunc) {
                        callback(res.data.access_token);
                    }
                })
            } else {
                if (isfunc) {
                    callback(res.data);
                }
                console.error(res.data.error);
            }
        }).catch(function (error) {
            console.error(error.toString());
        });
    };

    render(){
        const {access_token, connected, item_id, progresscircles} = this.state;
        //Display InitialView if not connected and ConnectedView if connected
        return(
            <div className="grid">
                <div className="grid__column grid__column--is-twelve-columns">
                    {!progresscircles && <Banner connected={connected}/>}
                    {!connected && <InitialView connect={this.connectWithPublicToken} progresscircles={progresscircles}/>}
                    {connected && <ConnectedView access_token={access_token} apicall={this.getFromAPI} item_id={item_id} rotatetoken={this.rotateAccessToken}/>}
                </div>
            </div>
        )
    }
}
export default Quickstart;
