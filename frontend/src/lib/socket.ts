import { NetworkError, EmptyMessageError } from '@/lib/errors';
type messageHandler = (messages: SharedTypes.Message[]) => void;

export default class Socket {
    private socket: WebSocket;
    private messageHandler: messageHandler;

    constructor(url: string, messageHandler: messageHandler, setConnected: (connected: boolean) => void) {
        this.socket = this.init(url, setConnected);
        this.messageHandler = messageHandler;
    }

    init(url: string, setConnected: (connected: boolean) => void): WebSocket {
        let connected = false;
        this.socket = new WebSocket(url);

        // First message recieved is user list
        this.socket.onmessage = (event: MessageEvent) => {
            if (!this.messageHandler) {
                return;
            }
            this.messageHandler(JSON.parse(event.data) as SharedTypes.Message[]);
            setConnected(true);
            connected = true;
        };

        this.socket.onerror = (error: Event) => {
            console.error('WebSocket error observed:', error);
        };

        setTimeout(() => {
            // If no response after 5 seconds, assume server is down
            if (!connected) {
                this.socket.close();
            }
        }, 5000);

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
