import messagesRepository from '../db.js';
import clients from '../clients.js';
import express from 'express';
import * as ws from 'ws';

export function broadcastMessage(message: string, channel: string) {
    Array.from(clients.get(channel) || []).forEach((client) => {
        client.send(message);
    });
}

export function isValidChannel(ws: ws, req: express.Request): boolean {
    if (!req.params || !req.params.channel || !req.params.channel.match(/^[a-zA-Z0-9_-]+$/)) {
        console.error('Invalid channel');
        ws.close();
        return false;
    }
    return true;
}

export async function processData(data: ws.RawData, channel: string) {
    await messagesRepository.insertMessage(convertToMessage(data, channel));
    broadcastMessage(await getMessages(channel), channel);
}

function convertToMessage(data: ws.RawData, channel: string): Omit<SharedTypes.Message, 'id'> {
    let obj: SharedTypes.WSMessage = JSON.parse(data.toString());

    if (!obj.message || !obj.userId) {
        throw new Error('Missing fields');
    }

    return { message: obj.message, userId: obj.userId, channelName: channel };
}

export async function getMessages(channel: string): Promise<string> {
    return JSON.stringify(await messagesRepository.getMessages(channel));
}
