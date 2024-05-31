import { useState, useEffect } from 'react';

type ChannelSelectProps = {
    onChannelClick: (channel: string) => void;
};

type Channel = {
    name: string;
};

function ChannelSelect(props: ChannelSelectProps) {
    const { onChannelClick } = props;
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
                <button
                    key={channel.name}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={() => onChannelClick(channel.name)}
                >
                    {channel.name}
                </button>
            ))}
        </div>
    );
}

export default ChannelSelect;
