// Initialize EmailJS (add your public key here)
emailjs.init('nNI2qdzoeGGO39pLt'); // Replace with your actual EmailJS public key

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

if (videoPlaceholder && playButton) {
    videoPlaceholder.addEventListener('click', function() {
        // Add a subtle animation when clicked
        playButton.style.transform = 'scale(0.9)';
        setTimeout(() => {
            playButton.style.transform = 'scale(1.1)';
            setTimeout(() => {
                playButton.style.transform = 'scale(1)';
            }, 150);
        }, 150);
        
        // Google Drive Video 
        const videoUrl = 'https://drive.google.com/file/d/1Ue9ow40EHAr25QD_Lp3Ff0-ED7gFPAV6/view?usp=sharing';
        replaceWithGoogleDriveVideo(videoUrl);
    });
}

// Function to extract Google Drive file ID from URL
function extractGoogleDriveFileId(url) {
    // Handle different Google Drive URL formats
    const patterns = [
        /\/file\/d\/([a-zA-Z0-9-_]+)/,  // Standard sharing URL
        /id=([a-zA-Z0-9-_]+)/,         // Alternative format
        /\/d\/([a-zA-Z0-9-_]+)/        // Short format
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            return match[1];
        }
    }
    return null;
}

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
            src="https://drive.google.com/file/d/${fileId}/preview"
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

// Enhanced Form submission handling with EmailJS
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
        
        try {
            // Send email using EmailJS
            const result = await emailjs.send(
                'service_izd76ek',        // Replace with your EmailJS service ID
                'template_zeksqom',       // Replace with your EmailJS template ID
                {
                    from_name: name,
                    from_email: email,
                    message: message,
                    to_email: 'pwanjala404@gmail.com',
                    reply_to: email
                },
                'nNI2qdzoeGGO39pLt'         // Replace with your EmailJS public key
            );
            
            if (result.status === 200) {
                // Success message
                alert('✅ Message sent successfully! Thank you for reaching out. I will get back to you soon.');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
            
        } catch (error) {
            console.error('EmailJS Error:', error);
            
            // Fallback: Open email client with pre-filled message
            const subject = encodeURIComponent('Contact from Portfolio Website');
            const body = encodeURIComponent(`Hi Peter,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nBest regards,\n${name}`);
            const mailtoLink = `mailto:pwanjala404@gmail.com?subject=${subject}&body=${body}`;
            
            // Show user-friendly error message and offer alternatives
            const userConfirmed = confirm(
                '❌ There was an issue sending your message through the form.\n\n' +
                '📧 Would you like to open your email client instead?\n\n' +
                'Click "OK" to open your email app with the message pre-filled, or "Cancel" to copy my email address.'
            );
            
            if (userConfirmed) {
                window.open(mailtoLink, '_blank');
                alert('📧 Your email client should open with the message pre-filled. Please send it from there.');
                contactForm.reset();
            } else {
                // Copy email to clipboard
                navigator.clipboard.writeText('pwanjala404@gmail.com').then(() => {
                    alert('📋 Email address copied to clipboard: pwanjala404@gmail.com\n\nYou can now paste it in your email app.');
                }).catch(() => {
                    alert('📧 Please email me directly at: pwanjala404@gmail.com');
                });
            }
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.style.opacity = '1';
        }
    });
}

// Dynamic year for copyright
const copyrightElement = document.querySelector('.copyright');
if (copyrightElement) {
    copyrightElement.textContent = `© ${new Date().getFullYear()} Peter Wanjala. All Rights Reserved.`;
}