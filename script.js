/**
 * UI INTERACTION ENGINE
 * Handles: System Light/Dark Toggle & Focus Section Scrolling Tracker
 */

// --- 1. Light / Dark Theme Switch Configuration ---
const themeBtn = document.getElementById('themeBtn');

themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeBtn.innerHTML = '🌙'; 
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeBtn.innerHTML = '☀️'; 
    }
});

// --- 2. Scroll Intersection Focus Detector ---
const sections = document.querySelectorAll('.section-target');
const navItems = document.querySelectorAll('.nav-item');

const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -55% 0px', // Focus shifts when target section occupies central screen area
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach(item => {
                if (item.getAttribute('href') === `#${id}`) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// --- 3. Video Demo Modal Control Engines ---
const videoModal = document.getElementById('videoModal');

function openVideoModal(videoUrl) {
    const modalContainer = document.getElementById('videoModal');
    const modalBody = document.getElementById('modalBody');
    
    let playerHtml = '';

    // Check if the link is from YouTube (Embed links or standard strings)
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        playerHtml = `
            <div class="modal-video-wrapper" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; width: 100%;">
                <iframe 
                    src="${videoUrl}" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen 
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;">
                </iframe>
            </div>`;
    } else {
        // Fallback option for native local video formats (.mp4, .mov, etc.)
        playerHtml = `
            <video controls autoplay id="modalVideo" style="width:100%; border-radius:8px;">
                <source src="${videoUrl}">
                Your browser does not support the video tag.
            </video>`;
    }

    modalBody.innerHTML = playerHtml;
    modalContainer.classList.add('active');
}

// Clear out innerHTML when closing so active media streams instantly kill audio playback strings
function closeVideoModal() {
    const modalContainer = document.getElementById('videoModal');
    const modalBody = document.getElementById('modalBody');
    
    modalContainer.classList.remove('active');
    modalBody.innerHTML = ''; 
}

// Close the popup window automatically if the user clicks anywhere outside of the video modal box layout frame
window.addEventListener('click', (event) => {
    if (event.target === videoModal) {
        closeVideoModal();
    }
});

// --- 4. Toast Notification Manager ---
document.addEventListener("DOMContentLoaded", function() {
    const toast = document.getElementById('comingSoonToast');
    let toastTimeout;

    document.querySelectorAll('.pdf-action-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            // Check if document isn't ready
            if (this.getAttribute('data-available') === 'false') {
                event.preventDefault(); // Stop standard download link trigger
                
                // Clear any running timers if they click the button repeatedly
                clearTimeout(toastTimeout);
                
                // Show the toast container element 
                toast.classList.add('show');
                
                // Automatically dismiss / slide away after 4 seconds
                toastTimeout = setTimeout(closeToast, 4000);
            }
        });
    });
});

// Close / Hide toast notification routine
function closeToast() {
    document.getElementById('comingSoonToast').classList.remove('show');
}