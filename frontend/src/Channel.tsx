import Messages from './Messages';
import MessageForm from './MessageForm';
import Socket from './socket';
import { useState } from 'react';

interface ChannelProps {
    userId: string;
}

function Channel({ userId }: ChannelProps) {
    const [messages, setMessages] = useState<SharedTypes.Message[]>([]);
    const [socket] = useState<Socket>(
        () => new Socket(import.meta.env.VITE_WSS_ADDR || 'wss://message-app.rennernet.com', setMessages),
    );

    function onSend(message: string) {
        socket.sendMessage(message, userId);
    }

    return (
        <>
            <Messages messages={messages} />
            <MessageForm onSend={onSend} />
        </>
    );
}

export default Channel;