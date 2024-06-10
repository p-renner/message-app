import MessageModel, { Message } from '../models/messages.models.js';
import { Channel } from '../models/channels.models.js';
import { getClients } from '../clients.js';
import * as ws from 'ws';

export function broadcastMessage(message: string, channel: Channel): void {
    for (const client of getClients(channel.name)) {
        client.send(message);
    }
}

export async function insertData(data: ws.RawData, channel: Channel): Promise<{ id: string | undefined }> {
    return await MessageModel.insert(convertToMessage(data, channel)).catch(() => {
        throw new Error('Could not insert message, is the database running?');
    });
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
