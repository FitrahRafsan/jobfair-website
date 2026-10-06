// auth.js - Authentication handling

// Get users from localStorage or initialize with demo user
function getUsers() {
    const users = localStorage.getItem('users');
    if (users) {
        return JSON.parse(users);
    } else {
        // Initialize with demo user
        const demoUsers = [{
            id: 1,
            name: "Demo User",
            email: "demo@careerhub.com",
            password: "demo123",
            phone: "08123456789"
        }];
        localStorage.setItem('users', JSON.stringify(demoUsers));
        return demoUsers;
    }
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Handle Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Save current user to localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Show success message
            alert('✅ Login berhasil! Selamat datang, ' + user.name + '!');
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            alert('❌ Email atau password salah!\n\nGunakan akun demo:\nEmail: demo@careerhub.com\nPassword: demo123');
        }
    });
}

// Handle Register
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const phone = document.getElementById('regPhone').value;
        
        const users = getUsers();
        
        // Check if email already exists
        if (users.find(u => u.email === email)) {
            alert('❌ Email sudah terdaftar!\n\nSilakan gunakan email lain atau login dengan akun yang sudah ada.');
            return;
        }
        
        // Create new user
        const newUser = {
            id: users.length + 1,
            name: name,
            email: email,
            password: password,
            phone: phone
        };
        
        users.push(newUser);
        saveUsers(users);
        
        alert('✅ Registrasi berhasil!\n\nSilakan login dengan akun yang baru Anda buat.');
        
        // Redirect to login page
        window.location.href = 'login.html';
    });
}