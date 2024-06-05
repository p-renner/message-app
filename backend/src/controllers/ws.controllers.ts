import express from 'express';
import * as ws from 'ws';
import { processData } from '../utils/websocket.js';
import clients from '../clients.js';

export const websocketHandler = async (ws: ws, req: express.Request) => {
    const channel = { name: req.params.channel! };

    if (clients.has(channel.name)) {
        clients.get(channel.name)!.add(ws);
    } else {
        clients.set(channel.name, new Set([ws]));
    }

    ws.on('message', (msg: ws.RawData) => {
        processData(msg, channel).catch(() => {
            console.error('Could not process message');
        });
    });

    ws.on('close', () => {
        clients.get(channel.name)!.delete(ws);
    });
};
