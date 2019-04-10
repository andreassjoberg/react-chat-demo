import React, { Component } from "react";
import "./App.scss";

import Header from "./Header";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";

type State = {
    isLoading: boolean;
    error: boolean;
    messages: string[];
};

export default class App extends Component<{}, State> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            isLoading: false,
            error: false,
            messages: []
        };
    }

    postMessage(msg: string): void {
        let { messages } = this.state;
        messages.push(msg);
        this.setState({ messages: messages });
    }

    render() {
        let { messages } = this.state;
        return (
            <div className="container">
                <Header />

                <MessageForm postMessage={msg => this.postMessage(msg)} />

                <MessageList messages={messages} />
            </div>
        );
    }
}
