import { Channel } from './models/channels.models';
import { addClient, deleteClient, getClients } from './clients';

describe('Clients', () => {
    test('should add client', () => {
        const channel: Channel = { name: 'test' };
        const client = {} as any;
        addClient(channel.name, client);
        expect(getClients(channel.name)).toContain(client);
    });

    test('should delete client', () => {
        const channel: Channel = { name: 'test1' };
        const client = {} as any;
        addClient(channel.name, client);
        deleteClient(channel.name, client);
        expect(getClients(channel.name)).not.toContain(client);
    });

    test('should add multiple clients', () => {
        const channel: Channel = { name: 'test2' };
        const client1 = {} as any;
        const client2 = {} as any;
        addClient(channel.name, client1);
        addClient(channel.name, client2);
        expect(getClients(channel.name).size).toBe(2);
    });

    test('should not add same client multiple times', () => {
        const channel: Channel = { name: 'test3' };
        const client = {} as any;
        addClient(channel.name, client);
        addClient(channel.name, client);
        expect(getClients(channel.name).size).toBe(1);
    });
});
