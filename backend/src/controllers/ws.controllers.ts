import express from 'express';
import * as ws from 'ws';
import { getMessages, isValidChannel, processData } from '../utils/websocket.js';
import clients from '../clients.js';

export const websocketHandler = async (ws: ws, req: express.Request) => {
    if (!isValidChannel(ws, req)) {
        return;
    }
    const channel = req.params.channel!;

    if (clients.has(channel)) {
        clients.get(channel)!.add(ws);
    } else {
        clients.set(channel, new Set([ws]));
    }

    ws.send(await getMessages(channel));

    ws.on('message', (msg: ws.RawData) => {
        processData(msg, channel).catch(() => {
            console.error('Could not process message');
        });
    });

    ws.on('close', () => {
        clients.get(channel)!.delete(ws);
    });
};
