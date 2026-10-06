// dashboard.js - Dashboard functionality

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('⚠️ Silakan login terlebih dahulu!');
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(currentUser);
}

// Initialize dashboard
const user = checkAuth();
if (user) {
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
    
    // Update statistics
    updateStats();
}

// Logout handler
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin logout?')) {
            localStorage.removeItem('currentUser');
            alert('👋 Anda telah logout. Sampai jumpa!');
            window.location.href = 'login.html';
        }
    });
}

// Update statistics
function updateStats() {
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const userApplications = applications.filter(app => app.userId === user.id);
    
    document.getElementById('totalApplications').textContent = userApplications.length;
    document.getElementById('pendingApplications').textContent = 
        userApplications.filter(app => app.status === 'Pending' || app.status === 'In Review').length;
    document.getElementById('acceptedApplications').textContent = 
        userApplications.filter(app => app.status === 'Accepted').length;
}