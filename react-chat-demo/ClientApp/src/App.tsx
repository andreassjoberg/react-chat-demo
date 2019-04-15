import React, { Component } from "react";
import "./App.scss";
import * as SignalR from "@aspnet/signalr";

import Header from "./Header";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import ErrorBox from "./ErrorBox";
import Footer from "./Footer";

type State = {
    isLoading: boolean;
    error: boolean;
    messages: Message[];
    connection: SignalR.HubConnection | null;
};

export interface Message {
    id: string;
    user: string;
    message: string;
}

export default class App extends Component<{}, State> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            isLoading: false,
            error: false,
            messages: [],
            connection: null
        };
    }

    postMessage(user: string, msg: string): void {
        let id = new Date().valueOf();
        this.messagePosted(id.toString(), user, msg);
    }

    messagePosted(id: string, user: string, message: string): void {
        let { messages } = this.state;
        messages.unshift({ id, user, message });
        this.setState({ messages: messages });
    }

    render() {
        let { isLoading, error, messages } = this.state;
        return (
            <div className="container">
                <Header />

                {error ? <ErrorBox /> : null}

                <MessageForm postMessage={(user, msg) => this.postMessage(user, msg)} />

                <MessageList messages={messages} />

                <Footer />
            </div>
        );
    }
}
