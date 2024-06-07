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

        this.socket.onerror = (error: Event) => {
            console.error('WebSocket error observed:', error);
        };

        return this.socket;
    }

    async sendMessage(message: SharedTypes.WSMessage) {
        if (!this.socket || !this.isConnected()) {
            throw new NetworkError();
        }

        if (message.message === '') {
            throw new EmptyMessageError();
        }

        this.socket.send(JSON.stringify(message));

        // Wait for response from server
        return new Promise((resolve, reject) => {
            this.socket.onmessage = (event: MessageEvent) => {
                this.messageHandler(JSON.parse(event.data) as SharedTypes.Message[]);
                resolve(event.data);
            };

            // Reject if no response after 5 seconds
            setTimeout(() => {
                reject(new Error('No response from server'));
            }, 5000);
        });
    }

    onConnect(callback: () => void) {
        this.socket.onopen = callback;
    }

    onDisconnect(callback: () => void) {
        this.socket.onclose = callback;
    }

    disconnect(): void {
        this.socket.close();
    }

    isConnected(): boolean {
        return this.socket.readyState === WebSocket.OPEN;
    }
}
