import express from 'express';
import * as ws from 'ws';
import { broadcastMessage, getMessagesString, insertData } from '../utils/websocket.js';
import { addClient, deleteClient } from '../clients.js';
import { Channel } from '../models/channels.models.js';

export const websocketHandler = async (ws: ws, req: express.Request) => {
    const channel = { name: req.params.channel! } as Channel;
    addClient(channel.name, ws);

    ws.on('message', async (msg: ws.RawData) => {
        await insertData(msg, channel).catch((e) => {
            console.error('Could not process message:', e.message);
        });

        getMessagesString(channel).then((messages) => {
            broadcastMessage(messages, channel);
        });
    });

    ws.on('close', () => {
        deleteClient(channel.name, ws);
    });
};
