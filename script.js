// ===== MODERN PORTFOLIO JAVASCRIPT =====

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing Effect
const typedText = document.querySelector('.typed-text');
const texts = [
    'Full Stack Developer',
    'Mahasiswa TI UMM',
    'Web Developer',
    'Frontend Developer',
    'Backend Developer'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
}

// Start typing effect
if (typedText) {
    setTimeout(type, 1000);
}

// Scroll to Top Button
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

// Projects Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Project Modal
const projectModal = document.getElementById('projectModal');
const modalClose = projectModal.querySelector('.modal-close');
const modalOverlay = projectModal.querySelector('.modal-overlay');
const viewBtns = document.querySelectorAll('.view-btn');

const projectData = {
    1: {
        title: 'Portfolio Website',
        description: 'Website portfolio personal dengan desain modern, responsif, dan animasi yang menarik. Dibangun dengan HTML5, CSS3, dan JavaScript vanilla untuk performa optimal.',
        image: 'assets/porto.png',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
        github: 'https://github.com/Agussusanto1633',
        demo: '#'
    },
    2: {
        title: 'Landing Page',
        description: 'Landing page untuk startup dengan fokus pada konversi dan user experience. Menggunakan React dan TailwindCSS untuk development yang cepat dan efisien.',
        image: 'assets/koneksijasa.png',
        tags: ['React', 'TailwindCSS', 'JavaScript'],
        github: 'https://github.com/Agussusanto1633',
        demo: '#'
    },
    3: {
        title: 'Mobile Application',
        description: 'Aplikasi mobile cross-platform dengan fitur real-time menggunakan React Native dan Node.js backend. Terintegrasi dengan database MongoDB.',
        image: 'assets/MOBILE.png',
        tags: ['React Native', 'Node.js', 'MongoDB'],
        github: 'https://github.com/Agussusanto1633',
        demo: '#'
    },
    4: {
        title: 'E-Commerce System',
        description: 'Sistem e-commerce lengkap dengan admin panel, manajemen produk, shopping cart, dan integrasi payment gateway. Dibangun dengan PHP Laravel dan MySQL.',
        image: null,
        tags: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
        github: 'https://github.com/Agussusanto1633',
        demo: '#'
    },
    5: {
        title: 'Task Management App',
        description: 'Aplikasi manajemen tugas dengan fitur kolaborasi tim. Menggunakan Vue.js untuk frontend dan Express.js dengan MongoDB untuk backend.',
        image: null,
        tags: ['Vue.js', 'Express.js', 'MongoDB', 'Socket.io'],
        github: 'https://github.com/Agussusanto1633',
        demo: '#'
    },
    6: {
        title: 'UI/UX Design Project',
        description: 'Desain interface aplikasi mobile banking modern dengan fokus pada user experience dan accessibility. Dibuat menggunakan Figma dengan design system yang konsisten.',
        image: null,
        tags: ['Figma', 'UI/UX', 'Design System', 'Prototyping'],
        github: '#',
        demo: 'https://www.figma.com'
    }
};

viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            // Set modal content
            document.getElementById('modalTitle').textContent = project.title;
            document.getElementById('modalDescription').textContent = project.description;
            document.getElementById('modalGithub').href = project.github;
            document.getElementById('modalDemo').href = project.demo;
            
            // Set image or hide it
            const modalImage = document.getElementById('modalImage');
            if (project.image) {
                modalImage.src = project.image;
                modalImage.style.display = 'block';
            } else {
                modalImage.style.display = 'none';
            }
            
            // Set tags
            const modalTags = document.getElementById('modalTags');
            modalTags.innerHTML = '';
            project.tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'tag';
                span.textContent = tag;
                modalTags.appendChild(span);
            });
            
            // Show modal
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeModal();
    }
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Show success message
    alert(`Terima kasih ${formData.name}! Pesan Anda telah dikirim.\n\nSaya akan segera menghubungi Anda di ${formData.email}.`);
    
    // Reset form
    contactForm.reset();
    
    // In production, you would send this data to a server
    console.log('Form data:', formData);
});

// Download CV Function - CLEAN & PROFESSIONAL VERSION
document.getElementById('downloadCV').addEventListener('click', (e) => {
    e.preventDefault();
    
    // Check if jsPDF is loaded
    if (typeof window.jspdf === 'undefined') {
        alert('Loading PDF generator...');
        setTimeout(() => generateCV(), 1000);
        return;
    }
    
    generateCV();
});

