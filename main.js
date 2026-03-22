document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen
    const loadingBar = document.getElementById('loading-bar');
    const loader = document.getElementById('loading-screen');
    let loadProgress = 0;
    
    const loadInterval = setInterval(() => {
        loadProgress += Math.floor(Math.random() * 15) + 5;
        if (loadProgress > 100) loadProgress = 100;
        
        const filled = Math.floor(loadProgress / 10);
        const empty = 10 - filled;
        
        if (loadingBar) {
            loadingBar.textContent = `[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${loadProgress}%`;
        }
        
        if (loadProgress === 100) {
            clearInterval(loadInterval);
            setTimeout(() => {
                if (loader) loader.style.opacity = '0';
                setTimeout(() => {
                    if (loader) loader.style.display = 'none';
                }, 500);
                // Start typewriter after loading
                typeWriter();
            }, 300);
        }
    }, 100);

    // 2. Data Rendering
    const data = portfolioData;

    // Hero Section
    document.getElementById('hero-name').textContent = data.name;
    document.getElementById('hero-tagline').textContent = data.tagline;
    if(data.photo) {
        document.getElementById('hero-photo').src = data.photo;
    }
    
    const heroActions = document.getElementById('hero-actions');
    heroActions.innerHTML = `
        <a href="${data.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="btn pixel-border"><i class="devicon-linkedin-plain"></i> LinkedIn</a>
        <a href="${data.socials.github}" target="_blank" rel="noopener noreferrer" class="btn pixel-border"><i class="devicon-github-original"></i> GitHub</a>
        <a href="mailto:${data.socials.email}" target="_blank" rel="noopener noreferrer" class="btn pixel-border">Email</a>
        <a href="${data.resumePDF}" target="_blank" rel="noopener noreferrer" class="btn pixel-border">DOWNLOAD RESUME</a>
    `;

    // About
    document.getElementById('about-text').innerHTML = `<p>${data.about}</p>`;
    const aboutStats = document.getElementById('about-stats');
    data.stats.forEach(stat => {
        aboutStats.innerHTML += `
            <div class="stat-card pixel-border">
                <div class="stat-value" data-target="${stat.value}">0</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `;
    });

    // Education
    const eduTimeline = document.getElementById('education-timeline');
    data.education.forEach(edu => {
        eduTimeline.innerHTML += `
            <div class="timeline-item">
                <div class="timeline-card pixel-border">
                    <div class="timeline-date">${edu.duration}</div>
                    <div class="timeline-title">${edu.degree}</div>
                    <div class="timeline-subtitle">${edu.institution} | ${edu.location}</div>
                    <div style="color: var(--primary);">Score: ${edu.score}</div>
                </div>
            </div>
        `;
    });

    // Skills
    const skillsContainer = document.getElementById('skills-container');
    for (const [category, skills] of Object.entries(data.skills)) {
        let skillsHtml = skills.map(skill => {
            const iconHtml = skill.icon ? `<i class="${skill.icon}"></i> ` : '';
            return `<div class="pill" title="${skill.name}">${iconHtml}${skill.name}</div>`;
        }).join('');
        
        skillsContainer.innerHTML += `
            <div class="skill-category pixel-border">
                <h3 class="category-label">${category}</h3>
                <div class="pills">${skillsHtml}</div>
            </div>
        `;
    }

    // Projects
    const projectsGrid = document.getElementById('projects-grid');
    const projectDots = document.getElementById('project-dots');
    
    data.projects.forEach((proj, index) => {
        const featuredHtml = proj.featured ? `<div class="badge-featured">[FEATURED]</div>` : '';
        const bulletsHtml = proj.bullets.map(b => `<li>${b}</li>`).join('');
        const techHtml = proj.techStack.map(t => `<span class="tech-badge">${t}</span>`).join('');
        
        let githubBtn = '';
        let demoBtn = '';
        
        if (proj.githubURL) {
            githubBtn = `<a href="${proj.githubURL}" target="_blank" rel="noopener noreferrer" class="btn project-link-btn pixel-border" onclick="event.stopPropagation()">[ VIEW ON GITHUB &rarr; ]</a>`;
        } else if (proj.demoURL) {
            githubBtn = `<a href="${proj.demoURL}" target="_blank" rel="noopener noreferrer" class="btn project-link-btn pixel-border" onclick="event.stopPropagation()">[ VIEW PROJECT &rarr; ]</a>`;
        }
        
        if (proj.githubURL && proj.demoURL) {
            demoBtn = `<a href="${proj.demoURL}" target="_blank" rel="noopener noreferrer" class="btn project-link-btn pixel-border" onclick="event.stopPropagation()">[ LIVE DEMO &rarr; ]</a>`;
        }

        let targetUrl = proj.githubURL ? proj.githubURL : (proj.demoURL ? proj.demoURL : '');
        
        if(projectDots) {
            projectDots.innerHTML += `<div class="dot flex-shrink-0" data-index="${index}"></div>`;
        }

        projectsGrid.innerHTML += `
            <div class="project-card pixel-border" style="animation-delay: ${index * 0.1}s;">
                ${featuredHtml}
                <div class="project-title">${proj.title}</div>
                <div class="project-desc">${proj.description}</div>
                <ul class="project-bullets">${bulletsHtml}</ul>
                <div class="project-tech">${techHtml}</div>
                <div class="project-links">
                    ${githubBtn}
                    ${demoBtn}
                </div>
            </div>
        `;
    });

    // Certificates
    const certsGrid = document.getElementById('certs-grid');
    data.certificates.forEach((cert, index) => {
        const onclickAttr = cert.link ? `onclick="window.open('${cert.link}', '_blank', 'noopener,noreferrer')"` : '';
        const clickableClass = cert.link ? 'clickable' : 'dimmed';
        const overlay = cert.link ? `<div class="cert-overlay">VIEW CERTIFICATE &rarr;</div>` : '';
        
        certsGrid.innerHTML += `
            <div class="cert-card ${clickableClass}" style="animation-delay: ${index * 0.1}s;" ${onclickAttr}>
                ${overlay}
                <div class="cert-name">${cert.name}</div>
                <div class="cert-issuer">${cert.issuer}</div>
                <div class="cert-date">${cert.date}</div>
            </div>
        `;
    });

    // Training
    const trainingList = document.getElementById('training-list');
    data.training.forEach(train => {
        const bulletsHtml = train.bullets.map(b => `<li>${b}</li>`).join('');
        const titleHtml = train.link ? `<a href="${train.link}" target="_blank" rel="noopener noreferrer" class="timeline-title" style="display:block; margin-bottom: 8px;">${train.title}</a>` : `<div class="timeline-title">${train.title}</div>`;
        
        trainingList.innerHTML += `
            <div class="timeline-item">
                <div class="timeline-card pixel-border">
                    ${titleHtml}
                    <div class="timeline-date">${train.duration}</div>
                    <div class="timeline-subtitle">${train.provider}</div>
                    <ul class="timeline-bullets">${bulletsHtml}</ul>
                </div>
            </div>
        `;
    });

    // Extracurricular
    const extraTimeline = document.getElementById('extracurricular-timeline');
    data.extracurricular.forEach(extra => {
        const bulletsHtml = extra.bullets.map(b => `<li>${b}</li>`).join('');
        const orgHtml = extra.link ? `<a href="${extra.link}" target="_blank" rel="noopener noreferrer" style="color:var(--text-secondary);">${extra.org}</a>` : extra.org;
        
        extraTimeline.innerHTML += `
            <div class="timeline-item">
                <div class="timeline-card pixel-border">
                    <div class="timeline-date">${extra.duration}</div>
                    <div class="timeline-title">${extra.role}</div>
                    <div class="timeline-subtitle">${orgHtml}</div>
                    <ul class="timeline-bullets">${bulletsHtml}</ul>
                </div>
            </div>
        `;
    });

    // Contact
    const contactLinks = document.getElementById('contact-links');
    contactLinks.innerHTML = `
        <a href="mailto:${data.socials.email}" target="_blank" rel="noopener noreferrer" class="btn contact-btn pixel-border">EMAIL</a>
        <a href="${data.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="btn contact-btn pixel-border"><i class="devicon-linkedin-plain"></i> LINKEDIN</a>
        <a href="${data.socials.github}" target="_blank" rel="noopener noreferrer" class="btn contact-btn pixel-border"><i class="devicon-github-original"></i> GITHUB</a>
    `;

    // 3. Interactions & Animations

    // Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Close menu on click
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('show');
        });
    });

    // Redesign: Full Page Sectioned Scrolling Logic
    const sectionIds = ['hero', 'about', 'education', 'skills', 'projects', 'certificates', 'training', 'extracurricular', 'contact'];
    const sectionsObj = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    
    // Generate Side Dots
    const sideDotsContainer = document.getElementById('side-dots');
    if (sideDotsContainer) {
        sectionIds.forEach((id, index) => {
            const dot = document.createElement('div');
            dot.className = 'side-dot';
            if (index === 0) dot.classList.add('active');
            
            const tooltip = document.createElement('div');
            tooltip.className = 'side-dot-tooltip';
            tooltip.textContent = id.toUpperCase();
            
            dot.appendChild(tooltip);
            dot.addEventListener('click', () => {
                scrollToSection(index);
            });
            sideDotsContainer.appendChild(dot);
        });
    }

    // Progress Line
    const progressLine = document.getElementById('progress-line');
    function updateProgress(index) {
        if (!progressLine) return;
        const total = sectionIds.length - 1;
        const percentage = total > 0 ? (index / total) * 100 : 0;
        progressLine.style.height = `${percentage}%`;
        
        if (sideDotsContainer) {
            Array.from(sideDotsContainer.children).forEach((dot, idx) => {
                dot.classList.toggle('active', idx === index);
            });
        }
    }

    let currentSectionIndex = 0;
    
    // Active Link Highlight (Mobile Navbar Fallback)
    const navItems = document.querySelectorAll('.nav-item');
    function updateMobileNav(index) {
        const id = sectionIds[index];
        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(id)) {
                li.classList.add('active');
            }
        });
    }

    // Intersection Observer for Animations & Syncing
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('section-exit');
                entry.target.classList.add('section-active');
                entry.target.classList.add('visible'); // keep basic compatibility
                
                const index = sectionIds.indexOf(entry.target.id);
                if (index !== -1) {
                    currentSectionIndex = index;
                    updateProgress(currentSectionIndex);
                    updateMobileNav(currentSectionIndex);
                }

                // Explicitly control project scroll elements visibility
                const projectScrollElements = [
                    document.querySelector('.project-scroll-dots'),
                    document.querySelector('.project-scroll-bar'),
                    document.querySelector('.prev-btn'),
                    document.querySelector('.next-btn')
                ];

                if (entry.target.id === 'projects') {
                    projectScrollElements.forEach(el => {
                        if (el) {
                            el.style.opacity = '1';
                            el.style.pointerEvents = 'auto';
                        }
                    });
                } else {
                    // Check if we are leaving projects section
                    // We only want to hide them if they are not in the active section
                    // Since this observer runs for all sections, if target is NOT projects, 
                    // and it's intersecting, it means projects might be exiting.
                    // To be safe, if ANY section other than projects is entering, hide them.
                    projectScrollElements.forEach(el => {
                        if (el) {
                            el.style.opacity = '0';
                            el.style.pointerEvents = 'none';
                        }
                    });
                }
                
                // Stats count-up for about
                if (entry.target.id === 'about') {
                    const counters = entry.target.querySelectorAll('.stat-value');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        if (target > 0 && counter.innerText === "0") {
                            const updateCount = () => {
                                const count = +counter.innerText;
                                const speed = 200;
                                const inc = Math.max(1, target / speed);
                                if (count < target) {
                                    counter.innerText = Math.floor(count + inc);
                                    setTimeout(updateCount, 15);
                                } else {
                                    counter.innerText = target;
                                }
                            };
                            updateCount();
                        }
                    });
                }
            } else {
                entry.target.classList.remove('section-active');
                entry.target.classList.add('section-exit');
            }
        });
    }, { threshold: window.innerWidth > 768 ? 0.5 : 0.15 });

    sectionsObj.forEach((el) => observer.observe(el));

    // Desktop Scrolling Cooldown and Navigation Logic
    let isThrottled = false;
    
    function triggerFlash() {
        const flash = document.getElementById('pixel-transition-flash');
        if (flash) {
            flash.classList.add('flash-active');
            setTimeout(() => flash.classList.remove('flash-active'), 600);
        }
    }

    function scrollToSection(index) {
        if (index < 0 || index >= sectionIds.length) return;
        
        if (window.innerWidth <= 768) {
            sectionsObj[index].scrollIntoView({ behavior: 'smooth' });
            return;
        }
        
        if (isThrottled) return; 
        
        if (currentSectionIndex !== index) {
            triggerFlash();
        }
        
        isThrottled = true;
        currentSectionIndex = index;
        updateProgress(currentSectionIndex);
        updateMobileNav(currentSectionIndex);
        
        const main = document.querySelector('main');
        if (main) {
            main.scrollTo({
                top: sectionsObj[index].offsetTop,
                behavior: 'smooth'
            });
        }
        
        setTimeout(() => {
            isThrottled = false;
        }, 600);
    }

    // Capture Wheel (Desktop) - Debounce trackpad inertia
    let wheelTimeout;
    window.addEventListener('wheel', (e) => {
        if (window.innerWidth <= 768) return;
        
        // Let carousel handle horizontal scrolls
        const isCarousel = e.target.closest('.carousel-container');
        if (isCarousel && (Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;

        e.preventDefault(); 
        
        // Clear any previous trackpad inertia reset
        clearTimeout(wheelTimeout);
        // If throttled, just reset the inertia timeout and ignore
        if (isThrottled) {
            wheelTimeout = setTimeout(() => { isThrottled = false; }, 200); 
            return;
        }

        // Only react to significant scrolls to ignore micro-bounces
        if (Math.abs(e.deltaY) > 10) {
            if (e.deltaY > 0) {
                scrollToSection(currentSectionIndex + 1);
            } else if (e.deltaY < 0) {
                scrollToSection(currentSectionIndex - 1);
            }
        }
    }, { passive: false });

    // Capture Keyboard (Desktop)
    window.addEventListener('keydown', (e) => {
        if (window.innerWidth <= 768) return;
        if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
            e.preventDefault();
            if (!isThrottled) scrollToSection(currentSectionIndex + 1);
        } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
            e.preventDefault();
            if (!isThrottled) scrollToSection(currentSectionIndex - 1);
        }
    }, { passive: false });

    // Capture Touch Swipes (Desktop - some tablets might trigger this if width > 768)
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
        if (window.innerWidth <= 768) return;
        touchStartY = e.touches[0].clientY;
    }, { passive: false });
    
    window.addEventListener('touchmove', (e) => {
        if (window.innerWidth <= 768) return;
        
        const isCarousel = e.target.closest('.carousel-container');
        if (isCarousel) return; // let user side-swipe inside carousel

        e.preventDefault();
        if (isThrottled) return;
        
        const touchEndY = e.touches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        
        if (deltaY > 50) {
            scrollToSection(currentSectionIndex + 1);
        } else if (deltaY < -50) {
            scrollToSection(currentSectionIndex - 1);
        }
    }, { passive: false });

    // Carousel Implementation
    setupCarousel();

    // Particle Background Canvas
    initCanvas();
});

