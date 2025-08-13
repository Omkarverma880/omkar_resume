// Simple portfolio functionality
document.addEventListener('DOMContentLoaded', function() {
    initThemeSwitcher(); // Initialize themes first
    initNavigation();
    initScrollAnimations();
    initMobileMenu();
    initDarkMode();
    initRainEffect();
    initScrollToTop(); // Initialize scroll to top button
    initSkillBars(); // Initialize skill bar animations
    initScrollReveal(); // Initialize scroll-triggered animations
    initActiveNavigation(); // Initialize active section highlighting
    
    // Initialize hero animation with a small delay to ensure page is fully loaded
    setTimeout(() => {
        initHeroAnimation();
    }, 100);
});

// Dark Mode Functionality
function initDarkMode() {
    const darkModeBtn = document.getElementById('darkModeBtn');
    const darkModeIcon = document.getElementById('darkModeIcon');
    const body = document.body;
    
    // Check for saved dark mode setting or default to light mode
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
    }
    
    // Update icon based on dark mode setting
    updateDarkModeIcon(isDarkMode);
    
    // Dark mode toggle functionality
    darkModeBtn.addEventListener('click', function() {
        const isDarkMode = body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        }
        
        updateDarkModeIcon(!isDarkMode);
        
        // Add transition effect
        body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
}

function updateDarkModeIcon(isDarkMode) {
    const darkModeIcon = document.getElementById('darkModeIcon');
    if (isDarkMode) {
        darkModeIcon.className = 'fas fa-sun';
    } else {
        darkModeIcon.className = 'fas fa-moon';
    }
}

// Theme Switcher Functionality
function initThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    
    // Force blue as default and clear any old localStorage
    localStorage.removeItem('colorTheme'); // Clear any cached theme
    const defaultTheme = 'blue';
    localStorage.setItem('colorTheme', defaultTheme);
    
    // Apply default blue theme
    setTheme(defaultTheme);
    updateActiveThemeButton(defaultTheme);
    
    // Add click event listeners to theme buttons
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            setTheme(theme);
            updateActiveThemeButton(theme);
            localStorage.setItem('colorTheme', theme);
            
            // Refresh rain effect with new colors
            refreshRainColors();
            
            // Add smooth transition effect
            body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
    });
}

function setTheme(theme) {
    const body = document.body;
    // Set data-theme attribute for CSS theme selectors
    body.setAttribute('data-theme', theme);
}

function updateActiveThemeButton(activeTheme) {
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-theme') === activeTheme) {
            button.classList.add('active');
        }
    });
}

// Hero animation with typing effect
function initHeroAnimation() {
    const heroTextContainer = document.querySelector('.hero-text-container');
    const subtitleSection = document.querySelector('.subtitle-section');
    const typingText = document.getElementById('typing-text-main');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    
    // Text content to type
    const textToType = 'Hi, I\'m Omkar Verma';
    
    // Initially hide elements and clear typing text
    if (heroTextContainer) {
        heroTextContainer.style.opacity = '0';
        heroTextContainer.style.transform = 'translateY(30px)';
    }
    
    if (subtitleSection) {
        subtitleSection.style.opacity = '0';
        subtitleSection.style.transform = 'translateY(30px)';
    }
    
    if (typingText) {
        typingText.textContent = '';
        typingText.classList.remove('typing-complete');
    }
    
    // Hide subtitle and description initially
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
    }
    
    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.transform = 'translateY(20px)';
    }
    
    // Show hero text container immediately when page loads
    if (heroTextContainer) {
        heroTextContainer.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        heroTextContainer.style.opacity = '1';
        heroTextContainer.style.transform = 'translateY(0)';
        
        // Start typing animation immediately after container appears
        setTimeout(() => {
            startTypingAnimation(typingText, textToType, () => {
                // Show subtitle after typing is complete
                if (heroSubtitle) {
                    setTimeout(() => {
                        heroSubtitle.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                        heroSubtitle.style.opacity = '1';
                        heroSubtitle.style.transform = 'translateY(0)';
                        
                        // Show description after subtitle
                        setTimeout(() => {
                            if (heroDescription) {
                                heroDescription.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                                heroDescription.style.opacity = '1';
                                heroDescription.style.transform = 'translateY(0)';
                                
                                // Show learn more button after description
                                setTimeout(() => {
                                    if (subtitleSection) {
                                        subtitleSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                                        subtitleSection.style.opacity = '1';
                                        subtitleSection.style.transform = 'translateY(0)';
                                        
                                        // Start terminal animation after all hero elements are shown
                                        setTimeout(() => {
                                            startTerminalAnimation();
                                        }, 800);
                                    }
                                }, 300);
                            }
                        }, 400);
                    }, 500);
                }
            });
        }, 100); // Very short delay for immediate typing start
    }
}

