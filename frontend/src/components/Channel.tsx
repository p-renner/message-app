import MessageForm from '@/components/MessageForm';
import Messages from '@/components/Messages';
import SocketStatus from '@/components/SocketStatus';
import Socket from '@/lib/socket';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useMemo, useState } from 'react';

interface ChannelProps {
    userId: string;
    channel: string | undefined;
}

function Channel({ userId, channel }: ChannelProps) {
    const [messages, setMessages] = useState<SharedTypes.Message[]>([]);

    const [socket, setSocket] = useState<Socket>();
    const [connected, setConnected] = useState<boolean>();

    useMemo(() => {
        if (socket) {
            // Connecting to a new channel
            socket.onDisconnect(() => setConnected(undefined));
            socket.disconnect();
        }
        setMessages([]);

        setTimeout(() => setSocket(new Socket(getWebSocketUrl(channel), setMessages, setConnected)), 300);
    }, [channel]);

    useMemo(() => {
        if (!socket) return;
        socket.onDisconnect(() => setConnected(false));
    }, [socket]);

    async function onSend(message: string) {
        const wsMessage: SharedTypes.WSMessage = { userId, message };
        await socket?.sendMessage(wsMessage);
    }

    function onError(): void {
        console.error('No response from server.');
        socket?.disconnect();
    }

    return (
        <>
            <SocketStatus connected={connected} />
            <ScrollArea
                className="flex-1 h-full px-4 py-2 my-4 border-2 bg-gray-100 border-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-700 text-left"
                role="feed"
            >
                <Messages messages={messages} />
            </ScrollArea>
            <MessageForm onSend={onSend} onError={onError} disabled={!connected} />
        </>
    );
}

export default Channel;

function getWebSocketUrl(channel: string = 'default') {
    const baseUrl = import.meta.env.VITE_WSS_ADDR || 'wss://message-app.rennernet.com';
    const path = channel;
    if (!/^[a-zA-Z0-9_-]+$/.test(path)) {
        console.error('Invalid channel name');
    }

    return baseUrl + '/ws/' + path;
}