function setupCarousel() {
    const container = document.getElementById('projects-grid');
    const prevBtn = document.getElementById('project-prev');
    const nextBtn = document.getElementById('project-next');
    const progressBar = document.getElementById('project-progress');
    const dots = document.querySelectorAll('.project-scroll-dots .dot');
    
    if(!container) return;

    function getVisibleCardsCount() {
        if(window.innerWidth <= 768) return 1;
        return 2;
    }

    function updateCarouselState() {
        const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
        const scrollLeft = container.scrollLeft;
        
        const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
        if(progressBar) progressBar.style.width = `${progress}%`;
        
        if(prevBtn) {
            if (scrollLeft <= 5) prevBtn.classList.add('disabled');
            else prevBtn.classList.remove('disabled');
        }
        if(nextBtn) {
            if (scrollLeft >= maxScroll - 5) nextBtn.classList.add('disabled');
            else nextBtn.classList.remove('disabled');
        }
        
        const childWidth = container.children[0] ? container.children[0].offsetWidth : 0;
        const gap = parseInt(window.getComputedStyle(container).gap) || 0;
        const itemWidth = childWidth + gap;
        
        const activeIndex = itemWidth > 0 ? Math.round(scrollLeft / itemWidth) : 0;
        
        dots.forEach((dot, idx) => {
            if(idx === activeIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
        
        Array.from(container.children).forEach((card, idx) => {
            if(idx >= activeIndex && idx < activeIndex + getVisibleCardsCount()) {
                card.classList.add('fully-visible');
            } else {
                card.classList.remove('fully-visible');
            }
        });
    }

    container.addEventListener('scroll', updateCarouselState);
    window.addEventListener('resize', updateCarouselState);
    
    setTimeout(updateCarouselState, 100);
    
    function scrollToIndex(index) {
        const childWidth = container.children[0] ? container.children[0].offsetWidth : 0;
        const gap = parseInt(window.getComputedStyle(container).gap) || 0;
        container.scrollTo({
            left: index * (childWidth + gap),
            behavior: 'smooth'
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            scrollToIndex(parseInt(dot.getAttribute('data-index')));
        });
    });

    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            const gap = parseInt(window.getComputedStyle(container).gap) || 0;
            const childWidth = container.children[0] ? container.children[0].offsetWidth : 0;
            container.scrollBy({ left: childWidth + gap, behavior: 'smooth' });
        });
    }

    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            const gap = parseInt(window.getComputedStyle(container).gap) || 0;
            const childWidth = container.children[0] ? container.children[0].offsetWidth : 0;
            container.scrollBy({ left: -(childWidth + gap), behavior: 'smooth' });
        });
    }

    container.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > 0) {
            e.preventDefault();
            container.scrollBy({ left: e.deltaY, behavior: 'auto' });
        }
    });
}

