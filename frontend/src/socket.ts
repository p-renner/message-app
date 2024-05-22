import { NetworkError, EmptyMessageError } from './lib/errors';
type messageHandler = (messages: SharedTypes.Message[]) => void;

export default class Socket {
    private socket: WebSocket;

    constructor(messageHandler: messageHandler) {
        this.socket = new WebSocket(import.meta.env.VITE_WSS_ADDR || 'wss://message-app.rennernet.com');
        this.socket.addEventListener('message', (event) => {
            messageHandler(JSON.parse(event.data) as SharedTypes.Message[]);
        });
    }

    sendMessage(message: string, userId: string): void | never {
        if (!this.socket || this.socket.readyState !== 1) {
            throw new NetworkError();
        }

        if (!message || message === '') {
            throw new EmptyMessageError();
        }

        this.socket.send(JSON.stringify({ userId: userId, message } as SharedTypes.Message));
    }

    disconnect(): void {
        this.socket.close();
    }
}