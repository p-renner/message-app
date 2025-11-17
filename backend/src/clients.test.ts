import { Channel } from './models/channels.models';
import { createChannelManager } from './clients';
import * as ws from 'ws';

describe('Clients', () => {
    let manager: ReturnType<typeof createChannelManager>;
    let client: ws;

    beforeEach(() => {
        manager = createChannelManager();
        client = {} as any;
    });

    afterEach(() => {
        manager.resetClients();
    });

    test('should add client', () => {
        const channel: Channel = { name: 'test' };
        manager.addClient(channel.name, client);
        expect(manager.getClients(channel.name)).toContain(client);
    });

    test('should delete client', () => {
        const channel: Channel = { name: 'test' };
        manager.addClient(channel.name, client);
        manager.deleteClient(channel.name, client);
        expect(manager.getClients(channel.name)).not.toContain(client);
    });

    test('should add multiple clients', () => {
        const channel: Channel = { name: 'test' };
        manager.addClient(channel.name, client);
        manager.addClient(channel.name, {} as any);
        expect(manager.getClients(channel.name).size).toBe(2);
    });

    test('should not add same client multiple times', () => {
        const channel: Channel = { name: 'test' };
        manager.addClient(channel.name, client);
        manager.addClient(channel.name, client);
        expect(manager.getClients(channel.name).size).toBe(1);
    });
});