// Enhanced typing animation function
function startTypingAnimation(element, textToType, callback) {
    if (!element || !textToType) {
        if (callback) callback();
        return;
    }
    
    let currentIndex = 0;
    element.textContent = '';
    element.classList.remove('typing-complete', 'cursor-blink');
    element.classList.add('typing-text'); // Static cursor while typing
    
    function typeNextCharacter() {
        if (currentIndex < textToType.length) {
            element.textContent += textToType[currentIndex];
            currentIndex++;
            setTimeout(typeNextCharacter, 80); // Typing speed
        } else {
            // Start blinking cursor at the end
            element.classList.add('cursor-blink');
            
            // Complete typing animation after showing blinking cursor briefly
            setTimeout(() => {
                element.classList.remove('typing-text', 'cursor-blink');
                element.classList.add('typing-complete');
                if (callback) callback();
            }, 800); // Show blinking cursor for a moment
        }
    }
    
    typeNextCharacter();
}

// Navigation functionality
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    // Set active navigation item
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + current) {
            item.classList.add('active');
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe sections and cards
    const elements = document.querySelectorAll('section, .skill-item, .project-card, .education-item, .experience-item, .contact-item');
    elements.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const workWithMeBtn = document.querySelector('.work-with-me-btn button');
    
    // Toggle mobile menu
    if (window.innerWidth <= 768) {
        workWithMeBtn.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
        
        // Close menu when clicking on nav items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                sidebar.classList.remove('open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !workWithMeBtn.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }
}

// Update mobile menu on resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.querySelector('.sidebar').classList.remove('open');
    }
});

// Smooth hover effects
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.skill-item, .project-card, .education-item, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Set first nav item as active
    const firstNavItem = document.querySelector('.nav-item');
    if (firstNavItem) {
        firstNavItem.classList.add('active');
    }
    
    // Add fade-in animation to main content
    setTimeout(() => {
        document.querySelector('.main-content').classList.add('fade-in');
    }, 300);
});

// Console welcome message
console.log(`
🚀 AWS Data Engineer Portfolio
Clean, professional, and responsive design.
Built with modern web technologies.
`);

// Export functions for global use if needed
window.updateActiveNav = updateActiveNav;

// Function to refresh rain colors when theme changes
function refreshRainColors() {
    // Rain colors will automatically update on next draw cycle
    // since they check current theme in the draw() method
}

