// Voyager-specific functionality
import { logout } from './auth.js';
import { logger } from './logger.js';
import { createItem, getItems } from './database.js';
import { account } from './appwrite.js';
import { ID } from 'appwrite';

// Global functions for HTML onclick handlers
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        if (modalId === 'catering-modal') {
            loadCateringItems();
        } else if (modalId === 'stationery-modal') {
            loadStationeryItems();
        }
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
};

window.viewOrders = function(type) {
    logger.info(`Viewing orders: ${type}`);
    // TODO: Implement order viewing
    alert('Order viewing feature coming soon!');
};

window.viewBookings = function(type) {
    logger.info(`Viewing bookings: ${type}`);
    // TODO: Implement booking viewing
    alert('Booking viewing feature coming soon!');
};

document.addEventListener('DOMContentLoaded', async () => {
    logger.info('Voyager dashboard loaded');
    
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

    // Setup booking forms
    setupBookingForms();
});

async function loadCateringItems() {
    try {
        const items = await getItems('catering_items');
        const container = document.getElementById('catering-items-list');
        container.innerHTML = '<h4>Available Catering Items</h4>';
        
        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'card';
            itemDiv.innerHTML = `
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <p><strong>Price: $${item.price}</strong></p>
                <div class="form-group">
                    <label>Quantity:</label>
                    <input type="number" id="qty-${item.$id}" min="1" value="1">
                </div>
                <button onclick="orderItem('catering_items', '${item.$id}', '${item.name}', ${item.price})">Order</button>
            `;
            container.appendChild(itemDiv);
        });
    } catch (error) {
        logger.error('Error loading catering items', error);
        document.getElementById('catering-items-list').innerHTML = '<p>Error loading items. Please try again.</p>';
    }
}

async function loadStationeryItems() {
    try {
        const items = await getItems('stationery_items');
        const container = document.getElementById('stationery-items-list');
        container.innerHTML = '<h4>Available Stationery Items</h4>';
        
        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'card';
            itemDiv.innerHTML = `
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <p><strong>Price: $${item.price}</strong></p>
                <div class="form-group">
                    <label>Quantity:</label>
                    <input type="number" id="qty-${item.$id}" min="1" value="1">
                </div>
                <button onclick="orderItem('stationery_items', '${item.$id}', '${item.name}', ${item.price})">Order</button>
            `;
            container.appendChild(itemDiv);
        });
    } catch (error) {
        logger.error('Error loading stationery items', error);
        document.getElementById('stationery-items-list').innerHTML = '<p>Error loading items. Please try again.</p>';
    }
}

window.orderItem = async function(collectionType, itemId, itemName, price) {
    const userId = sessionStorage.getItem('userId');
    const quantity = parseInt(document.getElementById(`qty-${itemId}`).value) || 1;
    
    try {
        const orderData = {
            user_id: userId,
            item_id: itemId,
            item_name: itemName,
            type: collectionType === 'catering_items' ? 'catering' : 'stationery',
            quantity: quantity,
            price: price,
            total: price * quantity,
            status: 'pending',
            created_at: new Date().toISOString()
        };
        
        await createItem('orders', orderData);
        logger.info(`Order placed: ${itemName} x${quantity}`);
        alert(`Order placed successfully! ${itemName} x${quantity}`);
        closeModal(collectionType === 'catering_items' ? 'catering-modal' : 'stationery-modal');
    } catch (error) {
        logger.error('Error placing order', error);
        alert('Error placing order. Please try again.');
    }
};

function setupBookingForms() {
    // Movie booking
    document.getElementById('movie-booking-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await createBooking('movie', {
            date: document.getElementById('movie-date').value,
            time: document.getElementById('movie-time').value,
            seats: parseInt(document.getElementById('movie-seats').value)
        });
    });

    // Beauty salon booking
    document.getElementById('beauty-booking-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await createBooking('beauty', {
            date: document.getElementById('beauty-date').value,
            time: document.getElementById('beauty-time').value,
            service: document.getElementById('beauty-service').value
        });
    });

    // Fitness center booking
    document.getElementById('fitness-booking-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await createBooking('fitness', {
            date: document.getElementById('fitness-date').value,
            time: document.getElementById('fitness-time').value,
            session: document.getElementById('fitness-session').value
        });
    });

    // Party hall booking
    document.getElementById('party-booking-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await createBooking('party', {
            date: document.getElementById('party-date').value,
            time: document.getElementById('party-time').value,
            event_type: document.getElementById('party-type').value,
            guests: parseInt(document.getElementById('party-guests').value)
        });
    });
}

async function createBooking(type, data) {
    const userId = sessionStorage.getItem('userId');
    
    try {
        const bookingData = {
            user_id: userId,
            type: type,
            date: data.date,
            time: data.time,
            status: 'pending',
            created_at: new Date().toISOString(),
            ...data
        };
        
        await createItem('bookings', bookingData);
        logger.info(`Booking created: ${type}`, bookingData);
        alert('Booking created successfully!');
        
        // Close modal and reset form
        closeModal(`${type}-modal`);
        document.getElementById(`${type}-booking-form`).reset();
    } catch (error) {
        logger.error('Error creating booking', error);
        alert('Error creating booking. Please try again.');
    }
}

