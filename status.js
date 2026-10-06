// status.js

// Check authentication
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('⚠️ Silakan login terlebih dahulu!');
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(currentUser);
}

const user = checkAuth();
if (user) {
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
}

// Logout handler
document.getElementById('logoutBtn').addEventListener('click', function() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
});

// Populate application status
function populateApplicationStatus() {
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const userApplications = applications.filter(app => app.userId === user.id);
    
    // Check which page we're on
    const container = document.getElementById('statusList') || document.getElementById('historyList');
    
    if (userApplications.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>Belum Ada Lamaran</h3>
                <p>Anda belum mengajukan lamaran apapun. Mulai lamar pekerjaan sekarang!</p>
                <br>
                <a href="apply-job.html" class="btn-primary" style="display: inline-block; text-decoration: none; width: auto; padding: 15px 40px;">
                    <i class="fas fa-plus"></i> Ajukan Lamaran
                </a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = userApplications.map(app => {
        const statuses = ['Pending', 'In Review', 'Accepted', 'Rejected'];
        const statusClasses = ['status-pending', 'status-review', 'status-accepted', 'status-rejected'];
        const statusIndex = statuses.indexOf(app.status);
        
        return `
            <div class="status-item">
                <span class="status-badge ${statusClasses[statusIndex]}">${app.status}</span>
                <div class="job-title">${app.jobTitle}</div>
                <div class="job-company"><i class="fas fa-building"></i> ${app.company}</div>
                <div class="job-details" style="margin-top: 15px;">
                    <div class="job-detail-item">
                        <i class="fas fa-graduation-cap"></i> ${app.education} - ${app.major}
                    </div>
                    <div class="job-detail-item">
                        <i class="fas fa-briefcase"></i> ${app.experience} tahun pengalaman
                    </div>
                    <div class="job-detail-item">
                        <i class="fas fa-money-bill-wave"></i> Ekspektasi: Rp ${parseInt(app.expectedSalary).toLocaleString('id-ID')}
                    </div>
                </div>
                <div class="application-date">
                    <i class="fas fa-calendar"></i> Diajukan pada ${app.date}
                </div>
            </div>
        `;
    }).join('');
}

// Initialize
populateApplicationStatus();