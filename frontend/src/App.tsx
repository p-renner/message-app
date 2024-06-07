import '@/index.css';
import UserForm from '@/components/UserForm';
import Cookies from 'js-cookie';
import { useState } from 'react';
import Channel from '@/components/Channel';
import ChannelSelect from '@/components/ChannelSelect';
import { ThemeProvider } from '@/components/theme-provider';

function App() {
    const [userId, setUserId] = useState<string | null>(Cookies.get('userId') || null);
    const [channel, setChannel] = useState<string>('default');

    const onChannelClick = (channel: string) => {
        setChannel(channel);
    };

    return (
        <ThemeProvider>
            <div id="container" className="relative flex flex-col text-center p-4 h-dvh max-w-2xl mx-auto">
                <h1 className="text-2xl md:text-4xl mb-4">Message App</h1>
                <ChannelSelect onChannelClick={onChannelClick} active={channel || 'default'} />

                {userId ? <Channel userId={userId} channel={channel} /> : <UserForm setUserId={setUserId} />}
            </div>
        </ThemeProvider>
    );
}

export default App;
