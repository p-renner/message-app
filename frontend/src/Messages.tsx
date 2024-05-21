import { useEffect, useRef } from 'react';
import { ScrollArea } from './components/ui/scroll-area';

function Messages({ messages }: { messages: SharedTypes.Message[] }) {
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chatContainerRef.current) return;
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages]);

    return (
        <ScrollArea className="flex-1 h-full px-4 py-2 my-4 border-2 bg-gray-100 border-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-700 text-left break-words">
            {messages.map(({ id, userId, message }) => (
                <div key={id}>{userId + ': ' + message}</div>
            ))}
        </ScrollArea>
    );
}

export default Messages;
