import { useState, useEffect } from 'react';
import { Button } from './ui/button';

type ChannelSelectProps = {
    onChannelClick: (channel: string) => void;
    active: string;
};

type Channel = {
    name: string;
};

function ChannelSelect(props: ChannelSelectProps) {
    const { onChannelClick, active } = props;
    const [channels, setChannels] = useState<Channel[]>([]);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_ADDR || 'https://message-app.rennernet.com';
        fetch(apiUrl + '/api/channels')
            .then((res) => res.json())
            .then((data) => setChannels(data.channels || []))
            .catch(() => console.error('Failed to fetch channels'));
    }, []);

    return (
        <div className="flex justify-center space-x-4 mb-4">
            {channels.map((channel) => (
                <Button
                    key={channel.name}
                    variant={active == channel.name ? 'default' : 'outline'}
                    onClick={() => onChannelClick(channel.name)}
                >
                    {channel.name}
                </Button>
            ))}
        </div>
    );
}

export default ChannelSelect;
