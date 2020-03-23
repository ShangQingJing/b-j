import React, { Component } from 'react';
import './tartop.css';
import right from '../../../img/right.png';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
class Tab extends Component {
    Givevack=()=>{
        const _self = this;
        _self.props.props.history.goBack();
    }
    render() {
        const _self = this;
        return (
            <div className="Tabcon" onClick={_self.Givevack}>
                <img src={right} />
                <div>{this.props.tabtxt}</div>
            </div>

        )
    }
}
export default Tab;