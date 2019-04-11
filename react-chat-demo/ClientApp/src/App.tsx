import React, { Component } from "react";
import "./App.scss";
import * as SignalR from "@aspnet/signalr";

import Header from "./Header";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import ErrorBox from "./ErrorBox";

type State = {
    isLoading: boolean;
    error: boolean;
    messages: Message[];
    connection: SignalR.HubConnection | null;
};

export interface Message {
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

    clearMessages() {
        this.setState({ messages: [] });
    }

    // componentDidMount() {
    //     const connection = new SignalR.HubConnectionBuilder().withUrl("/hubs/chat").build();
    //     connection.start().catch(err => {
    //         this.setState({ error: true });
    //         console.log(err);
    //     });
    //     connection.on("messagePosted", (user, msg) => this.messagePosted(user, msg));
    //     this.setState({ connection: connection });
    // }

    // postMessage(user: string, msg: string): void {
    //     let { connection } = this.state;
    //     if (connection) {
    //         this.setState({ isLoading: true, error: false });
    //         connection
    //             .send("postMessage", user, msg)
    //             .then(() => this.setState({ isLoading: false }))
    //             .catch(() => this.setState({ isLoading: false, error: true }));
    //     }
    // }

    // messagePosted(user: string, msg: string): void {
    //     let { messages } = this.state;
    //     messages.unshift({ user, message: msg });
    //     this.setState({ messages: messages });
    // }

    postMessage(user: string, message: string): void {
        let { messages } = this.state;
        messages.unshift({ user, message });
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
            </div>
        );
    }
}
