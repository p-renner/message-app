export abstract class IMessagesRepository {
    abstract getMessages(channel: string): Promise<SharedTypes.Message[]>;
    abstract insertMessage(message: Omit<SharedTypes.Message, 'id'>): Promise<{ id: number | undefined }>;
}
