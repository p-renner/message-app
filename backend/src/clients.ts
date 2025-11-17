import ws from 'ws';

export interface ChannelManager {
    addClient(channel: string, client: ws): void;
    deleteClient(channel: string, client: ws): void;
    getClients(channel: string): Set<ws>;
    resetClients(): void;
}

export function createChannelManager(): ChannelManager {
    const clients = new Map<string, Set<ws>>();

    function addClient(channel: string, client: ws): void {
        if (!clients.has(channel)) {
            clients.set(channel, new Set([client]));
            return;
        }

        getClients(channel).add(client);
    }

    function deleteClient(channel: string, client: ws): void {
        clients.get(channel)?.delete(client);
    }

    function getClients(channel: string): Set<ws> {
        if (!clients.has(channel)) {
            return new Set<ws>();
        }

        return clients.get(channel)!;
    }

    function resetClients(): void {
        clients.clear();
    }

    return {
        addClient,
        deleteClient,
        getClients,
        resetClients,
    };
}
