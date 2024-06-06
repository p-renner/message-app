import MessageModel, { Message } from '../models/messages.models.js';
import { Channel } from '../models/channels.models.js';
import clients from '../clients.js';
import * as ws from 'ws';

export function broadcastMessage(message: string, channel: Channel): void {
    Array.from(clients.get(channel) || []).forEach((client) => {
        client.send(message);
    });
}

export async function processData(data: ws.RawData, channel: Channel): Promise<void> {
    await MessageModel.insert(convertToMessage(data, channel));
    broadcastMessage(await getMessagesString(channel), channel);
}

function convertToMessage(data: ws.RawData, channel: Channel): Message {
    let obj: SharedTypes.WSMessage = JSON.parse(data.toString());

    if (!obj.message || !obj.userId) {
        throw new Error('Missing fields');
    }

    return { id: '', message: obj.message, userId: obj.userId, channelName: channel.name };
}

export async function getMessagesString(channel: Channel): Promise<string> {
    return JSON.stringify(await MessageModel.get(channel));
}
