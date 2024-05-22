import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
    message: z.string().min(1, { message: 'Message cannot be empty' }).max(255, { message: 'Message is too long' }),
});

interface MessageFormProps {
    onSend: (message: string) => void;
}

function MessageForm(props: MessageFormProps) {
    const { onSend } = props;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: '',
        },
    });

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSend(values.message);
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
                <div className="flex w-full items-start space-x-2">
                    <FormField
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
                    <Button type="submit">Send</Button>
                </div>
            </form>
        </Form>
    );
}

export default MessageForm;
