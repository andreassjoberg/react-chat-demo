import React, { Component } from "react";

type Props = {
    postMessage(message: string): void;
};

export default class MessageForm extends Component<Props> {
    input: HTMLInputElement | null = null;

    formSubmit(ev: React.FormEvent<HTMLFormElement>): void {
        ev.preventDefault();
        let { postMessage } = this.props;
        if (this.input && postMessage) {
            postMessage(this.input.value);
            this.input.value = "";
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Message</h4>
                    <form className="needs-validation" onSubmit={ev => this.formSubmit(ev)}>
                        <div className="row">
                            <div className="col-md-8 mb-3">
                                <input type="text" className="form-control" ref={ref => (this.input = ref)} />
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
