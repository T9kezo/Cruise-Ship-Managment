// Manager-specific functionality
import { logout } from './auth.js';
import { logger } from './logger.js';
import { getItems } from './database.js';
import { account } from './appwrite.js';

// Global functions for HTML onclick handlers
window.viewBookings = async function(type) {
    try {
        const bookings = await getItems('bookings', [['type', '==', type]]);
        const modal = document.getElementById('bookings-modal');
        const title = document.getElementById('bookings-title');
        const content = document.getElementById('bookings-content');
        
        const typeNames = {
            'movie': 'Resort-Movie',
            'beauty': 'Beauty Salon',
            'fitness': 'Fitness Center',
            'party': 'Party Hall'
        };
        
        title.textContent = `${typeNames[type] || type} Bookings`;
        content.innerHTML = '<table><thead><tr><th>User ID</th><th>Date</th><th>Time</th><th>Details</th><th>Status</th></tr></thead><tbody></tbody></table>';
        
        const tbody = content.querySelector('tbody');
        if (bookings.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No bookings found</td></tr>';
        } else {
            bookings.forEach(booking => {
                const row = document.createElement('tr');
                let details = '';
                
                if (type === 'movie') {
                    details = `Seats: ${booking.seats || 'N/A'}`;
                } else if (type === 'beauty') {
                    details = `Service: ${booking.service || 'N/A'}`;
                } else if (type === 'fitness') {
                    details = `Session: ${booking.session || 'N/A'}`;
                } else if (type === 'party') {
                    details = `Event: ${booking.event_type || 'N/A'}, Guests: ${booking.guests || 'N/A'}`;
                }
                
                row.innerHTML = `
                    <td>${booking.user_id}</td>
                    <td>${booking.date || 'N/A'}</td>
                    <td>${booking.time || 'N/A'}</td>
                    <td>${details}</td>
                    <td><span style="padding: 4px 8px; border-radius: 4px; background: ${booking.status === 'pending' ? '#ffc107' : '#28a745'}; color: white;">${booking.status || 'pending'}</span></td>
                `;
                tbody.appendChild(row);
            });
        }
        
        modal.classList.add('active');
        logger.info(`Viewing ${type} bookings: ${bookings.length} found`);
    } catch (error) {
        logger.error('Error loading bookings', error);
        alert('Error loading bookings. Please try again.');
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    logger.info('Manager dashboard loaded');
    
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
});