function generateCV() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Professional Colors
        const primaryColor = [41, 98, 255]; // Professional Blue
        const darkColor = [33, 37, 41]; // Almost Black
        const grayColor = [108, 117, 125]; // Medium Gray
        const lightGray = [233, 236, 239]; // Light Gray
        
        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 20;
        const contentWidth = pageWidth - (margin * 2);
        
        let yPos = margin;
        
        // ========== PAGE 1 ==========
        
        // HEADER - Simple and Clean
        doc.setFillColor(41, 98, 255);
        doc.rect(0, 0, pageWidth, 45, 'F');
        
        // Name
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(26);
        doc.setFont('helvetica', 'bold');
        doc.text('AGUS SUSANTO', pageWidth / 2, 20, { align: 'center' });
        
        // Title
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Full Stack Developer', pageWidth / 2, 28, { align: 'center' });
        
        // Subtitle
        doc.setFontSize(10);
        doc.text('Mahasiswa Teknik Informatika - Universitas Muhammadiyah Malang', pageWidth / 2, 36, { align: 'center' });
        
        yPos = 55;
        
        // CONTACT INFO - Simple Box
        doc.setFillColor(248, 249, 250);
        doc.rect(margin, yPos, contentWidth, 20, 'F');
        
        doc.setTextColor(...darkColor);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        
        const contactYStart = yPos + 7;
        doc.text('Email: agussusanto@webmail.umm.ac.id', margin + 5, contactYStart);
        doc.text('Phone: +62 857 8567 2280', margin + 5, contactYStart + 6);
        
        doc.text('Location: Blitar, Jawa Timur', pageWidth - margin - 5, contactYStart, { align: 'right' });
        doc.text('GitHub: github.com/Agussusanto1633', pageWidth - margin - 5, contactYStart + 6, { align: 'right' });
        
        yPos += 28;
        
        // PROFIL PROFESIONAL
        doc.setFillColor(...primaryColor);
        doc.rect(margin, yPos, 3, 6, 'F');
        
        doc.setTextColor(...primaryColor);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('PROFIL PROFESIONAL', margin + 6, yPos + 4);
        
        yPos += 8;
        doc.setDrawColor(...lightGray);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        
        yPos += 6;
        doc.setTextColor(...darkColor);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        
        const profileText = 'Mahasiswa Teknik Informatika yang memiliki passion dalam Full Stack Development. Menguasai teknologi frontend seperti HTML, CSS, JavaScript, React, Vue.js, serta backend dengan Node.js, PHP, dan Laravel. Aktif mengembangkan project untuk meningkatkan kemampuan dan terus belajar teknologi terkini.';
        const profileLines = doc.splitTextToSize(profileText, contentWidth);
        doc.text(profileLines, margin, yPos);
        
        yPos += (profileLines.length * 5) + 8;
        
        // PENDIDIKAN
        doc.setFillColor(...primaryColor);
        doc.rect(margin, yPos, 3, 6, 'F');
        
        doc.setTextColor(...primaryColor);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('PENDIDIKAN', margin + 6, yPos + 4);
        
        yPos += 8;
        doc.setDrawColor(...lightGray);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        
        yPos += 8;
        
        // Education Box
        doc.setFillColor(248, 249, 250);
        doc.rect(margin, yPos, contentWidth, 20, 'F');
        
        yPos += 6;
        doc.setTextColor(...darkColor);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Sarjana Teknik Informatika', margin + 5, yPos);
        
        doc.setFontSize(9);
        doc.setTextColor(...grayColor);
        doc.setFont('helvetica', 'normal');
        doc.text('2023 - Sekarang', pageWidth - margin - 5, yPos, { align: 'right' });
        
        yPos += 5;
        doc.setTextColor(...darkColor);
        doc.setFontSize(10);
        doc.text('Universitas Muhammadiyah Malang', margin + 5, yPos);
        
        yPos += 5;
        doc.setFontSize(9);
        doc.setTextColor(...grayColor);
        doc.text('- Fokus pada Full Stack Web Development dan Mobile Development', margin + 5, yPos);
        
        yPos += 13;
        
        // KEAHLIAN TEKNIS
        doc.setFillColor(...primaryColor);
        doc.rect(margin, yPos, 3, 6, 'F');
        
        doc.setTextColor(...primaryColor);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('KEAHLIAN TEKNIS', margin + 6, yPos + 4);
        
        yPos += 8;
        doc.setDrawColor(...lightGray);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        
        yPos += 8;
        
        const skills = [
            {
                category: 'Frontend Development',
                items: 'HTML5, CSS3, JavaScript (ES6+), React.js, Vue.js, Bootstrap, TailwindCSS, Responsive Design'
            },
            {
                category: 'Mobile Development',
                items: 'Dart, Flutter, React Native, Cross-platform Development'
            },
            {
                category: 'Backend Development',
                items: 'Node.js, Express.js, PHP, Laravel, Python, REST API, JWT Authentication'
            },
            {
                category: 'Database & Tools',
                items: 'MySQL, MongoDB, PostgreSQL, Git, GitHub, Postman, Figma, VS Code'
            }
        ];
        
        skills.forEach((skill) => {
            doc.setFillColor(248, 249, 250);
            doc.rect(margin, yPos, contentWidth, 13, 'F');
            
            yPos += 5;
            doc.setTextColor(...primaryColor);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text(skill.category, margin + 3, yPos);
            
            yPos += 5;
            doc.setTextColor(...darkColor);
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            const skillLines = doc.splitTextToSize(skill.items, contentWidth - 6);
            doc.text(skillLines, margin + 3, yPos);
            
            yPos += 6;
        });
        
        // ========== PAGE 2 ==========
        doc.addPage();
        yPos = margin;
        
        // PENGALAMAN PROJECT
        doc.setFillColor(...primaryColor);
        doc.rect(margin, yPos, 3, 6, 'F');
        
        doc.setTextColor(...primaryColor);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('PENGALAMAN PROJECT', margin + 6, yPos + 4);
        
        yPos += 8;
        doc.setDrawColor(...lightGray);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        
        yPos += 8;
        
        const projects = [
            {
                title: 'Portfolio Website Profesional',
                year: '2024',
                description: 'Mengembangkan website portfolio personal dengan desain modern, responsive di semua device, dan interactive UI. Menampilkan profil, keahlian, dan project portfolio dengan animasi yang smooth.',
                tech: 'HTML5, CSS3, JavaScript, Responsive Design'
            },
            {
                title: 'E-Commerce System',
                year: '2024',
                description: 'Membangun sistem e-commerce lengkap dengan admin panel untuk manajemen produk, kategori, dan transaksi. Implementasi shopping cart, checkout system, dan order management.',
                tech: 'PHP, Laravel, MySQL, Bootstrap'
            },
            {
                title: 'Mobile Application (Cross-platform)',
                year: '2024',
                description: 'Mengembangkan aplikasi mobile cross-platform dengan fitur real-time notification dan data synchronization. Implementasi offline-first architecture dan push notification system.',
                tech: 'React Native, Node.js, MongoDB, Socket.io'
            },
            {
                title: 'Task Management Web Application',
                year: '2024',
                description: 'Membuat aplikasi manajemen tugas dengan fitur kolaborasi tim, task assignment, tracking, dan deadline reminder. Implementasi real-time updates dan email notification.',
                tech: 'Vue.js, Express.js, MongoDB'
            }
        ];
        
        projects.forEach((project, index) => {
            // Project Box
            doc.setFillColor(248, 249, 250);
            doc.rect(margin, yPos, contentWidth, 28, 'F');
            
            yPos += 6;
            
            // Project Number
            doc.setFillColor(...primaryColor);
            doc.circle(margin + 4, yPos - 1, 2.5, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            doc.text((index + 1).toString(), margin + 4, yPos, { align: 'center' });
            
            // Project Title
            doc.setTextColor(...darkColor);
            doc.setFontSize(11);
            doc.text(project.title, margin + 9, yPos);
            
            // Year
            doc.setTextColor(...grayColor);
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.text(project.year, pageWidth - margin - 3, yPos, { align: 'right' });
            
            yPos += 5;
            
            // Description
            doc.setTextColor(...darkColor);
            doc.setFontSize(9);
            const descLines = doc.splitTextToSize(project.description, contentWidth - 6);
            doc.text(descLines, margin + 3, yPos);
            
            yPos += (descLines.length * 4) + 2;
            
            // Tech Stack
            doc.setFontSize(8);
            doc.setTextColor(...grayColor);
            doc.setFont('helvetica', 'italic');
            doc.text('Tech Stack: ' + project.tech, margin + 3, yPos);
            
            yPos += 10;
        });
        
        yPos += 2;
        
        // SOFT SKILLS
        doc.setFillColor(...primaryColor);
        doc.rect(margin, yPos, 3, 6, 'F');
        
        doc.setTextColor(...primaryColor);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('SOFT SKILLS', margin + 6, yPos + 4);
        
        yPos += 8;
        doc.setDrawColor(...lightGray);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        
        yPos += 8;
        
        doc.setFillColor(248, 249, 250);
        doc.rect(margin, yPos, contentWidth, 18, 'F');
        
        yPos += 5;
        
        const softSkills = [
            'Problem Solving & Analytical Thinking',
            'Team Collaboration & Communication',
            'Fast Learner & Adaptable',
            'Time Management & Organization',
            'Creative & Innovative Thinking',
            'Self-Motivated & Responsible'
        ];
        
        doc.setTextColor(...darkColor);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        
        const col1X = margin + 3;
        const col2X = margin + (contentWidth / 2);
        
        softSkills.forEach((skill, index) => {
            const row = Math.floor(index / 2);
            const col = index % 2;
            const xPos = col === 0 ? col1X : col2X;
            const yPosSkill = yPos + (row * 5);
            
            doc.text('• ' + skill, xPos, yPosSkill);
        });
        
        // FOOTER
        yPos = pageHeight - 15;
        doc.setDrawColor(...lightGray);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        
        yPos += 5;
        doc.setFontSize(8);
        doc.setTextColor(...grayColor);
        doc.setFont('helvetica', 'normal');
        doc.text('CV ini di-generate otomatis dari portfolio website', pageWidth / 2, yPos, { align: 'center' });
        
        yPos += 4;
        doc.text('Last Updated: ' + new Date().toLocaleDateString('id-ID', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        }), pageWidth / 2, yPos, { align: 'center' });
        
        // Save PDF
        const fileName = 'CV_Agus_Susanto_' + new Date().getFullYear() + '.pdf';
        doc.save(fileName);
        
        // Success Message
        setTimeout(() => {
            alert('✅ CV berhasil didownload!\n\n' +
                  '📄 File: ' + fileName + '\n' +
                  '📊 Total: 2 halaman\n' +
                  '📅 Tanggal: ' + new Date().toLocaleDateString('id-ID') + '\n\n' +
                  'CV siap untuk dikirim! 🚀');
        }, 500);
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('❌ Terjadi kesalahan saat membuat PDF.\n\nSilakan refresh halaman dan coba lagi.');
    }
}

