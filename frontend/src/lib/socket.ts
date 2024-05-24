import { NetworkError, EmptyMessageError } from '@/lib/errors';
type messageHandler = (messages: SharedTypes.Message[]) => void;

export default class Socket {
    private socket: WebSocket;
    private messageHandler: messageHandler;

    constructor(url: string, messageHandler: messageHandler) {
        this.socket = this.init(url);
        this.messageHandler = messageHandler;
    }

    sendMessage(message: SharedTypes.WSMessage): void | never {
        if (!this.isConnected() || !this.socket) {
            throw new NetworkError();
        }

        if (message.message === '') {
            throw new EmptyMessageError();
        }

        this.socket.send(JSON.stringify(message));
    }

    init(url: string): WebSocket {
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log('Connection established');
        };

        this.socket.onmessage = (event: MessageEvent) => {
            if (!this.messageHandler) {
                return;
            }
            this.messageHandler(JSON.parse(event.data) as SharedTypes.Message[]);
        };

        this.socket.onerror = (error: Event) => {
            console.error('WebSocket error observed:', error);
        };

        return this.socket;
    }

    disconnect(): void {
        this.socket.close();
    }

    isConnected(): boolean {
        return this.socket.readyState === WebSocket.OPEN;
    }
}
