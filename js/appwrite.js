import { Client, Account, Databases, ID, Query } from 'appwrite';

// Appwrite configuration
const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('692c5bd464546cfce50f');

export const account = new Account(client);
export const databases = new Databases(client);
export { ID, Query };


