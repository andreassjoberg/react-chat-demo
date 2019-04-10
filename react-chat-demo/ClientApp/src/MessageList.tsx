import React, { Component } from "react";

type Props = {
    messages: string[];
};

export default class MessageList extends Component<Props> {
    render() {
        let { messages } = this.props;

        return (
            <div className="row">
                <div className="col-md-12 order-md-1">
                    <h4 className="mb-3">Messages</h4>
                    {messages.length > 0 ? (
                        <ul>
                            {messages.map(msg => (
                                <li key={msg}>{msg}</li>
                            ))}
                        </ul>
                    ) : (
                        <div className="font-italic">Det finns inga meddelanden att visa.</div>
                    )}
                </div>
            </div>
        );
    }
}
