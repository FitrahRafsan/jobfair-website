// apply-job.js

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

// Jobs data
const jobs = [
    { id: 1, title: "Senior Full Stack Developer", company: "Tech Innovators Inc.", location: "Jakarta", type: "Full-time", salary: "Rp 15.000.000 - 25.000.000" },
    { id: 2, title: "UI/UX Designer", company: "Creative Digital Studio", location: "Bandung", type: "Full-time", salary: "Rp 8.000.000 - 15.000.000" },
    { id: 3, title: "Data Scientist", company: "AI Solutions Corp", location: "Surabaya", type: "Full-time", salary: "Rp 12.000.000 - 20.000.000" },
    { id: 4, title: "Marketing Manager", company: "Brand Excellence Co.", location: "Jakarta", type: "Full-time", salary: "Rp 10.000.000 - 18.000.000" },
    { id: 5, title: "Backend Developer (Node.js)", company: "StartUp Ventures", location: "Remote", type: "Remote", salary: "Rp 9.000.000 - 16.000.000" },
    { id: 6, title: "Product Manager", company: "E-Commerce Giant", location: "Jakarta", type: "Full-time", salary: "Rp 14.000.000 - 22.000.000" },
    { id: 7, title: "Mobile Developer (Flutter)", company: "App Development Studio", location: "Yogyakarta", type: "Full-time", salary: "Rp 8.000.000 - 14.000.000" },
    { id: 8, title: "DevOps Engineer", company: "Cloud Services Ltd.", location: "Jakarta", type: "Full-time", salary: "Rp 13.000.000 - 21.000.000" },
    { id: 9, title: "Business Analyst", company: "Consulting Firm Pro", location: "Bali", type: "Full-time", salary: "Rp 9.000.000 - 15.000.000" },
    { id: 10, title: "HR Manager", company: "People First Company", location: "Semarang", type: "Full-time", salary: "Rp 8.000.000 - 13.000.000" },
    { id: 11, title: "Quality Assurance Engineer", company: "Software Quality Inc.", location: "Jakarta", type: "Full-time", salary: "Rp 7.000.000 - 12.000.000" },
    { id: 12, title: "Content Writer & SEO Specialist", company: "Digital Marketing Agency", location: "Remote", type: "Remote", salary: "Rp 6.000.000 - 10.000.000" }
];

let selectedJobId = null;

// Populate job selection
function populateJobSelection() {
    const container = document.getElementById('jobListSelect');
    container.innerHTML = jobs.map(job => `
        <div class="job-item ${selectedJobId === job.id ? 'selected' : ''}" onclick="selectJob(${job.id})">
            <div class="job-title">${job.title}</div>
            <div class="job-company"><i class="fas fa-building"></i> ${job.company}</div>
            <div class="job-details">
                <div class="job-detail-item">
                    <i class="fas fa-map-marker-alt"></i> ${job.location}
                </div>
                <div class="job-detail-item">
                    <i class="fas fa-briefcase"></i> ${job.type}
                </div>
                <div class="job-detail-item">
                    <i class="fas fa-money-bill-wave"></i> ${job.salary}
                </div>
            </div>
        </div>
    `).join('');
}

// Select job
function selectJob(jobId) {
    selectedJobId = jobId;
    populateJobSelection();
}

// Pre-fill user data
document.getElementById('appName').value = user.name;
document.getElementById('appEmail').value = user.email;
document.getElementById('appPhone').value = user.phone;

// Initialize
populateJobSelection();

// Handle form submission
document.getElementById('applicationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!selectedJobId) {
        alert('❌ Silakan pilih pekerjaan yang ingin Anda lamar!');
        return;
    }
    
    const job = jobs.find(j => j.id === selectedJobId);
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    
    const application = {
        id: applications.length + 1,
        userId: user.id,
        jobId: selectedJobId,
        jobTitle: job.title,
        company: job.company,
        name: document.getElementById('appName').value,
        email: document.getElementById('appEmail').value,
        phone: document.getElementById('appPhone').value,
        education: document.getElementById('appEducation').value,
        major: document.getElementById('appMajor').value,
        experience: document.getElementById('appExperience').value,
        expectedSalary: document.getElementById('appSalary').value,
        address: document.getElementById('appAddress').value,
        about: document.getElementById('appAbout').value,
        status: 'Pending',
        date: new Date().toLocaleDateString('id-ID', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
    };
    
    applications.push(application);
    localStorage.setItem('applications', JSON.stringify(applications));
    
    alert('🎉 Lamaran berhasil dikirim!\n\nLamaran Anda untuk posisi "' + job.title + '" telah kami terima.\n\nAnda dapat memantau status lamaran di menu "Status Lamaran".');
    
    window.location.href = 'dashboard.html';
});