declare namespace SharedTypes {
    interface WSMessage {
        userId: string;
        message: string;
    }

    interface Message {
        id: number;
        userId: string;
        message: string;
        channelName: string;
        timestamp?: string;
    }
}
