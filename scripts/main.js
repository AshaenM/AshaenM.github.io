// Load and render data from data.json
let siteData = {};

async function loadData() {
    try {
        // Try relative path first (works for both root and subdirectory GitHub Pages)
        let response = await fetch('./data.json');
        
        // If that fails, try absolute path (for root-level GitHub Pages)
        if (!response.ok) {
            response = await fetch('/data.json');
        }
        
        // If still fails, try without leading slash (fallback)
        if (!response.ok) {
            response = await fetch('data.json');
        }
        
        if (!response.ok) {
            throw new Error(`Failed to load data.json: ${response.status} ${response.statusText}`);
        }
        
        siteData = await response.json();
        console.log('Data loaded successfully:', siteData);
        console.log('Projects found:', siteData.projects ? siteData.projects.length : 0);
        renderContent();
    } catch (error) {
        console.error('Error loading data:', error);
        // Show user-friendly error message
        const heroBio = document.getElementById('hero-bio');
        if (heroBio) {
            heroBio.textContent = 'Unable to load content. Please refresh the page.';
            heroBio.style.color = '#ef4444';
        }
        // Also show error in projects section
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = `<p style="text-align: center; color: #ef4444; grid-column: 1 / -1;">Error loading projects. Please check the browser console for details.</p>`;
        }
    }
}

function renderContent() {
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderExperience();
    renderContact();
}

function renderAbout() {
    const aboutDescription = document.getElementById('about-description');
    if (aboutDescription && siteData.personal) {
        aboutDescription.textContent = siteData.personal.about || 'Loading...';
    }
}

function renderHero() {
    const personal = siteData.personal;
    
    // Set profile image
    const profileImg = document.getElementById('profile-image');
    if (profileImg) {
        profileImg.src = personal.profileImage;
        profileImg.alt = personal.name;
    }
    
    // Set title and bio
    const heroTitle = document.getElementById('hero-title');
    const heroBio = document.getElementById('hero-bio');
    if (heroTitle) heroTitle.textContent = personal.title;
    if (heroBio) heroBio.textContent = personal.bio;
    
    // Render social links
    const heroSocial = document.getElementById('hero-social');
    if (heroSocial) {
        heroSocial.innerHTML = `
            <a href="${personal.linkedin}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
                <img src="assets/linkedin.png" alt="LinkedIn">
            </a>
            <a href="${personal.github}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub">
                <img src="assets/github.png" alt="GitHub">
            </a>
        `;
    }
}

function renderSkills() {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid || !siteData.skills) return;
    
    // Group skills by category
    const skillsByCategory = {};
    siteData.skills.forEach(skill => {
        if (!skillsByCategory[skill.category]) {
            skillsByCategory[skill.category] = [];
        }
        skillsByCategory[skill.category].push(skill);
    });
    
    skillsGrid.innerHTML = Object.keys(skillsByCategory).map(category => `
        <div class="skill-category">
            <h4 class="skill-category-title">${category}</h4>
            <div class="skill-tags">
                ${skillsByCategory[category].map(skill => `
                    <span class="skill-tag" data-level="${skill.level.toLowerCase()}">
                        ${skill.name}
                    </span>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) {
        console.error('Projects grid element not found');
        return;
    }
    
    if (!siteData.projects || siteData.projects.length === 0) {
        projectsGrid.innerHTML = '<p style="text-align: center; color: var(--text-muted); grid-column: 1 / -1;">No projects found. Please add projects to data.json</p>';
        return;
    }
    
    console.log('Rendering projects:', siteData.projects.length);
    
    projectsGrid.innerHTML = siteData.projects.map(project => `
        <div class="project-card" data-project-id="${project.id}">
            <div class="project-image-wrapper">
                <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='assets/placeholder.png'; this.onerror=null;">
                <div class="project-overlay">
                    <div class="project-links">
                        ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub</a>` : ''}
                        <button class="project-link project-details-btn">Details</button>
                    </div>
                </div>
            </div>
            <div class="project-content">
                <span class="project-category">${project.category}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies ? project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('') : ''}
                </div>
            </div>
        </div>
    `).join('');
    
    // Add event listeners for project details
    document.querySelectorAll('.project-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const projectId = parseInt(projectCard.dataset.projectId);
            openProjectModal(projectId);
        });
    });
    
    // Re-observe project cards for animations
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
}

function openProjectModal(projectId) {
    const project = siteData.projects.find(p => p.id === projectId);
    if (!project) return;
    
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <div class="modal-project-image">
            <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="modal-project-content">
            <span class="modal-project-category">${project.category}</span>
            <h2 class="modal-project-title">${project.title}</h2>
            <p class="modal-project-description">${project.description}</p>
            <div class="modal-project-highlights">
                <h3>Key Highlights</h3>
                <ul>
                    ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-project-tech">
                <h3>Technologies</h3>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            ${project.github ? `
                <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                    View on GitHub →
                </a>
            ` : ''}
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function renderExperience() {
    const experienceTimeline = document.getElementById('experience-timeline');
    if (!experienceTimeline || !siteData.experience) return;
    
    if (siteData.experience.length === 0) {
        experienceTimeline.innerHTML = `
            <div class="timeline-empty">
                <p>Experience entries will appear here. Edit data.json to add your experience.</p>
            </div>
        `;
        return;
    }
    
    experienceTimeline.innerHTML = siteData.experience.map(exp => `
        <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <h3 class="timeline-title">${exp.title}</h3>
                    <span class="timeline-company">${exp.company}</span>
                </div>
                <span class="timeline-date">${exp.startDate} - ${exp.endDate}</span>
                <p class="timeline-description">${exp.description}</p>
                ${exp.achievements && exp.achievements.length > 0 ? `
                    <ul class="timeline-achievements">
                        ${exp.achievements.map(ach => `<li>${ach}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function renderContact() {
    const contactLinks = document.getElementById('contact-links');
    const personal = siteData.personal;
    
    if (contactLinks) {
        contactLinks.innerHTML = `
            <a href="mailto:${personal.email}" class="contact-link">
                <div class="contact-icon">
                    <img src="assets/email.png" alt="Email">
                </div>
                <span>${personal.email}</span>
            </a>
            <a href="${personal.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-link">
                <div class="contact-icon">
                    <img src="assets/linkedin.png" alt="LinkedIn">
                </div>
                <span>LinkedIn Profile</span>
            </a>
        `;
    }
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Modal functionality
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.modal-close');
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Navbar scroll effect
    let lastScroll = 0;
    const nav = document.getElementById('nav');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections and timeline items (projects will be observed after they're rendered)
    document.querySelectorAll('.section, .timeline-item').forEach(el => {
        observer.observe(el);
    });
});
