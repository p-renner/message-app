import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from 'lucide-react';

const formSchema = z.object({
    userId: z.string().min(1, { message: 'Username cannot be empty' }).max(30, { message: 'Username is too long' }),
});

interface UserFormProps {
    setUserId: (userId: string) => void;
}

function UserForm({ setUserId }: UserFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userId: '',
        },
    });

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        Cookies.set('userId', values.userId, { expires: 7 });
        setUserId(values.userId);
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
                <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Username:</FormLabel>
                            <div className="flex w-full items-start space-x-2">
                                <FormControl>
                                    <Input placeholder="Username" {...field} />
                                </FormControl>
                                <Button type="submit" variant="outline">
                                    <ChevronRightIcon className="h-4 w-4" />
                                </Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}

export default UserForm;
