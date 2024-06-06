import * as ws from 'ws';
import { Channel } from './models/channels.models';
const clients = new Map<Channel, Set<ws>>();

export function addClient(channel: Channel, client: ws) {
    if (clients.has(channel)) {
        clients.get(channel)!.add(client);
    } else {
        clients.set(channel, new Set([client]));
    }
}

export default clients;
