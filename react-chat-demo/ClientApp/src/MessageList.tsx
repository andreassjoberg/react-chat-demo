import React, { Component } from "react";
import { Message } from "./App";

type Props = {
    messages: Message[];
};

export default class MessageList extends Component<Props> {
    render() {
        let { messages } = this.props;

        return (
            <div className="row">
                <div className="col-md-12 order-md-1">
                    <h4 className="mb-3">Messages</h4>
                    {messages.length > 0 ? (
                        messages.map(msg => (
                            <div key={`${msg.user}-${msg.message}`} className="card mb-1">
                                <div className="card-body">
                                    <div className="card-title h5">{msg.user}</div>
                                    {msg.message}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="font-italic">Det finns inga meddelanden att visa.</div>
                    )}
                </div>
            </div>
        );
    }
}
