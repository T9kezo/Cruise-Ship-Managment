const { login, signup, logout } = require('../js/auth.js');

// Mock Appwrite
jest.mock('appwrite', () => ({
    Client: jest.fn(() => ({
        setEndpoint: jest.fn(),
        setProject: jest.fn(),
    })),
    Account: jest.fn(() => ({
        createEmailPasswordSession: jest.fn(),
        create: jest.fn(),
        deleteSession: jest.fn(),
    })),
}));

describe('Auth', () => {
    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks();
    });

    test('login should call createEmailPasswordSession', async () => {
        const mockCreateSession = jest.fn().mockResolvedValue({});
        require('appwrite').Account.mockImplementation(() => ({
            createEmailPasswordSession: mockCreateSession,
        }));

        await login('test@example.com', 'password');
        expect(mockCreateSession).toHaveBeenCalledWith('test@example.com', 'password');
    });

    test('signup should call create', async () => {
        const mockCreate = jest.fn().mockResolvedValue({});
        require('appwrite').Account.mockImplementation(() => ({
            create: mockCreate,
        }));

        await signup('test@example.com', 'password', 'Test User');
        expect(mockCreate).toHaveBeenCalledWith('unique()', 'test@example.com', 'password', 'Test User');
    });

    test('logout should call deleteSession', async () => {
        const mockDeleteSession = jest.fn().mockResolvedValue({});
        require('appwrite').Account.mockImplementation(() => ({
            deleteSession: mockDeleteSession,
        }));

        await logout();
        expect(mockDeleteSession).toHaveBeenCalledWith('current');
    });
});
