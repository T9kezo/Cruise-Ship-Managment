// Main application logic
import { login, signup } from './auth.js';
import { logger } from './logger.js';
import { account } from './appwrite.js';

// Global function for tab switching
window.switchTab = function(tab) {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (tab === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    } else {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    logger.info('Cruise Ship Management App Loaded');
    
    // Check if user is already logged in
    checkAuthStatus();
    
    // Setup login form
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.addEventListener('submit', handleLogin);
    }
    
    // Setup register form
    const registerForm = document.getElementById('register-form-element');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

async function checkAuthStatus() {
    try {
        // Verify account is initialized
        if (!account) {
            logger.error('Appwrite account is not initialized');
            return;
        }
        const user = await account.get();
        // User is logged in, redirect to appropriate dashboard
        redirectToDashboard(user);
    } catch (error) {
        // User is not logged in, show login form
        logger.info('User not authenticated');
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const messageEl = document.getElementById('auth-message');
    
    if (!email || !password || !role) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    try {
        logger.info(`Login attempt for email: ${email}, role: ${role}`);
        const session = await login(email, password);
        
        // Get user info to verify role
        const user = await account.get();
        
        // Store role in sessionStorage (in production, this should come from database)
        sessionStorage.setItem('userRole', role);
        sessionStorage.setItem('userId', user.$id);
        sessionStorage.setItem('userEmail', user.email);
        
        logger.info(`Login successful for user: ${user.email}`);
        showMessage('Login successful! Redirecting...', 'success');
        
        // Redirect to role-specific dashboard
        setTimeout(() => {
            redirectToDashboard(user, role);
        }, 1000);
        
    } catch (error) {
        logger.error('Login failed', error);
        showMessage(error.message || 'Login failed. Please check your credentials.', 'error');
    }
}

function redirectToDashboard(user, role = null) {
    const userRole = role || sessionStorage.getItem('userRole');
    
    const roleMap = {
        'voyager': 'pages/voyager.html',
        'admin': 'pages/admin.html',
        'manager': 'pages/manager.html',
        'headcook': 'pages/headcook.html',
        'supervisor': 'pages/supervisor.html'
    };
    
    const dashboardPath = roleMap[userRole];
    if (dashboardPath) {
        window.location.href = dashboardPath;
    } else {
        logger.warn('Unknown role, staying on login page');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    const role = document.getElementById('reg-role').value;
    const messageEl = document.getElementById('reg-message');
    
    if (!name || !email || !password || !confirmPassword || !role) {
        showRegMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showRegMessage('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 8) {
        showRegMessage('Password must be at least 8 characters long', 'error');
        return;
    }
    
    try {
        logger.info(`Registration attempt for email: ${email}, role: ${role}`);
        const user = await signup(email, password, name);
        
        // Store role in sessionStorage (in production, this should be stored in database)
        sessionStorage.setItem('userRole', role);
        sessionStorage.setItem('userId', user.$id);
        sessionStorage.setItem('userEmail', user.email);
        
        logger.info(`Registration successful for user: ${user.email}`);
        showRegMessage('Registration successful! Redirecting...', 'success');
        
        // Auto-login after registration
        setTimeout(async () => {
            try {
                await login(email, password);
                redirectToDashboard(user, role);
            } catch (error) {
                logger.error('Auto-login after registration failed', error);
                showRegMessage('Registration successful! Please login.', 'success');
                switchTab('login');
            }
        }, 1000);
        
    } catch (error) {
        logger.error('Registration failed', error);
        showRegMessage(error.message || 'Registration failed. Please try again.', 'error');
    }
}

function showMessage(message, type) {
    const messageEl = document.getElementById('auth-message');
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.className = type;
        messageEl.style.display = 'block';
        
        if (type === 'success') {
            setTimeout(() => {
                messageEl.style.display = 'none';
            }, 3000);
        }
    }
}

function showRegMessage(message, type) {
    const messageEl = document.getElementById('reg-message');
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.className = type;
        messageEl.style.display = 'block';
        
        if (type === 'success') {
            setTimeout(() => {
                messageEl.style.display = 'none';
            }, 3000);
        }
    }
}
