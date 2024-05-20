function Error({ errors }: { errors: Error[] }) {
    if (errors.length === 0) {
        return null;
    }

    return (
        <div className="absolute top-4 right-4 text-red-500 space-y-2">
            {errors.map((error, index) => (
                <div key={index} className="rounded bg-gray-700 px-2">
                    {error.message}
                </div>
            ))}
        </div>
    );
}

export default Error;
