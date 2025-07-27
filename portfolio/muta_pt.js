// Preloader
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.preloader').classList.add('fade-out');
    }, 500);
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Video placeholder click handler
        const videoPlaceholder = document.querySelector('.video-placeholder');
        const playButton = document.querySelector('.play-button');

        videoPlaceholder.addEventListener('click', function() {
            // Add a subtle animation when clicked
            playButton.style.transform = 'scale(0.9)';
            setTimeout(() => {
                playButton.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    playButton.style.transform = 'scale(1)';
                }, 150);
            }, 150);
            
             // Google Drive Video - Replace with your actual Google Drive link
    const videoUrl = 'https://drive.google.com/file/d/1Ue9ow40EHAr25QD_Lp3Ff0-ED7gFPAV6/view?usp=sharing';
    replaceWithGoogleDriveVideo(videoUrl);
});

// Function to replace placeholder with Google Drive video
function replaceWithGoogleDriveVideo(driveUrl) {
    // Extract file ID from Google Drive URL
    const fileId = extractGoogleDriveFileId(driveUrl);
    if (!fileId) {
        alert('Invalid Google Drive URL. Please check the link.');
        return;
    }
    
    const container = document.querySelector('.video-container');
    container.innerHTML = `
        <iframe 
            src="https://drive.google.com/file/d/1Ue9ow40EHAr25QD_Lp3Ff0-ED7gFPAV6/view?usp=sharing"  
            width="100%" 
            height="100%" 
            frameborder="0" 
            allow="autoplay" 
            allowfullscreen
            style="aspect-ratio: 16/9;">
        </iframe>
    `;
}

// Scroll to Top Button
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for Scroll Animations
const fadeElems = document.querySelectorAll('.fadeIn');

const appearOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

fadeElems.forEach(elem => {
    appearOnScroll.observe(elem);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced Form submission handling with backend integration
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill all fields');
            return;
        }
        
        // Show loading state (optional)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            // Send data to backend
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                alert(data.error || 'Error sending message. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Network error. You can also email me directly at pwanjala404@gmail.com');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

// Dynamic year for copyright
document.querySelector('.copyright').textContent = 
    `© ${new Date().getFullYear()} Peter Mutambo. All Rights Reserved.`;