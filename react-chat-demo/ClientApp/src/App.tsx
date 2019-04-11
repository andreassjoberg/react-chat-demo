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

    componentDidMount() {
        const connection = new SignalR.HubConnectionBuilder().withUrl("/hubs/chat").build();
        connection.start().catch(err => {
            this.setState({ error: true });
            console.log(err);
        });
        connection.on("messagePosted", (id, user, msg) => this.messagePosted(id, user, msg));
        this.setState({ connection: connection });
    }

    clearMessages() {
        this.setState({ messages: [] });
    }

    postMessage(user: string, msg: string): void {
        let { connection } = this.state;
        if (connection && connection.state === SignalR.HubConnectionState.Connected) {
            this.setState({ isLoading: true, error: false });
            connection
                .send("postMessage", user, msg)
                .then(() => this.setState({ isLoading: false }))
                .catch(() => this.setState({ isLoading: false, error: true }));
        } else {
            this.setState({ error: true });
        }
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

                <MessageForm
                    postMessage={(user, msg) => this.postMessage(user, msg)}
                    clearMessages={() => this.clearMessages()}
                />

                <MessageList messages={messages} />

                <Footer />
            </div>
        );
    }
}
