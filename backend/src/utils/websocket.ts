import * as ws from 'ws';
import messagesRepository from '../db.js';
import express from 'express';

export function broadcastMessage(wss: ws.Server, message: string) {
    wss.clients.forEach((value) => {
        if (value.readyState === 1) {
            value.send(message);
        }
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

export async function processData(data: ws.RawData, channel: string, wss: ws.Server) {
    await messagesRepository.insertMessage(convertToMessage(data, channel));
    broadcastMessage(wss, await getMessages(channel));
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
