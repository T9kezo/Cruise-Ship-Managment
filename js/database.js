import { databases } from './appwrite.js';
import { ID } from 'appwrite';

const DATABASE_ID = 'cruiseshipdb';

export const createItem = async (collectionId, data) => {
    try {
        const response = await databases.createDocument(DATABASE_ID, collectionId, ID.unique(), data);
        return response;
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
};

export const getItems = async (collectionId, queries = []) => {
    try {
        const response = await databases.listDocuments(DATABASE_ID, collectionId, queries);
        return response.documents;
    } catch (error) {
        console.error('Error getting items:', error);
        throw error;
    }
};

export const updateItem = async (collectionId, documentId, data) => {
    try {
        const response = await databases.updateDocument(DATABASE_ID, collectionId, documentId, data);
        return response;
    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
};

export const deleteItem = async (collectionId, documentId) => {
    try {
        await databases.deleteDocument(DATABASE_ID, collectionId, documentId);
        return true;
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
};
