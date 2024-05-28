function SocketStatus({ connected }: { connected: boolean | undefined }) {
    return (
        <p className="text-lg font-semibold">
            Status:{' '}
            <span className={connected === undefined ? 'text-gray-500' : connected ? 'text-green-500' : 'text-red-500'}>
                {' '}
                {connected === undefined ? 'Connecting...' : connected ? 'Connected' : 'Disconnected'}{' '}
            </span>
        </p>
    );
}

export default SocketStatus;
