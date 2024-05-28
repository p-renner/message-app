import { NetworkError, EmptyMessageError } from '@/lib/errors';
type messageHandler = (messages: SharedTypes.Message[]) => void;

export default class Socket {
    private socket: WebSocket;
    private messageHandler: messageHandler;

    constructor(url: string, messageHandler: messageHandler) {
        this.socket = this.init(url);
        this.messageHandler = messageHandler;
    }

    init(url: string): WebSocket {
        this.socket = new WebSocket(url);

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

    sendMessage(message: SharedTypes.WSMessage) {
        if (!this.socket || !this.isConnected()) {
            throw new NetworkError();
        }

        if (message.message === '') {
            throw new EmptyMessageError();
        }

        this.socket.send(JSON.stringify(message));
    }

    onConnect(callback: () => void) {
        this.socket.onopen = callback;
    }

    onDisconnect(callback: () => void) {
        this.socket.onclose = callback;
        console.log('onDisconnect');
    }

    disconnect(): void {
        this.socket.close();
    }

    isConnected(): boolean {
        return this.socket.readyState === WebSocket.OPEN;
    }
}
