import { useEffect, useRef } from 'react';

function Messages({ messages }: { messages: SharedTypes.Message[] }) {
    const newestMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!newestMessageRef.current) return;
        newestMessageRef.current.scrollIntoView();
    }, [messages]);

    return (
        <div className="table table-fixed w-full">
            {messages.map(({ userId, message }, id) => (
                <p className="break-words" key={id} ref={messages.length - 1 === id ? newestMessageRef : null}>
                    {userId + ': ' + message}
                </p>
            ))}
        </div>
    );
}

export default Messages;
