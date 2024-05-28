import { useState, useEffect } from 'react';

type ChannelSelectProps = {
    onChannelClick: (channel: string) => void;
};

function ChannelSelect(props: ChannelSelectProps) {
    const { onChannelClick } = props;
    const [channels, setChannels] = useState<string[]>(['test', 'default', 'general', 'random']);

    useEffect(() => {
        fetch('/api/channels')
            .then((res) => res.json())
            .then((data) => setChannels(data.channels))
            .catch(() => console.error('Failed to fetch channels'));
    }, []);

    return (
        <div className="flex justify-center space-x-4 mb-4">
            {channels.map((channel) => (
                <button
                    key={channel}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={() => onChannelClick(channel)}
                >
                    {channel}
                </button>
            ))}
        </div>
    );
}

export default ChannelSelect;