// Animate on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'all 0.6s ease';
    
    const animation = el.getAttribute('data-aos');
    if (animation === 'fade-up') {
        el.style.transform = 'translateY(30px)';
    } else if (animation === 'fade-left') {
        el.style.transform = 'translateX(30px)';
    } else if (animation === 'fade-right') {
        el.style.transform = 'translateX(-30px)';
    }
    
    observer.observe(el);
});

// Skill Progress Animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.querySelector('.skill-progress');
            if (progress) {
                progress.style.width = progress.style.getPropertyValue('--progress');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-item').forEach(item => {
    skillObserver.observe(item);
});

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && scrolled < 800) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Console Message
console.log('%c🚀 Portfolio Website', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%c👨‍💻 Mahasiswa Teknik Informatika UMM', 'color: #8b5cf6; font-size: 16px;');
console.log('%c💻 Full Stack Developer', 'color: #ec4899; font-size: 14px;');
console.log('%c\nTertarik untuk berkolaborasi?\nHubungi: agussusanto@webmail.umm.ac.id', 'color: #10b981; font-size: 12px;');

// Prevent right-click on images (optional - for portfolio protection)
// Uncomment if you want to protect your images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});
*/

// Add custom cursor effect (optional - for extra flair)
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add cursor styles
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid #6366f1;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: 0.1s;
        display: none;
    }
    
    @media (min-width: 1024px) {
        .custom-cursor {
            display: block;
        }
    }
`;
document.head.appendChild(style);

// Easter Egg - Konami Code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        alert('🎉 Selamat! Anda menemukan Easter Egg!\n\n✨ Anda adalah pengunjung yang detail! ✨');
        
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});
