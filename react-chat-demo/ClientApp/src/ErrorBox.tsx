import React, { Component } from "react";

export default class ErrorBox extends Component {
    render() {
        return (
            <div className="alert alert-danger my-3" role="alert">
                Something went wrong. Please contact your administrator.
            </div>
        );
    }
}
