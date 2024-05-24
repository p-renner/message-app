export interface IMessagesRepository {
    getMessages(): Promise<SharedTypes.Message[]>;
    insertMessage(message: Omit<SharedTypes.Message, 'id'>): Promise<{ id: number | undefined }>;
}
