import { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
    message: z.string().min(1, { message: 'Message is required' }),
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
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="flex w-full max-w-xl items-center space-x-2">
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
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
