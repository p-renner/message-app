import * as ws from 'ws';

export function broadcastMessage(wss: ws.Server, message: string) {
    wss.clients.forEach((value) => {
        if (value.readyState === 1) {
            value.send(message);
        }
    });
}
