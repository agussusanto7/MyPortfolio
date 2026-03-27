// Typing Animation
const roles = ['Web Developer', 'Mobile Developer', 'UI/UX Designer',];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(type, speed);
}

// Start animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    setTimeout(type, 500);

    // Initialize all event listeners
    initializeEventListeners();
});

// Initialize all event listeners
function initializeEventListeners() {
    // Active menu on scroll
    setupScrollNavigation();

    // Hamburger menu toggle
    setupHamburgerMenu();

    // Download CV functionality
    setupDownloadCV();

    // Service buttons
    setupServiceButtons();

    // Project cards and modal
    setupProjectModal();

    // Certificate cards and modal
    setupCertificateModal();

    // Contact form
    setupContactForm();

    // Newsletter form
    setupNewsletterForm();

    // Scroll to top button
    setupScrollToTop();

    // Navbar scroll effect
    setupNavbarScroll();

    // Smooth scroll for all anchor links
    setupSmoothScroll();
}

// Active menu on scroll
function setupScrollNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu if open
            const nav = document.querySelector('nav');
            const hamburger = document.querySelector('.hamburger');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Hamburger menu toggle
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    });
}

// Fungsionalitas unduh CV - DIPERBARUI KE FORMAT PDF
function setupDownloadCV() {
    const downloadBtn = document.getElementById('downloadCV');
    
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Tampilkan pesan loading
        showNotification('Mempersiapkan CV Anda... ⏳', 'info');
        
        try {
            // Import jsPDF dari UMD
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Atur font
            doc.setFont('helvetica');
            
            // Header - Nama
            doc.setFontSize(24);
            doc.setTextColor(0, 206, 209);
            doc.text('AGUS SUSANTO', 105, 20, { align: 'center' });
            
            // Subjudul
            doc.setFontSize(12);
            doc.setTextColor(100, 100, 100);
            doc.text('Pengembang Web & Pengembang Mobile', 105, 28, { align: 'center' });
            
            // Garis pemisah
            doc.setDrawColor(0, 206, 209);
            doc.setLineWidth(0.5);
            doc.line(20, 32, 190, 32);
            
            // Informasi Kontak
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'bold');
            doc.text('INFORMASI KONTAK', 20, 42);
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(60, 60, 60);
            doc.text('Email: agussusanto@webmail.umm.ac.id', 20, 50);
            doc.text('Telepon: +62 857 8567 2280', 20, 56);
            doc.text('Lokasi: Blitar, Jawa Timur, Indonesia', 20, 62);
            doc.text('LinkedIn: linkedin.com/in/agussusanto', 20, 68);
            doc.text('GitHub: github.com/Agussusanto1633', 20, 74);
            
            // Ringkasan Profesional
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('RINGKASAN PROFESIONAL', 20, 86);
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(60, 60, 60);
            const summaryText = 'Pengembang web dan desainer yang bersemangat dengan pengalaman lebih dari 5 tahun dalam menciptakan solusi digital inovatif. Spesialisasi dalam pengembangan web modern, aplikasi mobile, dan desain UI/UX dengan rekam jejak yang terbukti dalam memberikan proyek berkualitas tinggi.';
            const splitSummary = doc.splitTextToSize(summaryText, 170);
            doc.text(splitSummary, 20, 94);
            
            // Keahlian
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('KEAHLIAN', 20, 115);
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(60, 60, 60);
            doc.text('Pengembangan Web: HTML5, CSS3, JavaScript, React, Node.js, Vue.js', 20, 123);
            doc.text('Pengembangan Mobile: React Native, Flutter, Kotlin', 20, 129);
            doc.text('Desain: Desain UI/UX, Desain Grafis, Figma, Adobe Creative Suite', 20, 135);
            doc.text('Basis Data: MySQL, MongoDB, PostgreSQL, Firebase', 20, 141);
            doc.text('Lainnya: Optimasi SEO, Penulisan Konten, Pemasaran Digital, Git', 20, 147);
            
            // Pengalaman
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('PENGALAMAN', 20, 159);
            
            doc.setFontSize(11);
            doc.setTextColor(0, 206, 209);
            doc.text('Pengembang Web Junior', 20, 167);
            
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('Perusahaan Teknologi | 2020 - Sekarang', 20, 173);
            
            doc.setTextColor(60, 60, 60);
            doc.text('• Memimpin pengembangan lebih dari 20 aplikasi web menggunakan framework modern', 25, 179);
            doc.text('• Meningkatkan performa website sebesar 40% melalui optimasi', 25, 185);
            doc.text('• Membimbing pengembang junior dan melakukan tinjauan kode', 25, 191);
            
            doc.setFontSize(11);
            doc.setTextColor(0, 206, 209);
            doc.text('Pengembang Web', 20, 200);
            
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('Agensi Digital | 2018 - 2020', 20, 206);
            
            doc.setTextColor(60, 60, 60);
            doc.text('• Membangun website responsif untuk berbagai klien di berbagai industri', 25, 212);
            doc.text('• Menerapkan praktik terbaik SEO yang menghasilkan peningkatan lalu lintas', 25, 218);
            doc.text('• Berkolaborasi dengan tim desain untuk menciptakan antarmuka yang user-centric', 25, 224);
            
            // Pendidikan
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('PENDIDIKAN', 20, 236);
            
            doc.setFontSize(11);
            doc.setTextColor(0, 206, 209);
            doc.text('Sarjana Ilmu Komputer', 20, 244);
            
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('Universitas Muhammadiyah Malang | 2014 - 2018', 20, 250);
            
            doc.setTextColor(60, 60, 60);
            doc.text('IPK: 3.8/4.0', 25, 256);
            doc.text('Fokus: Pengembangan Web, Rekayasa Perangkat Lunak', 25, 262);
            
            // Sertifikasi
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('SERTIFIKASI', 20, 274);
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(60, 60, 60);
            doc.text('• Pengembang Web Bersertifikat - Lembaga Sertifikasi Teknologi (2024)', 25, 282);
            doc.text('• Desainer UI/UX Ahli - Akademi Desain Internasional (2023)', 25, 288);
            
            // Simpan PDF
            doc.save('CV_Agus_Susanto.pdf');
            
            // Tampilkan pesan sukses
            setTimeout(() => {
                showNotification('CV berhasil diunduh! 🎉', 'success');
            }, 500);
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            showNotification('Terjadi kesalahan saat membuat CV. Silakan coba lagi.', 'error');
        }
    });
}

