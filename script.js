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
        // UPDATE HERE: Visual icon for light mode active state
        themeBtn.innerHTML = '🌙'; 
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        // UPDATE HERE: Visual icon for dark mode active state
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
// --- 3. Video Demo Modal Control Engines ---
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');

function openVideoModal(videoSrc) {
    // 1. Set the video file path source
    modalVideo.src = videoSrc;
    // 2. Display the modal layer
    videoModal.classList.add('show');
    // 3. Auto-play the clip
    modalVideo.play();
}

function closeVideoModal() {
    // 1. Remove the active styling wrapper class
    videoModal.classList.remove('show');
    // 2. Instantly pause audio/video pipes
    modalVideo.pause();
    // 3. Clear source link to free up system memory
    modalVideo.src = "";
}

// Close the popup window automatically if the user clicks anywhere outside of the video frame
window.addEventListener('click', (event) => {
    if (event.target === videoModal) {
        closeVideoModal();
    }
});
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


// Close / Hide function routine
function closeToast() {
    document.getElementById('comingSoonToast').classList.remove('show');
}

sections.forEach(section => observer.observe(section));