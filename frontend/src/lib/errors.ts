export class NetworkError extends Error {
    constructor(message = 'Socket is not connected') {
        super(message);
        this.name = 'NetworkError';
    }
}

export class EmptyMessageError extends Error {
    constructor(message = 'Message cannot be empty') {
        super(message);
        this.name = 'EmptyMessageError';
    }
}
