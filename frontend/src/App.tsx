import './index.css';
import UserForm from './UserForm';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Notification from './Notification';
import MessageComponent from './MessageComponent';

function App() {
    const [userId, setUserId] = useState<string | null>(Cookies.get('userId') || null);
    const [notifications, setNotifications] = useState<string[]>([]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setNotifications([]);
        }, 3000);

        return () => {
            clearTimeout(timeout);
        };
    }, [notifications, setNotifications]);

    function notify(message: string) {
        setNotifications([...notifications, message]);
    }

    if (!userId) {
        return <UserForm setUserId={setUserId} />;
    }

    return (
        <div id="container" className="relative flex flex-col text-center p-4 h-dvh max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-4xl">Message App</h1>

            <MessageComponent userId={userId} sendNotification={notify} />
            <Notification notifications={notifications} />
        </div>
    );
}

export default App;
