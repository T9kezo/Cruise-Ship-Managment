// Manager-specific functionality with CSP-friendly event binding and accessible modal behavior
import { logout } from './auth.js';
import { logger } from './logger.js';
import { getItems } from './database.js';
import { account } from './appwrite.js';

// Focus trap helpers for modal
const focusableSelectors = [
  'a[href]',
  'button:not([disabled])',
  'textarea',
  'input',
  'select',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

// Initialize once DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  logger.info('Manager dashboard loaded');

  // Authentication check
  try {
    const user = await account.get();
    const emailEl = document.getElementById('user-email');
    if (emailEl) emailEl.textContent = user.email;
  } catch (error) {
    logger.error('Not authenticated', error);
    window.location.href = '../index.html';
    return;
  }

  // Elements
  const modal = document.getElementById('bookings-modal');
  const title = document.getElementById('bookings-title');
  const content = document.getElementById('bookings-content');
  const closeBtn = document.getElementById('bookings-close');

  let lastFocusedElement = null;

  const typeNames = {
    movie: 'Resort-Movie',
    beauty: 'Beauty Salon',
    fitness: 'Fitness Center',
    party: 'Party Hall'
  };

  function handleKeydown(e) {
    if (!modal || modal.getAttribute('aria-hidden') === 'true') return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key === 'Tab') {
      const focusable = modal.querySelectorAll(focusableSelectors);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function openModal() {
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.addEventListener('keydown', handleKeydown);
    // Focus close button or first focusable
    const focusTarget = closeBtn || modal.querySelector(focusableSelectors);
    if (focusTarget && typeof focusTarget.focus === 'function') {
      focusTarget.focus();
    }
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', handleKeydown);
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal());
  }

  if (modal) {
    // Click on backdrop closes modal (click target equals modal element)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  async function viewBookings(type) {
    try {
      logger.info('Loading bookings', { type });
      const bookings = await getItems('bookings', [['type', '==', type]]);

      // Update title
      if (title) title.textContent = `${typeNames[type] || type} Bookings`;

      // Render content safely
      if (content) {
        // Clear
        content.textContent = '';

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const trh = document.createElement('tr');
        ['User ID', 'Date', 'Time', 'Details', 'Status'].forEach((h) => {
          const th = document.createElement('th');
          th.textContent = h;
          trh.appendChild(th);
        });
        thead.appendChild(trh);

        const tbody = document.createElement('tbody');

        if (!bookings || bookings.length === 0) {
          const tr = document.createElement('tr');
          const td = document.createElement('td');
          td.colSpan = 5;
          td.style.textAlign = 'center';
          td.textContent = 'No bookings found';
          tr.appendChild(td);
          tbody.appendChild(tr);
        } else {
          bookings.forEach((booking) => {
            const row = document.createElement('tr');

            const tdUser = document.createElement('td');
            tdUser.textContent = booking.user_id || '';

            const tdDate = document.createElement('td');
            tdDate.textContent = booking.date || 'N/A';

            const tdTime = document.createElement('td');
            tdTime.textContent = booking.time || 'N/A';

            const tdDetails = document.createElement('td');
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
            tdDetails.textContent = details;

            const tdStatus = document.createElement('td');
            const span = document.createElement('span');
            span.textContent = booking.status || 'pending';
            span.style.padding = '4px 8px';
            span.style.borderRadius = '4px';
            span.style.background = (booking.status === 'pending') ? '#ffc107' : '#28a745';
            span.style.color = '#ffffff';
            tdStatus.appendChild(span);

            row.appendChild(tdUser);
            row.appendChild(tdDate);
            row.appendChild(tdTime);
            row.appendChild(tdDetails);
            row.appendChild(tdStatus);
            tbody.appendChild(row);
          });
        }

        table.appendChild(thead);
        table.appendChild(tbody);
        content.appendChild(table);
      }

      openModal();
      logger.info(`Viewing ${type} bookings: ${bookings?.length || 0} found`);
    } catch (error) {
      logger.error('Error loading bookings', error);
      let userMessage = 'Error loading bookings. ';
      const message = (error && (error.message || error.type)) || '';
      if (/fetch|network/i.test(message)) {
        userMessage += 'Network or CORS issue detected. Ensure Appwrite CORS allows your origin and use HTTPS for sessions.';
      } else if (error && (error.code === 401 || error.code === 403)) {
        userMessage += 'Unauthorized. Please log in again.';
      } else {
        userMessage += 'Please try again.';
      }
      alert(userMessage);
    }
  }

  // Wire up booking buttons
  const bookingButtons = document.querySelectorAll("button[data-action='view-bookings'][data-type]");
  bookingButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      if (type) viewBookings(type);
    });
  });

  // Setup logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        await logout();
        sessionStorage.clear();
        logger.info('User logged out');
        window.location.href = '../index.html';
      } catch (error) {
        logger.error('Logout error', error);
        alert('Logout failed. Please try again.');
      }
    });
  }
});
