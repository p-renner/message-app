declare namespace SharedTypes {
    interface WSMessage {
        userId: string;
        message: string;
    }

    interface Message {
        id: string;
        userId: string;
        message: string;
        channelName: string;
        timestamp?: string;
    }
}
