// 1. Navigation Panel Module Loader
function switchTab(tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    document.getElementById(`page-${tabId}`).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Global Flags to check if registration has happened
let isProfileActive = false;

// 2. Main Profile Dynamic Registration & Modification Handler
function saveProfileChanges() {
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const roleInput = document.getElementById('role-input').value.trim();
    const emailInput = document.getElementById('email').value.trim();
    
    // Core data validation requirement checklist check
    if(!firstName || !lastName || !emailInput) {
        alert('Required Information Missing: Please complete First Name, Last Name, and Email properties.');
        return;
    }
    
    const fullName = `${firstName} ${lastName}`;

    // Synchronize profile data across the app using localStorage
    localStorage.setItem('userEmail', emailInput);
    localStorage.setItem('pathway_user_fullname', fullName);

    // Update structural text displays in left sidebar live area
    document.getElementById('display-name').textContent = fullName;
    document.getElementById('display-role').textContent = roleInput ? roleInput : "General System Operator";
    
    // Change profile state from offline standby mode variables to active running indicators
    const statusTag = document.getElementById('display-status');
    statusTag.textContent = "Online";
    statusTag.className = "status-badge active";
    
    isProfileActive = true;
    
    // Auto trigger a system onboarding message entry log alert update notification array
    triggerSystemWelcomeNotification(firstName);
    
    alert('User profile updated! Name and email synced across the application.');
}

// 3. Automated Welcome Notification Array Loader
function triggerSystemWelcomeNotification(name) {
    const container = document.getElementById('notifications-container');
    const emptyNotice = document.getElementById('notif-empty');
    
    if(emptyNotice) emptyNotice.style.display = 'none';
    
    const notifItem = document.createElement('div');
    notifItem.className = 'notif-item';
    notifItem.innerHTML = `
        <div class="notif-body">
            <p><strong>System Initialization:</strong> Welcome payload configured for architect node <em>${name}</em>. Authorization logs created.</p>
            <span class="notif-time">Just Now</span>
        </div>
    `;
    container.insertBefore(notifItem, container.firstChild);
    
    const badge = document.getElementById('notif-badge-count');
    badge.textContent = "1";
    badge.style.display = 'inline-block';
    
    document.getElementById('clear-notif-btn').style.display = 'inline-flex';
}

// 4. Save/Add Decisions Dynamic Array Grid Builder
function addNewComparison() {
    if(!isProfileActive) {
        alert('Access Denied: You must initialize and register your core identity profile workspace parameters before logging decision records.');
        return;
    }

    const container = document.getElementById('comparisons-container');
    const emptyNotice = document.getElementById('decisions-empty');
    if(emptyNotice) emptyNotice.style.display = 'none';
    
    const now = new Date();
    const timestampStr = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    const newCard = document.createElement('div');
    newCard.className = 'data-card';
    newCard.innerHTML = `
        <div class="card-title-bar">
            <h4>Decision Array #${container.children.length + 1}</h4>
            <span class="metric-tag">Logged @ ${timestampStr}</span>
        </div>
        <p class="card-desc">User-snapshotted data compilation comparing model metrics against twin cluster configurations.</p>
    `;
    container.insertBefore(newCard, container.firstChild);
}

// 5. Download Simulator Anchor link stream hook utility
function triggerDownload(fileName) {
    const dummyElement = document.createElement('a');
    dummyElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('Twin Simulation Audit Log: ' + fileName));
    dummyElement.setAttribute('download', fileName);
    dummyElement.style.display = 'none';
    document.body.appendChild(dummyElement);
    dummyElement.click();
    document.body.removeChild(dummyElement);
}

// 6. Notification clearing operations utility script
function clearAllNotifications() {
    document.getElementById('notifications-container').innerHTML = `
        <div class="empty-state-notice">
            <i class="fa-solid fa-bell-slash"></i>
            <p>All alert feeds marked read and cleared from terminal monitor screens.</p>
        </div>
    `;
    document.getElementById('notif-badge-count').style.display = 'none';
    document.getElementById('clear-notif-btn').style.display = 'none';
}

// 7. Visual Workspace Light / Tech Dark Mode Toggle Module
function setTheme(themeMode) {
    const lightBtn = document.getElementById('theme-light-btn');
    const darkBtn = document.getElementById('theme-dark-btn');
    
    if(themeMode === 'dark') {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        darkBtn.classList.add('active');
        lightBtn.classList.remove('active');
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        lightBtn.classList.add('active');
        darkBtn.classList.remove('active');
    }
}

// 8. Photo File Upload Stream Reader Interface Engine Pipeline
document.getElementById('avatar-input').addEventListener('change', function(e) {
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('avatar-fallback').style.display = 'none';
            const imgEl = document.getElementById('profile-pic');
            imgEl.src = e.target.result;
            imgEl.style.display = 'block';
        }
        reader.readAsDataURL(this.files[0]);
    }
});

// 9. Danger Zone Reset Clear System Operator Routine Task Function
function resetFullDashboardState() {
    if(confirm('Warning: Are you sure you want to completely erase the profile state variables back to uninitialized blank entries?')) {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('pathway_user_fullname');
        window.location.reload();
    }
}

// 10. Auto pre-fill logged-in email into Profile Email field
document.addEventListener('DOMContentLoaded', () => {
    const savedEmail = localStorage.getItem('userEmail');
    const emailField = document.getElementById('email');
    if (savedEmail && emailField) {
        emailField.value = savedEmail;
    }

    const savedFullName = localStorage.getItem('pathway_user_fullname');
    if (savedFullName) {
        const parts = savedFullName.split(' ');
        if (parts.length > 0 && document.getElementById('first-name')) {
            document.getElementById('first-name').value = parts[0];
        }
        if (parts.length > 1 && document.getElementById('last-name')) {
            document.getElementById('last-name').value = parts.slice(1).join(' ');
        }
        if (document.getElementById('display-name')) {
            document.getElementById('display-name').textContent = savedFullName;
        }
    }
});