// Lightweight Rain Effect - Natural Blue-Green Colors
function initRainEffect() {
    const canvas = document.getElementById('rainCanvas');
    const ripplesContainer = document.getElementById('ripplesContainer');
    
    if (!canvas || !ripplesContainer) return;
    
    const ctx = canvas.getContext('2d');
    let raindrops = [];
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    // Simple, lightweight raindrop
    class Raindrop {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.speed = Math.random() * 2 + 2; // 2-4 speed (slower)
            this.length = Math.random() * 8 + 12; // 12-20 length
            this.opacity = Math.random() * 0.3 + 0.4; // 0.4-0.7 opacity (more subtle)
        }
        
        update() {
            this.y += this.speed;
            
            if (this.y > canvas.height + 20) {
                // Simple ripple creation
                if (Math.random() < 0.3) { // Only 30% create ripples
                    this.createRipple();
                }
                this.reset();
            }
        }
        
        createRipple() {
            const ripple = document.createElement('div');
            ripple.className = 'water-ripple';
            ripple.style.left = this.x + 'px';
            ripple.style.top = (canvas.height - 10) + 'px';
            
            ripplesContainer.appendChild(ripple);
            
            // Remove ripple quickly
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 1200);
        }
        
        draw() {
            // Get current theme colors for rain
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            const currentTheme = localStorage.getItem('colorTheme') || 'blue';
            
            let rainColor;
            
            if (isDark) {
                // Dark theme rain colors
                switch(currentTheme) {
                    case 'blue':
                        rainColor = `rgba(96, 165, 250, ${this.opacity})`; // Light blue
                        break;
                    case 'purple':
                        rainColor = `rgba(167, 139, 250, ${this.opacity})`; // Light purple
                        break;
                    case 'teal':
                        rainColor = `rgba(94, 234, 212, ${this.opacity})`; // Light teal
                        break;
                    default: // green
                        rainColor = `rgba(129, 230, 217, ${this.opacity})`; // Teal/cyan
                }
            } else {
                // Light theme rain colors
                switch(currentTheme) {
                    case 'blue':
                        rainColor = `rgba(37, 99, 235, ${this.opacity})`; // Blue
                        break;
                    case 'purple':
                        rainColor = `rgba(124, 58, 237, ${this.opacity})`; // Purple
                        break;
                    case 'teal':
                        rainColor = `rgba(20, 184, 166, ${this.opacity})`; // Teal
                        break;
                    default: // green
                        rainColor = `rgba(72, 187, 120, ${this.opacity})`; // Green
                }
            }
            
            ctx.strokeStyle = rainColor;
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            
            // Simple straight line - no complex curves
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.length);
            ctx.stroke();
        }
    }
    
    // Initialize fewer raindrops for better performance
    function initRaindrops() {
        const density = Math.floor(canvas.width / 30); // Much lower density
        raindrops = [];
        for (let i = 0; i < Math.min(density, 50); i++) { // Max 50 drops
            raindrops.push(new Raindrop());
        }
    }
    
    // Simple animation loop
    function animate() {
        // Simple clear instead of trailing effects
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw raindrops
        raindrops.forEach(drop => {
            drop.update();
            drop.draw();
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Throttled resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            initRaindrops();
        }, 100);
    });
    
    // Initialize
    resizeCanvas();
    initRaindrops();
    animate();
    
    // Cleanup
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
    
    // Pause when tab is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        } else {
            animate();
        }
    });
}

