import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

class header extends Component {
    state = {};
    render() {
        return (
            <div className="ui secondary pointing menu">
                <NavLink to="/" className="item">
                    StreamReact
                </NavLink>
                <div className="right menu">
                    <NavLink to="/" className="item">
                        All Streams
                    </NavLink>
                    <GoogleAuth />
                </div>
            </div>
        );
    }
}

export default header;
