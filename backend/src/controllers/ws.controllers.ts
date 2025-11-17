import express from 'express';
import * as ws from 'ws';
import { broadcastMessage, getMessagesString, insertData } from '../utils/websocket.js';
import { createChannelManager } from '../clients.js';
import { Channel } from '../models/channels.models.js';

const channelManager = createChannelManager();

export const websocketHandler = async (ws: ws, req: express.Request) => {
    const channel = { name: req.params.channel! } as Channel;
    channelManager.addClient(channel.name, ws);

    ws.on('message', async (msg: ws.RawData) => {
        await insertData(msg, channel).catch((e) => {
            console.error('Could not process message:', e.message);
        });

        getMessagesString(channel).then((messages) => {
            broadcastMessage(messages, channelManager.getClients(channel.name));
        });
    });

    ws.on('close', () => {
        channelManager.deleteClient(channel.name, ws);
    });
};
