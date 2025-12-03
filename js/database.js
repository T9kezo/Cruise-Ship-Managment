import { databases, ID, Query } from './appwrite.js';

// Using human-readable database ID. Ensure it exists and the logged-in user has read/write permissions via rules.
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
        // Normalize queries: allow simple tuples like [field, op, value]
        let normalizedQueries = undefined;
        if (Array.isArray(queries) && queries.length > 0) {
            normalizedQueries = queries.map((q) => {
                // Already an Appwrite query string (SDK Query helpers return strings)
                if (typeof q === 'string') return q;
                // Tuple form [field, op, value]
                if (Array.isArray(q) && q.length >= 3) {
                    const [field, op, value] = q;
                    switch (op) {
                        case '==':
                        case '=':
                        case 'equal':
                            return Query.equal(field, value);
                        case '!=':
                        case 'notEqual':
                            return Query.notEqual(field, value);
                        case '>':
                        case 'greaterThan':
                            return Query.greaterThan(field, value);
                        case '>=':
                        case 'greaterThanEqual':
                            return Query.greaterThanEqual(field, value);
                        case '<':
                        case 'lessThan':
                            return Query.lessThan(field, value);
                        case '<=':
                        case 'lessThanEqual':
                            return Query.lessThanEqual(field, value);
                        case 'contains':
                            return Query.search(field, String(value));
                        case 'in':
                            return Query.contains(field, Array.isArray(value) ? value : [value]);
                        case 'orderAsc':
                            return Query.orderAsc(field);
                        case 'orderDesc':
                            return Query.orderDesc(field);
                        case 'limit':
                            return Query.limit(Number(value));
                        default:
                            // Fallback to equality if unknown
                            return Query.equal(field, value);
                    }
                }
                // Unknown format; ignore
                return undefined;
            }).filter(Boolean);
        }

        const params = normalizedQueries && normalizedQueries.length ? normalizedQueries : undefined;
        const response = await databases.listDocuments(DATABASE_ID, collectionId, params);
        return response.documents;
    } catch (error) {
        // Provide richer diagnostics for CORS/auth issues
        console.error('[database.getItems] Failed to list documents', {
            collectionId,
            queries,
            message: error?.message,
            type: error?.type,
            code: error?.code,
        });
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
