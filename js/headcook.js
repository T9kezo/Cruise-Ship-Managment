// Head-Cook-specific functionality
import { logout } from './auth.js';
import { logger } from './logger.js';
import { getItems, updateItem } from './database.js';
import { account } from './appwrite.js';

// Global functions for HTML onclick handlers
window.viewOrders = async function(status = null) {
    try {
        let queries = [['type', '==', 'catering']];
        if (status) {
            queries.push(['status', '==', status]);
        }
        
        const orders = await getItems('orders', queries);
        const modal = document.getElementById('orders-modal');
        const title = document.getElementById('orders-title');
        const content = document.getElementById('orders-content');
        
        title.textContent = status ? `Catering Orders - ${status.charAt(0).toUpperCase() + status.slice(1)}` : 'All Catering Orders';
        content.innerHTML = '<table><thead><tr><th>Order ID</th><th>Item Name</th><th>Quantity</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead><tbody></tbody></table>';
        
        const tbody = content.querySelector('tbody');
        if (orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No orders found</td></tr>';
        } else {
            orders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.$id.substring(0, 8)}...</td>
                    <td>${order.item_name || 'N/A'}</td>
                    <td>${order.quantity || 1}</td>
                    <td>$${order.total || order.price || 'N/A'}</td>
                    <td><span style="padding: 4px 8px; border-radius: 4px; background: ${order.status === 'pending' ? '#ffc107' : order.status === 'processing' ? '#17a2b8' : '#28a745'}; color: white;">${order.status || 'pending'}</span></td>
                    <td>
                        ${order.status === 'pending' ? `<button onclick="updateOrderStatus('${order.$id}', 'processing')">Start Processing</button>` : ''}
                        ${order.status === 'processing' ? `<button onclick="updateOrderStatus('${order.$id}', 'completed')">Mark Complete</button>` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
        
        modal.classList.add('active');
        logger.info(`Viewing catering orders: ${orders.length} found`);
    } catch (error) {
        logger.error('Error loading orders', error);
        alert('Error loading orders. Please try again.');
    }
};

window.updateOrderStatus = async function(orderId, newStatus) {
    try {
        await updateItem('orders', orderId, { status: newStatus });
        logger.info(`Order status updated: ${orderId} -> ${newStatus}`);
        alert('Order status updated successfully!');
        viewOrders();
    } catch (error) {
        logger.error('Error updating order status', error);
        alert('Error updating order status. Please try again.');
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    logger.info('Head-Cook dashboard loaded');
    
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

