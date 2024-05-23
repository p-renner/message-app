export interface IMessagesRepository {
    getMessages(): Promise<SharedTypes.Message[]>;
    insertMessage(message: SharedTypes.Message): Promise<{ id: number | undefined }>;
}