// Service buttons functionality
function setupServiceButtons() {
    const serviceButtons = document.querySelectorAll('.service-btn');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const service = e.target.getAttribute('data-service') || 'service';
            const serviceName = e.target.previousElementSibling.previousElementSibling.textContent;
            
            // Show contact section
            const contactSection = document.getElementById('kontak-saya');
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Pre-fill message in contact form
            setTimeout(() => {
                const messageField = document.getElementById('message');
                messageField.value = `Halo, saya tertarik dengan layanan ${serviceName}. Saya ingin mendiskusikan lebih lanjut tentang proyek saya.`;
                messageField.focus();
            }, 800);

            showNotification(`Silakan isi form kontak untuk ${serviceName}`, 'info');
        });
    });
}

// Project Modal Setup
function setupProjectModal() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const closeBtn = modal.querySelector('.close-modal');
    
    const projectData = {
        '3': {
            title: 'Mobile Application',
            image: 'assets/MOBILE.png',
            description: 'Aplikasi mobile KoneksiJasa yang dibangun dengan Flutter. Fitur include push notifications, offline mode, real-time data sync, dan smooth animations. Available untuk iOS dan Android.',
            tags: ['Flutter', 'Firebase', 'Dart', 'API'],
            demo: 'https://drive.google.com/file/d/1wrX1bmGp8O3UQsIgD6jNzRBX1SiViyjZ/view',
            github: 'https://github.com/Agussusanto1633/KBTMOBILEB-.git'
        },
        '5': {
            title: 'Portfolio Website',
            image: 'assets/porto.png',
            description: 'Website portfolio kreatif dengan animasi yang smooth dan interaktif. Menggunakan modern design trends, micro-interactions, dan parallax effects. Optimasi untuk fast loading dan SEO friendly.',
            tags: ['HTML', 'CSS', 'JavaScript'],
            demo: 'https://agussusanto1633.github.io/PortofolioWebAgus/',
            github: 'https://github.com/Agussusanto1633/PortofolioWebAgus.git'
        },
        '6': {
            title: 'Koneksi Jasa Landing Page',
            image: 'assets/koneksijasa.png',
            description: 'Landing page yang dioptimasi untuk konversi maksimal. Design yang eye-catching, clear call-to-actions, fast loading time, dan mobile responsive. Includes A/B testing setup dan analytics integration.',
            tags: ['HTML', 'TailwindCSS', 'JavaScript'],
            demo: 'https://koneksijasa.github.io/KoneksiJasaa/?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn627yF2Ul9Mkv-aicwkJuzsjA852xAbY-PK82TkVEEvYVY7px10Q0Uj80s9o_aem_XHfjtwXJiPw1ezQz15QXbg',
            github: 'https://github.com/Agussusanto1633/KoneksiJasaWeb.git'
        }
    };

    projectCards.forEach(card => {
        const projectBtn = card.querySelector('.project-btn');
        projectBtn.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const project = projectData[projectId];

            if (project) {
                document.getElementById('modalImage').src = project.image;
                document.getElementById('modalTitle').textContent = project.title;
                document.getElementById('modalDescription').textContent = project.description;
                document.getElementById('modalLiveDemo').href = project.demo;
                document.getElementById('modalGithub').href = project.github;

                // Update tags
                const tagsContainer = modal.querySelector('.modal-tags');
                tagsContainer.innerHTML = '';
                project.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'tag';
                    tagSpan.textContent = tag;
                    tagsContainer.appendChild(tagSpan);
                });

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Certificate Modal Setup
function setupCertificateModal() {
    const certificateCards = document.querySelectorAll('.certificate-card');
    const modal = document.getElementById('certificateModal');
    const closeBtn = modal.querySelector('.close-modal');
    
    const certificateData = {
        '1': {
            title: 'Web Development Certification',
            image: 'assets/sertif2.png',
            issuer: 'Tech Academy',
            date: 'January 2023',
            description: 'Comprehensive web development certification covering modern web technologies, best practices, and industry standards.',
            link: 'https://drive.google.com/file/d/15qpu49IVS-6IRIoYI-QE-GPcEhDMclH3/view?usp=sharing'
        },
        '2': {
            title: 'UI/UX Design Specialist',
            image: 'assets/sertif4.png',
            issuer: 'Design Institute',
            date: 'March 2023',
            description: 'Advanced certification in user interface and user experience design principles, design thinking, and prototyping.',
            link: 'https://drive.google.com/file/d/1yvf4l8Oox3yppvpryJv1sz8zXkIYcLVS/view?usp=sharing'
        },
        '3': {
            title: 'Mobile Developer Expert',
            image: 'assets/sertif3.png',
            issuer: 'Mobile Developer Academy',
            date: 'June 2024',
            description: 'Expert-level Mobile certification covering advanced concepts, state management, performance optimization, and best practices.',
            link: 'https://drive.google.com/file/d/1d4etdu08OZ5X5N9X0ZKusHlpp41PW80x/view?usp=sharing'
        },
        '4': {
            title: 'Digital Marketing Pro',
            image: 'assets/sertif1.png',
            issuer: 'Marketing School',
            date: 'September 2024',
            description: 'Professional digital marketing certification covering SEO, SEM, social media marketing, and analytics.',
            link: 'https://drive.google.com/file/d/1qhiGGr6CWpQiqIxC1oHIYLIVfJdqJykx/view?usp=sharing'
        }
    };

    certificateCards.forEach(card => {
        const certBtn = card.querySelector('.cert-btn');
        certBtn.addEventListener('click', () => {
            const certId = card.getAttribute('data-certificate');
            const certificate = certificateData[certId];

            if (certificate) {
                document.getElementById('certModalImage').src = certificate.image;
                document.getElementById('certModalTitle').textContent = certificate.title;
                document.getElementById('certModalIssuer').textContent = 'Issued by: ' + certificate.issuer;
                document.getElementById('certModalDate').textContent = 'Date: ' + certificate.date;
                document.getElementById('certModalView').href = certificate.link;

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Contact Form Setup
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Validation
        if (!name || !email || !message) {
            showNotification('Harap isi semua field yang wajib!', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Format email tidak valid!', 'error');
            return;
        }

        // Simulate sending email (in real app, this would be an API call)
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification(`Terima kasih ${name}! Pesan Anda telah dikirim. Saya akan segera menghubungi Anda.`, 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Newsletter Form Setup
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Format email tidak valid!', 'error');
            return;
        }

        // Simulate subscription (in real app, this would be an API call)
        const submitBtn = newsletterForm.querySelector('button');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Terima kasih! Anda telah berlangganan newsletter kami. 📧', 'success');
            newsletterForm.reset();
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Scroll to Top Button
function setupScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Navbar Scroll Effect
function setupNavbarScroll() {
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Smooth Scroll for All Anchor Links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#' || href === '#privacy' || href === '#terms') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${getNotificationColor(type)};
        color: #fff;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle',
        warning: 'exclamation-triangle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #00CED1 0%, #006666 100%)',
        error: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
        info: 'linear-gradient(135deg, #0088cc 0%, #0066aa 100%)',
        warning: 'linear-gradient(135deg, #ffaa00 0%, #cc8800 100%)'
    };
    return colors[type] || colors.info;
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 15px;
        font-weight: 500;
    }

    .notification-content i {
        font-size: 20px;
    }

    @media (max-width: 768px) {
        .notification {
            right: 15px;
            left: 15px;
            max-width: none;
            top: 80px;
        }
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
});

console.log('%c👋 Hello! Welcome to Agus Susanto Portfolio', 'color: #00CED1; font-size: 20px; font-weight: bold;');
console.log('%c✨ This portfolio is built with vanilla JavaScript, no frameworks needed!', 'color: #aaa; font-size: 14px;');