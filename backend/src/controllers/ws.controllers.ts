import express from 'express';
import * as ws from 'ws';
import { processData } from '../utils/websocket.js';
import clients, { addClient } from '../clients.js';
import { Channel } from '../models/channels.models.js';

export const websocketHandler = async (ws: ws, req: express.Request) => {
    const channel = { name: req.params.channel! } as Channel;
    addClient(channel, ws);

    ws.on('message', (msg: ws.RawData) => {
        processData(msg, channel).catch(() => {
            console.error('Could not process message');
        });
    });

    ws.on('close', () => {
        clients.get(channel)?.delete(ws);
    });
};
