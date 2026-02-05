// ===================================
// Astra 2.0 Digital Inauguration
// Interactive Script
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const inaugurationBtn = document.getElementById('inauguration-btn');
    const inaugurationSection = document.getElementById('inauguration-section');
    const videoSection = document.getElementById('video-section');
    const video = document.getElementById('inauguration-video');
    const closeVideoBtn = document.getElementById('close-video-btn');

    // Check if all elements exist
    if (!inaugurationBtn || !inaugurationSection || !videoSection || !video || !closeVideoBtn) {
        console.error('Required DOM elements not found');
        return;
    }

    // ===================================
    // Inauguration Button Click Handler
    // ===================================
    inaugurationBtn.addEventListener('click', () => {
        startInauguration();
    });

    // ===================================
    // Start Inauguration Function
    // ===================================
    function startInauguration() {
        // Add fade-out class to inauguration section
        inaugurationSection.classList.add('fade-out');

        // Wait for fade-out animation to complete
        setTimeout(() => {
            // Hide inauguration section
            inaugurationSection.style.display = 'none';

            // Show video section
            videoSection.classList.add('active');

            // Play video after a short delay for smooth transition
            setTimeout(() => {
                video.play().catch(error => {
                    console.error('Error playing video:', error);
                    // If autoplay fails, show play button overlay
                    showPlayButton();
                });
            }, 1000);
        }, 600); // Match CSS transition duration
    }

    // ===================================
    // Show Play Button (Fallback)
    // ===================================
    function showPlayButton() {
        // Create play button overlay if autoplay fails
        const playOverlay = document.createElement('div');
        playOverlay.className = 'play-overlay';
        playOverlay.innerHTML = `
            <button class="play-btn" aria-label="Play Video">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5v14l11-7L8 5z" fill="currentColor"/>
                </svg>
            </button>
        `;

        videoSection.appendChild(playOverlay);

        const playBtn = playOverlay.querySelector('.play-btn');
        playBtn.addEventListener('click', () => {
            video.play();
            playOverlay.remove();
        });
    }

    // ===================================
    // Close Video Button Handler
    // ===================================
    closeVideoBtn.addEventListener('click', () => {
        closeVideo();
    });

    // ===================================
    // Close Video Function
    // ===================================
    function closeVideo() {
        // Pause video
        video.pause();
        video.currentTime = 0;

        // Hide video section
        videoSection.classList.remove('active');

        // Show inauguration section again
        setTimeout(() => {
            inaugurationSection.style.display = 'flex';
            inaugurationSection.classList.remove('fade-out');
        }, 600);
    }

    // ===================================
    // Video Event Listeners
    // ===================================

    // When video ends, optionally loop or show replay option
    video.addEventListener('ended', () => {
        // Option 1: Loop the video
        // video.currentTime = 0;
        // video.play();

        // Option 2: Show replay button (uncomment if needed)
        // showReplayButton();
    });

    // ===================================
    // Keyboard Accessibility
    // ===================================

    // Allow Enter/Space to trigger button
    inaugurationBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            startInauguration();
        }
    });

    // Allow Escape key to close video
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoSection.classList.contains('active')) {
            closeVideo();
        }
    });

    // ===================================
    // Enhanced Cursor Reactivity
    // ===================================

    // Create cursor glow effect
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    // Track mouse position for parallax and glow
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const orbs = document.querySelectorAll('.gradient-orb');
        const mouseXPercent = e.clientX / window.innerWidth;
        const mouseYPercent = e.clientY / window.innerHeight;

        // Enhanced parallax effect on orbs (doubled speed)
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 40; // Increased from 20 to 40
            const x = (mouseXPercent - 0.5) * speed;
            const y = (mouseYPercent - 0.5) * speed;

            orb.style.transform = `translate(${x}px, ${y}px)`;
        });

        // Update cursor glow position
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // ===================================
    // Animated Stats Counter
    // ===================================

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                // Add + only for numbers greater than 3
                element.textContent = target > 3 ? target + '+' : target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Start counter animation when page loads
    setTimeout(() => {
        document.querySelectorAll('.stat-number').forEach(animateCounter);
    }, 1500);

    // Add hover effect to stats
    document.querySelectorAll('.stat-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const number = item.querySelector('.stat-number');
            number.style.transform = 'scale(1.1)';
        });

        item.addEventListener('mouseleave', () => {
            const number = item.querySelector('.stat-number');
            number.style.transform = 'scale(1)';
        });
    });

    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c🚀 Astra 2.0 Bootcamp Inauguration', 'font-size: 20px; font-weight: bold; color: #6366f1;');
    console.log('%cWelcome to the future of innovation!', 'font-size: 14px; color: #a1a1aa;');
});
