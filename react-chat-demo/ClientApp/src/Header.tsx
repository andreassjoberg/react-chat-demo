import React, { Component } from "react";

export default class Header extends Component {
    render() {
        return (
            <div className="py-5 text-center">
                <h2>React chat demo</h2>
                <p className="lead">This is a simple chat application demo made in React with Typescript.</p>
            </div>
        );
    }
}
