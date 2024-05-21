export interface NotificatonProps {
    notifications: string[];
}

function Notificaton(props: NotificatonProps) {
    const { notifications } = props;

    if (!notifications.length) {
        return null;
    }

    return (
        <div className="absolute top-4 right-4 text-red-500 space-y-2">
            {notifications.map((message) => (
                <div className="rounded bg-gray-700 px-2">{message}</div>
            ))}
        </div>
    );
}

export default Notificaton;
