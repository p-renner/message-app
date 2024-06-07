import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRightIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    message: z.string().min(1, { message: 'Message cannot be empty' }).max(255, { message: 'Message is too long' }),
});

interface MessageFormProps {
    onSend: (message: string) => Promise<void>;
    onError: () => void;
    disabled?: boolean;
}

function MessageForm(props: MessageFormProps) {
    const { onSend, onError, disabled } = props;
    const [isDisabled, setIsDisabled] = useState(disabled);

    useMemo(() => {
        setIsDisabled(disabled);
    }, [disabled]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: '',
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsDisabled(true);
        await onSend(values.message)
            .then(() => {
                form.reset();
                setIsDisabled(false);
            })
            .catch(() => {
                form.setError('message', { message: 'Failed to send message' });
                onError();
            });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full" aria-disabled={isDisabled}>
                <div className="flex w-full items-start space-x-2">
                    <FormField
                        disabled={isDisabled}
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel hidden>Asdf</FormLabel>
                                <FormControl>
                                    <Input placeholder="Message" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" variant="outline" disabled={isDisabled}>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default MessageForm;
