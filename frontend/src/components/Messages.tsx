import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

function Messages({ messages }: { messages: SharedTypes.Message[] }) {
    const newestMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!newestMessageRef.current) return;
        newestMessageRef.current.scrollIntoView();
    }, [messages]);

    return (
        <ScrollArea
            className="flex-1 h-full px-4 py-2 my-4 border-2 bg-gray-100 border-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-700 text-left"
            role="feed"
        >
            <div className="table table-fixed w-full">
                {messages.map(({ userId, message }, id) => (
                    <p className="break-words" key={id} ref={messages.length - 1 === id ? newestMessageRef : null}>
                        {userId + ': ' + message}
                    </p>
                ))}
            </div>
        </ScrollArea>
    );
}

export default Messages;
