import React, { Component } from 'react';

class ProgressCircles extends Component {
    constructor() {
        super();
        this.state = {
            circlenum: 0,
            dclasses: []
        };
    }
    componentDidMount() {
       this.rotateCircles();
    }
    componentWillUnmount() {
        clearTimeout(this.state.pcircletimer);
    }
    rotateCircles = () => {
       let {circlenum} = this.state;
       circlenum = circlenum >= 4 ? 1 : circlenum + 1;
       let i, classarr = [], classval;
       for (i=1; i<=4; i++) {
            classval = i === circlenum ? 'dark' : '';
            classarr.push(classval);
       }
       this.setState({
           dclasses: classarr,
           circlenum: circlenum,
           pcircletimer: setTimeout(() => {this.rotateCircles();},600)
       });
    };
    render(){
        const {dclasses} = this.state;
        return(
            <ul id="progress_circles">
                {
                    dclasses.map((dclassname, i) => {
                        return (
                            <li key={i} className={dclassname}/>
                        )
                    })
                }
            </ul>
        )
    }
}
export default ProgressCircles;
