import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

class header extends Component {
    state = {};
    render() {
        return (
            <div className="ui secondary pointing menu">
                <NavLink to="/" className="item">
                    <h1>Social Network</h1>
                </NavLink>
                <div className="right menu">
                    <h1>
                        <GoogleAuth />
                    </h1>
                </div>
            </div>
        );
    }
}

export default header;
