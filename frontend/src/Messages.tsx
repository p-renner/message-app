import { useEffect, useRef } from 'react';

function Messages({ messages }: { messages: SharedTypes.Message[] }) {
    const ulRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (ulRef.current) {
            ulRef.current.scrollTop = ulRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <ul
            id="messages"
            className="flex-1 flex flex-col justify-end bg-gray-800 px-4 py-2 my-4 border-2 w-full max-w-2xl mx-auto text-left break-words overflow-y-scroll"
            ref={ulRef}
        >
            {messages.map(({ id, userId, message }) => (
                <li key={id}>{userId + ': ' + message}</li>
            ))}
        </ul>
    );
}

export default Messages;
