import React, { Component } from "react";

type Props = {
    postMessage(user: string, message: string): void;
};

export default class MessageForm extends Component<Props> {
    inputUser: HTMLInputElement | null = null;
    inputMessage: HTMLInputElement | null = null;

    formSubmit(ev: React.FormEvent<HTMLFormElement>): void {
        ev.preventDefault();
        let { postMessage } = this.props;
        if (this.inputUser && this.inputMessage && postMessage) {
            postMessage(this.inputUser.value, this.inputMessage.value);
            this.inputMessage.value = "";
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Post message</h4>
                    <form className="needs-validation" onSubmit={ev => this.formSubmit(ev)}>
                        <div className="row">
                            <div className="col-md-8 mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    ref={ref => (this.inputUser = ref)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Message"
                                    ref={ref => (this.inputMessage = ref)}
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
