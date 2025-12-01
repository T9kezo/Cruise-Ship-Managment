import { account } from './appwrite.js';

export const login = async (email, password) => {
    try {
        if (!account) {
            throw new Error('Appwrite account is not initialized');
        }
        const session = await account.createEmailSession(email, password);
        return session;
    } catch (error) {
        console.error('Login error:', error);
        // Provide more helpful error messages
        if (error.message) {
            throw new Error(error.message);
        } else if (error.type) {
            throw new Error(`Login failed: ${error.type}`);
        } else {
            throw new Error('Failed to connect to server. Please check your internet connection.');
        }
    }
};

export const signup = async (email, password, name) => {
    try {
        const user = await account.create('unique()', email, password, name);
        return user;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};
