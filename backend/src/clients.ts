import * as ws from 'ws';
const clients = new Map<string, Set<ws>>();

export function addClient(channel: string, client: ws): void {
    if (!clients.has(channel)) {
        clients.set(channel, new Set([client]));
        return;
    }

    getClients(channel).add(client);
}

export function deleteClient(channel: string, client: ws): void {
    clients.get(channel)?.delete(client);
}

export function getClients(channel: string): Set<ws> {
    if (!clients.has(channel)) {
        return new Set<ws>();
    }

    return clients.get(channel)!;
}