function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    const stars = [];
    const numStars = 150;

    for (let i = 0; i < numStars; i++) {
        const layer = Math.random();
        let speed, size, color;
        
        if (layer < 0.6) {
            // Far background: small, slow, dim
            speed = Math.random() * 0.2 + 0.1;
            size = 1;
            color = 'rgba(255, 255, 255, 0.15)';
        } else if (layer < 0.9) {
            // Mid background: medium speed, cyan tint
            speed = Math.random() * 0.5 + 0.3;
            size = 2;
            color = 'rgba(0, 245, 255, 0.4)';
        } else {
            // Foreground: fast, large, bright white
            speed = Math.random() * 1.5 + 0.8;
            size = 3;
            color = 'rgba(255, 255, 255, 0.8)';
        }

        stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            speed: speed,
            size: size,
            color: color
        });
    }

    // Occasional shooting star
    let shootingStar = null;

    function draw() {
        // Clear canvas for transparency (body bg handles color)
        ctx.clearRect(0, 0, w, h);
        
        // Draw normal stars
        stars.forEach(star => {
            star.y += star.speed;
            
            // Loop back to top
            if (star.y > h) {
                star.y = 0;
                star.x = Math.random() * w;
            }
            
            ctx.fillStyle = star.color;
            // Math.floor keeps it rendering strictly pixelated
            ctx.fillRect(Math.floor(star.x), Math.floor(star.y), star.size, star.size);
        });

        // Handle shooting star logic
        if (!shootingStar) {
            if (Math.random() < 0.003) { // 0.3% chance per frame
                shootingStar = {
                    x: Math.random() * w,
                    y: -50, // start above screen
                    length: Math.random() * 30 + 30, // pixel trail length
                    speed: Math.random() * 15 + 15, // fast drop
                    angle: (Math.random() * 30 - 15) * Math.PI / 180 // slight random angle
                };
            }
        } else {
            shootingStar.x += Math.sin(shootingStar.angle) * shootingStar.speed;
            shootingStar.y += Math.cos(shootingStar.angle) * shootingStar.speed;
            
            // Draw pixelated line for shooting star (drawing series of squares with fading alpha)
            for(let i = 0; i < shootingStar.length; i += 3) {
                const alpha = 1 - (i / shootingStar.length);
                ctx.fillStyle = `rgba(57, 255, 20, ${alpha})`; // neon green trail
                const posX = shootingStar.x - Math.sin(shootingStar.angle) * i;
                const posY = shootingStar.y - Math.cos(shootingStar.angle) * i;
                
                // Shrinking trail thickness
                const thick = i < 10 ? 3 : 2; 
                ctx.fillRect(Math.floor(posX), Math.floor(posY), thick, thick);
            }

            // Remove when fully off screen
            if (shootingStar.y > h + shootingStar.length) {
                shootingStar = null;
            }
        }
        
        requestAnimationFrame(draw);
    }
    
    draw();
}
