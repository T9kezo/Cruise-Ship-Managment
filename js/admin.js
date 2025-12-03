// Admin-specific functionality
import { logout } from './auth.js';
import { logger } from './logger.js';
import { createItem, getItems, updateItem, deleteItem } from './database.js';
import { account } from './appwrite.js';
import { signup } from './auth.js';

// Helpers to map dashboard types to collection IDs and back
function getCollectionId(type) {
    switch (type) {
        case 'catering':
            return 'catering_items';
        case 'stationery':
            return 'stationery_items';
        case 'services':
            return 'services';
        default:
            return type;
    }
}

function getTypeFromCollectionId(collectionId) {
    switch (collectionId) {
        case 'catering_items':
            return 'catering';
        case 'stationery_items':
            return 'stationery';
        case 'services':
            return 'services';
        default:
            return collectionId;
    }
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

async function viewItems(type) {
    try {
        const collectionId = getCollectionId(type);
        const items = await getItems(collectionId);
        const modal = document.getElementById('items-list-modal');
        const title = document.getElementById('items-list-title');
        const content = document.getElementById('items-list-content');

        title.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Items`;
        content.innerHTML = '<table><thead><tr><th>Name</th><th>Description</th><th>Price</th><th>Category</th><th>Actions</th></tr></thead><tbody></tbody></table>';

        const tbody = content.querySelector('tbody');
        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>$${item.price}</td>
                <td>${item.category}</td>
                <td>
                    <button class="edit-item" data-collection="${collectionId}" data-id="${item.$id}">Edit</button>
                    <button class="delete-item" data-collection="${collectionId}" data-id="${item.$id}">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        modal.classList.add('active');
    } catch (error) {
        logger.error('Error loading items', error);
        alert('Error loading items. Please try again.');
    }
}

async function viewVoyagers() {
    try {
        const voyagers = await getItems('users', [['role', '==', 'voyager']]);
        const modal = document.getElementById('items-list-modal');
        const title = document.getElementById('items-list-title');
        const content = document.getElementById('items-list-content');

        title.textContent = 'Registered Voyagers';
        content.innerHTML = '<table><thead><tr><th>Name</th><th>Email</th><th>Registered Date</th></tr></thead><tbody></tbody></table>';

        const tbody = content.querySelector('tbody');
        voyagers.forEach(voyager => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${voyager.name || 'N/A'}</td>
                <td>${voyager.email}</td>
                <td>${new Date(voyager.$createdAt).toLocaleDateString()}</td>
            `;
            tbody.appendChild(row);
        });

        modal.classList.add('active');
    } catch (error) {
        logger.error('Error loading voyagers', error);
        alert('Error loading voyagers. Please try again.');
    }
}

async function editItem(collectionId, itemId) {
    // TODO: Implement edit functionality
    alert('Edit functionality coming soon!');
}

async function deleteItemHandler(collectionId, itemId) {
    if (confirm('Are you sure you want to delete this item?')) {
        try {
            await deleteItem(collectionId, itemId);
            logger.info(`Item deleted: ${itemId}`);
            alert('Item deleted successfully!');
            const type = getTypeFromCollectionId(collectionId);
            viewItems(type);
        } catch (error) {
            logger.error('Error deleting item', error);
            alert('Error deleting item. Please try again.');
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    logger.info('Admin dashboard loaded');
    
    // Check authentication
    try {
        const user = await account.get();
        document.getElementById('user-email').textContent = user.email;
    } catch (error) {
        logger.error('Not authenticated', error);
        window.location.href = '../index.html';
        return;
    }

    // Setup logout
    document.getElementById('logout-btn').addEventListener('click', async () => {
        try {
            await logout();
            sessionStorage.clear();
            logger.info('User logged out');
            window.location.href = '../index.html';
        } catch (error) {
            logger.error('Logout error', error);
        }
    });

    // Setup forms
    setupForms();

    // Setup button listeners
    setupButtonListeners();
});

function setupForms() {
    // Add catering item
    document.getElementById('add-catering-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await addItem('catering_items', {
            name: document.getElementById('catering-name').value,
            description: document.getElementById('catering-description').value,
            price: parseFloat(document.getElementById('catering-price').value),
            category: document.getElementById('catering-category').value
        });
    });

    // Add stationery item
    document.getElementById('add-stationery-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await addItem('stationery_items', {
            name: document.getElementById('stationery-name').value,
            description: document.getElementById('stationery-description').value,
            price: parseFloat(document.getElementById('stationery-price').value),
            category: document.getElementById('stationery-category').value
        });
    });

    // Add service
    document.getElementById('add-service-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await addItem('services', {
            type: document.getElementById('service-type').value,
            name: document.getElementById('service-name').value,
            description: document.getElementById('service-description').value,
            price: parseFloat(document.getElementById('service-price').value),
            availability: parseInt(document.getElementById('service-availability').value)
        });
    });

    // Register voyager
    document.getElementById('register-voyager-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await registerVoyager({
            name: document.getElementById('voyager-name').value,
            email: document.getElementById('voyager-email').value,
            password: document.getElementById('voyager-password').value
        });
    });
}

function setupButtonListeners() {
    // Open modal buttons
    document.querySelectorAll('.open-modal').forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Close modal buttons
    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            closeModal(modalId);
        });
    });

    // View items buttons
    document.querySelectorAll('.view-items').forEach(button => {
        button.addEventListener('click', () => {
            const type = button.getAttribute('data-type');
            viewItems(type);
        });
    });

    // View voyagers button (optional on page)
    const viewVoyagersBtn = document.querySelector('.view-voyagers');
    if (viewVoyagersBtn) {
        viewVoyagersBtn.addEventListener('click', () => {
            viewVoyagers();
        });
    }

    // Edit item buttons (delegated event listener)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-item')) {
            const collectionId = e.target.getAttribute('data-collection');
            const itemId = e.target.getAttribute('data-id');
            editItem(collectionId, itemId);
        }
    });

    // Delete item buttons (delegated event listener)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-item')) {
            const collectionId = e.target.getAttribute('data-collection');
            const itemId = e.target.getAttribute('data-id');
            deleteItemHandler(collectionId, itemId);
        }
    });
}

async function addItem(collectionId, data) {
    try {
        await createItem(collectionId, data);
        logger.info(`Item added to ${collectionId}`, data);
        alert('Item added successfully!');
        
        // Close modal and reset form
        const formId = collectionId === 'catering_items' ? 'add-catering-form' :
                      collectionId === 'stationery_items' ? 'add-stationery-form' :
                      'add-service-form';
        const modalId = collectionId === 'catering_items' ? 'add-catering-modal' :
                       collectionId === 'stationery_items' ? 'add-stationery-modal' :
                       'add-service-modal';
        
        document.getElementById(formId).reset();
        closeModal(modalId);
    } catch (error) {
        logger.error('Error adding item', error);
        alert('Error adding item. Please try again.');
    }
}

async function registerVoyager(data) {
    try {
        // Create user account
        await signup(data.email, data.password, data.name);
        
        // Store user role in database (you may need to create a users collection)
        logger.info('Voyager registered', data);
        alert('Voyager registered successfully!');
        
        document.getElementById('register-voyager-form').reset();
        closeModal('register-voyager-modal');
    } catch (error) {
        logger.error('Error registering voyager', error);
        alert('Error registering voyager. Please try again.');
    }
}