// Scroll to Top Functionality
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const mainContent = document.querySelector('.main-content');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBar = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const progress = skillBar.getAttribute('data-progress');
                
                // Animate the width
                setTimeout(() => {
                    skillBar.style.width = progress + '%';
                }, 200);
                
                // Unobserve after animation
                observer.unobserve(skillBar);
            }
        });
    };
    
    const skillObserver = new IntersectionObserver(animateSkillBar, {
        threshold: 0.5,
        rootMargin: '0px'
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Scroll-Triggered Animations
function initScrollReveal() {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    
    const revealElement = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const scrollObserver = new IntersectionObserver(revealElement, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// Active Navigation Highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    
    function highlightActiveSection() {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Update navigation
        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Initial call
    highlightActiveSection();
    
    // Update on scroll
    window.addEventListener('scroll', highlightActiveSection);
}

// 3D Terminal Animation
function initTerminalAnimation() {
    // This function now just prepares the terminal, actual start is called from hero animation
    return;
}

// Start terminal animation (called after hero sequence completes)
function startTerminalAnimation() {
    const terminalContainer = document.querySelector('.terminal-container');
    const commandElement = document.getElementById('typingCommand');
    const outputElement = document.getElementById('terminalOutput');
    const cursorElement = document.getElementById('terminalCursor');
    
    if (!commandElement || !outputElement) return;
    
    // Show terminal container with fade-in effect
    if (terminalContainer) {
        terminalContainer.style.opacity = '1';
    }
    
    // Sample Python/AWS Data Engineering commands and outputs
    const commands = [
        {
            command: "python data_pipeline.py --source s3://data-lake/raw/ --target redshift",
            output: [
                { text: "🚀 Starting ETL pipeline...", type: "info" },
                { text: "✅ Connected to S3 bucket: data-lake/raw/", type: "success" },
                { text: "📊 Processing 150,000 records...", type: "info" },
                { text: "✅ Data transformed and loaded to Redshift", type: "success" },
                { text: "⏱️  Pipeline completed in 45.2 seconds", type: "info" }
            ]
        },
        {
            command: "aws s3 sync ./processed-data/ s3://analytics-bucket/",
            output: [
                { text: "upload: processed-data/sales_2024.parquet to s3://analytics-bucket/sales_2024.parquet", type: "info" },
                { text: "upload: processed-data/users_clean.json to s3://analytics-bucket/users_clean.json", type: "info" },
                { text: "✅ Sync completed: 2.4 GB transferred", type: "success" }
            ]
        },
        {
            command: "spark-submit --master yarn stream_processor.py",
            output: [
                { text: "🔥 Starting Spark streaming job...", type: "info" },
                { text: "✅ Connected to Kafka cluster", type: "success" },
                { text: "📈 Processing real-time events at 10k/sec", type: "info" },
                { text: "💾 Writing to Delta Lake: s3://streaming-data/", type: "success" }
            ]
        },
        {
            command: "docker run -d data-eng/airflow-pipeline:latest",
            output: [
                { text: "Unable to find image 'data-eng/airflow-pipeline:latest' locally", type: "info" },
                { text: "latest: Pulling from data-eng/airflow-pipeline", type: "info" },
                { text: "✅ Container started: airflow-scheduler-prod", type: "success" },
                { text: "🎯 DAGs loaded: 12 active workflows", type: "info" }
            ]
        },
        {
            command: "python -c \"import pandas as pd; df = pd.read_sql('SELECT COUNT(*) FROM user_events', conn); print(f'Total events: {df.iloc[0,0]:,}')\"",
            output: [
                { text: "Total events: 47,392,851", type: "success" }
            ]
        }
    ];
    
    let currentCommandIndex = 0;
    let isTyping = false;
    
    function typeCommand(command) {
        return new Promise((resolve) => {
            if (isTyping) return resolve();
            isTyping = true;
            
            commandElement.textContent = '';
            cursorElement.style.display = 'inline';
            
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < command.length) {
                    commandElement.textContent += command[i];
                    i++;
                } else {
                    clearInterval(typingInterval);
                    cursorElement.style.display = 'none';
                    isTyping = false;
                    resolve();
                }
            }, 80); // Realistic typing speed
        });
    }
    
    function displayOutput(outputs) {
        return new Promise((resolve) => {
            outputElement.innerHTML = '';
            
            let outputIndex = 0;
            const outputInterval = setInterval(() => {
                if (outputIndex < outputs.length) {
                    const output = outputs[outputIndex];
                    const outputLine = document.createElement('div');
                    outputLine.className = `terminal-output-line ${output.type}`;
                    outputLine.textContent = output.text;
                    outputElement.appendChild(outputLine);
                    outputIndex++;
                } else {
                    clearInterval(outputInterval);
                    setTimeout(resolve, 2000); // Show output for 2 seconds
                }
            }, 800); // Delay between output lines
        });
    }
    
    function clearTerminal() {
        return new Promise((resolve) => {
            setTimeout(() => {
                commandElement.textContent = '';
                outputElement.innerHTML = '';
                cursorElement.style.display = 'inline';
                resolve();
            }, 1000);
        });
    }
    
    async function runTerminalSequence() {
        const currentCommand = commands[currentCommandIndex];
        
        // Type the command
        await typeCommand(currentCommand.command);
        
        // Small delay before showing output
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Display output
        await displayOutput(currentCommand.output);
        
        // Clear terminal and move to next command
        await clearTerminal();
        
        // Move to next command (loop back to start)
        currentCommandIndex = (currentCommandIndex + 1) % commands.length;
        
        // Continue the sequence
        setTimeout(runTerminalSequence, 1000);
    }
    
    // Add terminal output styles
    const terminalStyles = `
        .terminal-output-line {
            margin: 2px 0;
            font-family: 'SF Mono', 'Monaco', monospace;
            font-size: 12px;
        }
        .terminal-output-line.success { color: #7ee787; }
        .terminal-output-line.error { color: #ffa657; }
        .terminal-output-line.info { color: #79c0ff; }
        .terminal-output-line.comment { color: #8b949e; font-style: italic; }
    `;
    
    // Add styles to head if not already present
    if (!document.querySelector('#terminal-output-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'terminal-output-styles';
        styleSheet.textContent = terminalStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Start the terminal animation after a short delay
    setTimeout(() => {
        runTerminalSequence();
    }, 500);
}
