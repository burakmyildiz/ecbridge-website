// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <a href="#home">Home</a>
        <a href="#overview">Overview</a>
        <a href="#architecture">Architecture</a>
        <a href="#features">Features</a>
        <a href="#security">Security</a>
        <a href="#team">Team</a>
    `;
    document.querySelector('.navbar').appendChild(mobileMenu);

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for grid items
                if (entry.target.parentElement.classList.contains('features-grid') ||
                    entry.target.parentElement.classList.contains('team-grid')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll('.feature-card, .team-member, .detail-card, .info-card, .security-layer, .stat-card, .problem-card, .solution-card, .timeline-item, .info-box, .metric');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Architecture diagram interaction
    const archLayers = document.querySelectorAll('.arch-layer');
    archLayers.forEach((layer, index) => {
        layer.style.opacity = '0';
        layer.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            layer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            layer.style.opacity = '1';
            layer.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Demo interface interaction
    const bridgeButton = document.querySelector('.bridge-button');
    const statusSteps = document.querySelectorAll('.status-step');
    let currentStep = 2;

    if (bridgeButton) {
        bridgeButton.addEventListener('click', () => {
            // Reset steps
            statusSteps.forEach(step => step.classList.remove('active'));
            currentStep = 0;
            
            // Animate steps
            const animateSteps = setInterval(() => {
                if (currentStep < statusSteps.length) {
                    statusSteps[currentStep].classList.add('active');
                    currentStep++;
                } else {
                    clearInterval(animateSteps);
                    setTimeout(() => {
                        statusSteps.forEach((step, index) => {
                            if (index > 1) step.classList.remove('active');
                        });
                        currentStep = 2;
                    }, 2000);
                }
            }, 800);
        });
    }

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.animated) {
                entry.target.animated = true;
                animateValue(entry.target);
            }
        });
    });

    stats.forEach(stat => statsObserver.observe(stat));

    function animateValue(element) {
        const text = element.textContent;
        if (text === 'Zero') return;
        
        const match = text.match(/(\d+)/);
        if (!match) return;
        
        const target = parseInt(match[1]);
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = text.replace(/\d+/, Math.floor(current));
        }, 16);
    }

    // Floating particles effect
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(98, 126, 234, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = '100vh';
        
        document.querySelector('.hero-background').appendChild(particle);
        
        const duration = Math.random() * 3000 + 2000;
        const horizontalMovement = (Math.random() - 0.5) * 100;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(0)', opacity: 0 },
            { transform: `translate(${horizontalMovement}px, -50vh) scale(1)`, opacity: 1, offset: 0.5 },
            { transform: `translate(${horizontalMovement * 2}px, -100vh) scale(0)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }

    // Create particles periodically
    if (window.innerWidth > 768) {
        setInterval(createParticle, 500);
    }

    // Form input effects
    const amountInput = document.querySelector('.amount-input');
    if (amountInput) {
        amountInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        amountInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    }

    // Chain select hover effect
    const chainSelects = document.querySelectorAll('.chain-select');
    chainSelects.forEach(select => {
        select.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'rotate(360deg)';
        });
        
        select.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'rotate(0deg)';
        });
    });

    // Add transition to chain images
    document.querySelectorAll('.chain-select img').forEach(img => {
        img.style.transition = 'transform 0.6s ease';
    });

    // Features Universe Interactions
    const featuresUniverse = document.getElementById('features-universe');
    const featureControlBtns = document.querySelectorAll('.feature-control-btn');
    const archControlBtns = document.querySelectorAll('.arch-controls .control-btn');
    const featureOrbs = document.querySelectorAll('.feature-orb');
    const techElements = document.querySelectorAll('.tech-element');

    // Feature control buttons (Features section)
    featureControlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            featureControlBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.getAttribute('data-view');
            switchFeatureView(view);
        });
    });

    // Architecture control buttons - with debugging and fallback
    setTimeout(() => {
        const archButtons = document.querySelectorAll('.arch-controls .control-btn');
        console.log('Architecture buttons found:', archButtons.length);
        
        if (archButtons.length === 0) {
            console.error('No architecture buttons found! DOM might not be ready.');
            return;
        }
        
        archButtons.forEach((button, index) => {
            console.log(`Button ${index}:`, button.textContent.trim(), button.getAttribute('data-view'));
            
            // Button styles handled by CSS
            
            // Multiple event attachment methods for reliability
            button.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Architecture button clicked (onclick):', this.getAttribute('data-view'));
                handleArchButtonClick(this, archButtons);
            };
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Architecture button clicked (addEventListener):', this.getAttribute('data-view'));
                handleArchButtonClick(this, archButtons);
            });
            
            // Also add mousedown as backup
            button.addEventListener('mousedown', function(e) {
                console.log('Architecture button mousedown:', this.getAttribute('data-view'));
            });
        });
    }, 500); // Wait for DOM to be fully ready

    function handleArchButtonClick(clickedButton, allButtons) {
        // Remove active class from all buttons
        allButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        clickedButton.classList.add('active');
        
        // Get the view type
        const viewType = clickedButton.getAttribute('data-view');
        console.log('Switching to view:', viewType);
        switchArchitectureView(viewType);
    }

    function switchFeatureView(view) {
        // Reset all elements to default state
        featureOrbs.forEach(orb => {
            orb.style.opacity = '1';
            orb.style.transform = orb.style.transform.replace(/scale\([^)]*\)/g, '');
        });
        
        techElements.forEach(el => {
            el.style.opacity = '0.7';
            el.style.transform = el.style.transform.replace(/scale\([^)]*\)/g, '');
        });

        // Remove any existing connection lines
        removeConnectionLines();

        switch(view) {
            case 'security':
                featureOrbs.forEach(orb => {
                    if (!orb.classList.contains('security-orb')) {
                        orb.style.opacity = '0.3';
                    } else {
                        orb.style.transform = orb.style.transform + ' scale(1.1)';
                    }
                });
                highlightTechElements(['zk-snark', 'smart-contracts']);
                break;
            case 'performance':
                featureOrbs.forEach(orb => {
                    if (!orb.classList.contains('performance-orb')) {
                        orb.style.opacity = '0.3';
                    } else {
                        orb.style.transform = orb.style.transform + ' scale(1.1)';
                    }
                });
                highlightTechElements(['consensus', 'merkle-proofs']);
                break;
            case 'innovation':
                featureOrbs.forEach(orb => {
                    if (!orb.classList.contains('innovation-orb')) {
                        orb.style.opacity = '0.3';
                    } else {
                        orb.style.transform = orb.style.transform + ' scale(1.1)';
                    }
                });
                highlightTechElements(['sp1-helios', 'websocket']);
                break;
            case 'flow':
                // Data Flow view - highlight connections and movement
                createDataFlowVisualization();
                highlightTechElements(['relayer', 'merkle-proofs', 'sp1-helios']);
                break;
            default:
                // Overview - show all
                break;
        }
    }


    function highlightTechElements(techs) {
        techElements.forEach(el => {
            const tech = el.getAttribute('data-tech');
            if (techs.includes(tech)) {
                el.style.opacity = '1';
                el.style.transform = el.style.transform + ' scale(1.1)';
            } else {
                el.style.opacity = '0.3';
            }
        });
    }

    function createDataFlowVisualization() {
        const connectionNetwork = document.getElementById('connection-network');
        if (!connectionNetwork) return;

        // Create animated data flow lines between key components
        const flowPaths = [
            { from: '.ethereum-3d', to: '.innovation-core' },
            { from: '.innovation-core', to: '.citrea-3d' },
            { from: '.security-orb', to: '.innovation-core' },
            { from: '.performance-orb', to: '.innovation-core' }
        ];

        flowPaths.forEach((path, index) => {
            setTimeout(() => {
                const fromEl = document.querySelector(path.from);
                const toEl = document.querySelector(path.to);
                if (fromEl && toEl) {
                    createAnimatedFlowLine(fromEl, toEl, index);
                }
            }, index * 200);
        });
    }

    function createAnimatedFlowLine(fromEl, toEl, index) {
        const connectionNetwork = document.getElementById('connection-network');
        const universeRect = featuresUniverse.getBoundingClientRect();
        
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();
        
        const fromCenter = {
            x: fromRect.left + fromRect.width / 2 - universeRect.left,
            y: fromRect.top + fromRect.height / 2 - universeRect.top
        };
        
        const toCenter = {
            x: toRect.left + toRect.width / 2 - universeRect.left,
            y: toRect.top + toRect.height / 2 - universeRect.top
        };
        
        const line = document.createElement('div');
        line.className = 'flow-line-animated';
        line.style.position = 'absolute';
        line.style.height = '2px';
        line.style.background = `linear-gradient(90deg, 
            rgba(98, 126, 234, 0.8), 
            rgba(255, 107, 53, 0.8), 
            rgba(98, 126, 234, 0.8))`;
        line.style.transformOrigin = 'left center';
        line.style.pointerEvents = 'none';
        line.style.zIndex = '5';
        
        const dx = toCenter.x - fromCenter.x;
        const dy = toCenter.y - fromCenter.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        line.style.left = fromCenter.x + 'px';
        line.style.top = fromCenter.y + 'px';
        line.style.width = distance + 'px';
        line.style.transform = `rotate(${angle}deg) scaleX(0)`;
        
        connectionNetwork.appendChild(line);
        
        // Animate line growth and pulsing
        line.animate([
            { transform: `rotate(${angle}deg) scaleX(0)`, opacity: 0 },
            { transform: `rotate(${angle}deg) scaleX(1)`, opacity: 1 }
        ], {
            duration: 600,
            fill: 'forwards'
        });
        
        // Add pulsing effect
        setTimeout(() => {
            line.style.animation = 'flowPulse 2s ease-in-out infinite';
        }, 600);
    }

    // Universe particles animation
    function createUniverseParticle() {
        const particles = document.getElementById('universe-particles');
        if (!particles) return;

        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '3px';
        particle.style.height = '3px';
        particle.style.background = 'rgba(98, 126, 234, 0.8)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particles.appendChild(particle);
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(0)', 
                opacity: 0 
            },
            { 
                transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(1)`, 
                opacity: 1,
                offset: 0.5 
            },
            { 
                transform: `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) scale(0)`, 
                opacity: 0 
            }
        ], {
            duration: 4000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).onfinish = () => particle.remove();
    }

    // Create particles periodically
    if (featuresUniverse) {
        setInterval(createUniverseParticle, 800);
    }

    // Performance metrics animations
    const metricCards = document.querySelectorAll('.metric-card-3d');
    const progressBars = document.querySelectorAll('.progress-bar');
    const gaugeNeedles = document.querySelectorAll('.gauge-needle');

    // Animate progress bars when visible
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.animated) {
                entry.target.animated = true;
                animateMetricCard(entry.target);
            }
        });
    });

    metricCards.forEach(card => {
        metricsObserver.observe(card);
    });

    function animateMetricCard(card) {
        const metric = card.getAttribute('data-metric');
        
        // Animate progress bars
        const progressBar = card.querySelector('.progress-bar');
        if (progressBar) {
            const progress = card.querySelector('.circular-progress').getAttribute('data-progress');
            const circumference = 2 * Math.PI * 54;
            const offset = circumference - (progress / 100) * circumference;
            
            setTimeout(() => {
                progressBar.style.strokeDashoffset = offset;
            }, 500);
        }
        
        // Animate gauge needle
        const gaugeNeedle = card.querySelector('.gauge-needle');
        if (gaugeNeedle) {
            const speed = gaugeNeedle.getAttribute('data-speed');
            const rotation = -45 + (speed / 100) * 180; // -45 to 135 degrees
            
            setTimeout(() => {
                gaugeNeedle.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`;
            }, 800);
        }
        
        // Animate chart bars
        const chartBars = card.querySelectorAll('.chart-bar');
        chartBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.animationPlayState = 'running';
            }, 1000 + index * 100);
        });
    }

    // Feature orb interactions
    featureOrbs.forEach(orb => {
        orb.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform + ' scale(1.1)';
            
            // Create connection lines to tech elements
            createConnectionLines(this);
        });
        
        orb.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.1)', '');
            
            // Remove connection lines
            removeConnectionLines();
        });
    });

    function createConnectionLines(orb) {
        const connectionNetwork = document.getElementById('connection-network');
        if (!connectionNetwork) return;
        
        const orbRect = orb.getBoundingClientRect();
        const universeRect = featuresUniverse.getBoundingClientRect();
        
        const orbCenter = {
            x: orbRect.left + orbRect.width / 2 - universeRect.left,
            y: orbRect.top + orbRect.height / 2 - universeRect.top
        };
        
        techElements.forEach(tech => {
            const techRect = tech.getBoundingClientRect();
            const techCenter = {
                x: techRect.left + techRect.width / 2 - universeRect.left,
                y: techRect.top + techRect.height / 2 - universeRect.top
            };
            
            const line = document.createElement('div');
            line.className = 'connection-line-dynamic';
            line.style.position = 'absolute';
            line.style.height = '1px';
            line.style.background = 'linear-gradient(90deg, rgba(98, 126, 234, 0.8), rgba(255, 107, 53, 0.8))';
            line.style.transformOrigin = 'left center';
            line.style.pointerEvents = 'none';
            
            const dx = techCenter.x - orbCenter.x;
            const dy = techCenter.y - orbCenter.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            line.style.left = orbCenter.x + 'px';
            line.style.top = orbCenter.y + 'px';
            line.style.width = distance + 'px';
            line.style.transform = `rotate(${angle}deg)`;
            line.style.opacity = '0';
            
            connectionNetwork.appendChild(line);
            
            // Animate line appearance
            line.animate([
                { opacity: 0, transform: `rotate(${angle}deg) scaleX(0)` },
                { opacity: 0.8, transform: `rotate(${angle}deg) scaleX(1)` }
            ], {
                duration: 300,
                fill: 'forwards'
            });
        });
    }

    function removeConnectionLines() {
        const dynamicLines = document.querySelectorAll('.connection-line-dynamic, .flow-line-animated');
        dynamicLines.forEach(line => {
            line.animate([
                { opacity: line.style.opacity || 0.8 },
                { opacity: 0 }
            ], {
                duration: 200,
                fill: 'forwards'
            }).onfinish = () => line.remove();
        });
    }

    // Tech element interactions
    techElements.forEach(tech => {
        tech.addEventListener('click', function() {
            const techType = this.getAttribute('data-tech');
            showTechInfo(techType, this);
        });
    });

    function showTechInfo(techType, element) {
        const techInfo = {
            'zk-snark': {
                title: 'Zero-Knowledge Succinct Non-Interactive Argument of Knowledge',
                description: 'Cryptographic proof system enabling verification without revealing underlying data'
            },
            'sp1-helios': {
                title: 'SP1-Helios Light Client',
                description: 'Zero-knowledge light client for Ethereum consensus verification on Citrea'
            },
            'smart-contracts': {
                title: 'Smart Contracts',
                description: 'Self-executing contracts with terms directly written into code'
            },
            'websocket': {
                title: 'WebSocket Real-time Communication',
                description: 'Live bidirectional communication for instant transaction updates'
            },
            'merkle-proofs': {
                title: 'Merkle Patricia Trie Proofs',
                description: 'Cryptographic proofs demonstrating inclusion in blockchain state'
            },
            'consensus': {
                title: 'Proof-of-Stake Consensus',
                description: 'Ethereum\'s energy-efficient consensus mechanism for network security'
            }
        };
        
        const info = techInfo[techType];
        if (!info) return;
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tech-tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.background = 'var(--card-bg)';
        tooltip.style.border = '1px solid var(--border-color)';
        tooltip.style.borderRadius = '12px';
        tooltip.style.padding = '1rem';
        tooltip.style.maxWidth = '250px';
        tooltip.style.zIndex = '1000';
        tooltip.style.backdropFilter = 'blur(10px)';
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'scale(0.8)';
        tooltip.style.transition = 'all 0.3s ease';
        
        tooltip.innerHTML = `
            <h4 style="margin: 0 0 0.5rem 0; color: var(--primary-color);">${info.title}</h4>
            <p style="margin: 0; font-size: 0.875rem; color: var(--text-secondary);">${info.description}</p>
        `;
        
        const rect = element.getBoundingClientRect();
        const universeRect = featuresUniverse.getBoundingClientRect();
        
        tooltip.style.left = (rect.left - universeRect.left + rect.width / 2) + 'px';
        tooltip.style.top = (rect.bottom - universeRect.top + 10) + 'px';
        tooltip.style.transform = 'translateX(-50%) scale(0.8)';
        
        featuresUniverse.appendChild(tooltip);
        
        // Animate tooltip
        setTimeout(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateX(-50%) scale(1)';
        }, 10);
        
        // Remove tooltip after delay
        setTimeout(() => {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateX(-50%) scale(0.8)';
            setTimeout(() => tooltip.remove(), 300);
        }, 3000);
    }

    // Copy to clipboard functionality for code blocks
    document.querySelectorAll('pre').forEach(pre => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.style.position = 'absolute';
        button.style.top = '10px';
        button.style.right = '10px';
        button.style.padding = '5px 10px';
        button.style.background = 'rgba(255, 255, 255, 0.1)';
        button.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';
        button.style.transition = 'all 0.3s ease';
        
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        button.addEventListener('click', () => {
            const text = pre.textContent.replace(button.textContent, '');
            navigator.clipboard.writeText(text).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.background = 'rgba(34, 197, 94, 0.2)';
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                    button.style.background = 'rgba(255, 255, 255, 0.1)';
                }, 2000);
            });
        });
    });

    // Enhanced scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }

    // Parallax effect for gradient orbs
    const orbs = document.querySelectorAll('.gradient-orb');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        orbs.forEach((orb, index) => {
            const speed = index === 0 ? 0.5 : 0.3;
            orb.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed}px)`;
        });
    });

    // Loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.querySelector('.timeline-marker').style.transform = 'translateX(-50%) scale(1.2)';
                    setTimeout(() => {
                        entry.target.querySelector('.timeline-marker').style.transform = 'translateX(-50%) scale(1)';
                    }, 300);
                }, index * 200);
            }
        });
    });

    timelineItems.forEach(item => {
        const marker = item.querySelector('.timeline-marker');
        marker.style.transition = 'transform 0.3s ease';
        timelineObserver.observe(item);
    });

    // Metric counters animation
    const metricValues = document.querySelectorAll('.metric-value');
    metricValues.forEach(metric => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.animated) {
                    entry.target.animated = true;
                    if (entry.target.textContent.includes('%')) {
                        animatePercentage(entry.target);
                    } else if (entry.target.textContent.includes('min')) {
                        animateTime(entry.target);
                    }
                }
            });
        });
        observer.observe(metric);
    });

    function animatePercentage(element) {
        const target = parseInt(element.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '%';
        }, 30);
    }

    function animateTime(element) {
        const text = element.textContent;
        element.textContent = '~0min';
        setTimeout(() => {
            element.textContent = text;
        }, 1000);
    }

    // Bridge connection animation enhancement
    const bridgeConnection = document.querySelector('.bridge-connection');
    if (bridgeConnection) {
        setInterval(() => {
            const pulse = document.createElement('div');
            pulse.style.position = 'absolute';
            pulse.style.width = '20px';
            pulse.style.height = '20px';
            pulse.style.borderRadius = '50%';
            pulse.style.background = 'rgba(98, 126, 234, 0.6)';
            pulse.style.left = '50%';
            pulse.style.top = '50%';
            pulse.style.transform = 'translate(-50%, -50%)';
            bridgeConnection.appendChild(pulse);

            pulse.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
                { transform: 'translate(-50%, -50%) scale(3)', opacity: 0 }
            ], {
                duration: 1500,
                easing: 'ease-out'
            }).onfinish = () => pulse.remove();
        }, 2000);
    }

    // Innovation items hover effect
    const innovationItems = document.querySelectorAll('.innovation-item');
    innovationItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            const number = item.querySelector('.innovation-number');
            number.style.opacity = '1';
            number.style.transform = 'scale(1.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            const number = item.querySelector('.innovation-number');
            number.style.opacity = '0.3';
            number.style.transform = 'scale(1)';
        });
        
        // Add transition
        const number = item.querySelector('.innovation-number');
        number.style.transition = 'all 0.3s ease';
    });

    // Issue and solution items animation
    const issueItems = document.querySelectorAll('.issue-item, .solution-item');
    issueItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                }
            });
        });
        
        itemObserver.observe(item);
    });

    // Architecture component interaction
    const componentCards = document.querySelectorAll('.component-card');
    const archDetailsPanel = document.getElementById('arch-details');
    
    const componentDetails = {
        'bridge-eth': {
            title: 'BridgeEth Smart Contract',
            content: `
                <h4>Technical Details</h4>
                <ul>
                    <li><strong>Language:</strong> Solidity 0.8.19</li>
                    <li><strong>Functions:</strong> depositETH(), depositERC20()</li>
                    <li><strong>Security:</strong> ReentrancyGuard, Pausable</li>
                    <li><strong>Events:</strong> DepositETH, DepositERC20</li>
                </ul>
                <p>The contract implements a secure deposit mechanism with unique nonce generation for each transaction, ensuring idempotency and preventing replay attacks.</p>
            `
        },
        'token-mgmt': {
            title: 'Token Management System',
            content: `
                <h4>Supported Tokens</h4>
                <ul>
                    <li>Native ETH transfers</li>
                    <li>ERC20 token deposits</li>
                    <li>Automatic approval handling</li>
                    <li>Token whitelist capability</li>
                </ul>
                <p>The system supports any ERC20 token with standard interfaces, allowing seamless integration of new tokens without contract upgrades.</p>
            `
        },
        'relayer': {
            title: 'Relayer Service Architecture',
            content: `
                <h4>Core Functionality</h4>
                <ul>
                    <li><strong>Event Monitoring:</strong> Real-time blockchain event tracking</li>
                    <li><strong>Proof Generation:</strong> Merkle Patricia Trie proof creation</li>
                    <li><strong>Retry Logic:</strong> Exponential backoff for failed transactions</li>
                    <li><strong>Performance:</strong> Handles 1000+ TPS</li>
                </ul>
                <p>Built with Node.js and TypeScript, the relayer ensures reliable cross-chain message passing with comprehensive error handling.</p>
            `
        },
        'sp1-helios': {
            title: 'SP1-Helios Light Client',
            content: `
                <h4>Zero-Knowledge Architecture</h4>
                <ul>
                    <li><strong>Proof System:</strong> SNARK-based verification</li>
                    <li><strong>State Roots:</strong> Ethereum consensus state tracking</li>
                    <li><strong>Efficiency:</strong> 90% reduction in verification costs</li>
                    <li><strong>Security:</strong> Cryptographically proven correctness</li>
                </ul>
                <p>SP1-Helios maintains a light client on Citrea that can verify Ethereum's state without processing every transaction, enabling trustless bridging.</p>
            `
        },
        'state-mgmt': {
            title: 'State Management System',
            content: `
                <h4>Database Architecture</h4>
                <ul>
                    <li><strong>Storage:</strong> MongoDB with indexing</li>
                    <li><strong>Caching:</strong> Redis for performance</li>
                    <li><strong>Recovery:</strong> Automatic transaction replay</li>
                    <li><strong>Analytics:</strong> Real-time metrics dashboard</li>
                </ul>
                <p>Comprehensive state tracking ensures no transaction is lost and provides full auditability of all bridge operations.</p>
            `
        },
        'bridge-citrea': {
            title: 'BridgeCitrea Contract',
            content: `
                <h4>Verification & Minting</h4>
                <ul>
                    <li><strong>Proof Verification:</strong> On-chain SNARK verification</li>
                    <li><strong>Token Minting:</strong> Wrapped token creation</li>
                    <li><strong>Security:</strong> Double-spend prevention</li>
                    <li><strong>Registry:</strong> Token mapping management</li>
                </ul>
                <p>The contract verifies proofs against the light client state and mints corresponding wrapped tokens on successful verification.</p>
            `
        },
        'token-registry': {
            title: 'Token Registry System',
            content: `
                <h4>Registry Features</h4>
                <ul>
                    <li><strong>Mapping:</strong> ETH address to Citrea token</li>
                    <li><strong>Governance:</strong> Admin-controlled updates</li>
                    <li><strong>Standards:</strong> ERC20 compliance</li>
                    <li><strong>Extensibility:</strong> Easy token additions</li>
                </ul>
                <p>The registry maintains relationships between Ethereum tokens and their Citrea equivalents, enabling seamless cross-chain transfers.</p>
            `
        }
    };
    
    componentCards.forEach(card => {
        card.addEventListener('click', function() {
            const component = this.getAttribute('data-component');
            const details = componentDetails[component];
            
            if (details && archDetailsPanel) {
                const detailsContent = archDetailsPanel.querySelector('.details-content');
                detailsContent.innerHTML = `
                    <h4 style="color: var(--primary-color); margin-bottom: 1rem;">${details.title}</h4>
                    ${details.content}
                `;
                
                // Highlight selected component
                componentCards.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                
                // Animate panel
                archDetailsPanel.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    archDetailsPanel.style.transform = 'scale(1)';
                }, 100);
            }
        });
    });

    // Add selected component styling
    const style = document.createElement('style');
    style.textContent = `
        .component-card.selected {
            border-color: var(--primary-color) !important;
            background: rgba(98, 126, 234, 0.1) !important;
        }
    `;
    document.head.appendChild(style);

    // Architecture layer animations
    const archLayersEnhanced = document.querySelectorAll('.arch-layer-enhanced');
    archLayersEnhanced.forEach((layer, index) => {
        layer.style.opacity = '0';
        layer.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            layer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            layer.style.opacity = '1';
            layer.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Feature stats counter animation
    const featureStats = document.querySelectorAll('.features-stats .stat-value');
    featureStats.forEach(stat => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.animated) {
                    entry.target.animated = true;
                    const text = entry.target.textContent;
                    if (text === '0') {
                        // Animate from 10 to 0
                        let current = 10;
                        const timer = setInterval(() => {
                            current--;
                            if (current <= 0) {
                                current = 0;
                                clearInterval(timer);
                            }
                            entry.target.textContent = current;
                        }, 100);
                    } else if (text.includes('%')) {
                        // Animate percentage
                        const target = parseInt(text);
                        let current = 0;
                        const increment = target / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            entry.target.textContent = Math.floor(current) + '%';
                        }, 30);
                    }
                }
            });
        });
        observer.observe(stat);
    });

    // Feature category animations
    const featureCategories = document.querySelectorAll('.feature-category');
    featureCategories.forEach((category, index) => {
        const items = category.querySelectorAll('.feature-item-enhanced');
        items.forEach((item, itemIndex) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, (index * 200) + (itemIndex * 100));
                    }
                });
            });
            observer.observe(item);
        });
    });

    // Comparison table row highlighting
    const comparisonRows = document.querySelectorAll('.comparison-row');
    comparisonRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(98, 126, 234, 0.05)';
        });
        row.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });

    // Technical specification cards interaction
    const specCards = document.querySelectorAll('.spec-card');
    specCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        });
        observer.observe(card);
    });
});

// Architecture View Functions (moved outside DOMContentLoaded for global access)
function switchArchitectureView(view) {
    console.log('switchArchitectureView called with view:', view);
    
    // Get architecture universe (bridge-universe)
    const bridgeUniverse = document.getElementById('bridge-universe');
    if (!bridgeUniverse) {
        console.error('bridge-universe not found');
        return;
    }

    const chainNodes = bridgeUniverse.querySelectorAll('.chain-node');
    const techSatellites = bridgeUniverse.querySelectorAll('.tech-satellite');
    const componentModal = document.getElementById('component-modal');
    
    console.log('Found elements:', {
        chainNodes: chainNodes.length,
        techSatellites: techSatellites.length,
        componentModal: !!componentModal
    });
    
    // Get or create connection network
    let connectionNetwork = bridgeUniverse.querySelector('.arch-connection-network');
    if (!connectionNetwork) {
        connectionNetwork = document.createElement('div');
        connectionNetwork.className = 'arch-connection-network';
        connectionNetwork.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 5;
        `;
        bridgeUniverse.appendChild(connectionNetwork);
        console.log('Created connection network');
    }

    // Clear existing connections
    connectionNetwork.innerHTML = '';

    // Reset all elements first
    resetArchitectureView(chainNodes, techSatellites);

    // Reset view transition
    bridgeUniverse.style.transition = 'all 0.3s ease';

    switch(view) {
        case 'flow':
            console.log('Activating FLOW view');
            showDataFlowView(chainNodes, techSatellites, connectionNetwork);
            break;
        case 'security':
            console.log('Activating SECURITY view');
            showSecurityView(chainNodes, techSatellites);
            break;
        case 'overview':
        default:
            console.log('Activating OVERVIEW view');
            // Show default overview state
            break;
    }
}

function showDataFlowView(chainNodes, techSatellites, connectionNetwork) {
    console.log('showDataFlowView called');
    
    // Highlight the data flow path
    const ethNode = document.querySelector('.ethereum-3d');
    const citreaNode = document.querySelector('.citrea-3d');
    const bridgeCore = document.querySelector('.bridge-core');
    const relayerSatellite = document.querySelector('[data-tech="relayer"]');
    const sp1Satellite = document.querySelector('[data-tech="sp1-helios"]');
    
    console.log('Flow elements found:', {
        ethNode: !!ethNode,
        citreaNode: !!citreaNode,
        bridgeCore: !!bridgeCore,
        relayerSatellite: !!relayerSatellite,
        sp1Satellite: !!sp1Satellite
    });
    
    // Create animated flow lines
    if (ethNode && bridgeCore && citreaNode && connectionNetwork) {
        console.log('Creating flow lines...');
        createFlowLine(ethNode, bridgeCore, connectionNetwork, 0);
        createFlowLine(bridgeCore, citreaNode, connectionNetwork, 400);
        
        // Highlight the flow components
        [ethNode, citreaNode, bridgeCore].forEach(node => {
            if (node) {
                node.style.boxShadow = '0 0 25px rgba(98, 126, 234, 0.8)';
                node.style.borderColor = '#627eea';
                node.style.transition = 'all 0.3s ease';
            }
        });
    } else {
        console.error('Missing elements for flow creation');
    }
    
    // Highlight relevant satellites
    [relayerSatellite, sp1Satellite].forEach(satellite => {
        if (satellite) {
            satellite.style.transform = 'scale(1.2)';
            satellite.style.boxShadow = '0 0 20px rgba(98, 126, 234, 0.6)';
            satellite.style.transition = 'all 0.3s ease';
        }
    });
}

function showSecurityView(chainNodes, techSatellites) {
    console.log('showSecurityView called');
    
    // Highlight security components
    const sp1Satellite = document.querySelector('[data-tech="sp1-helios"]');
    const bridgeCore = document.querySelector('.bridge-core');
    
    console.log('Security elements found:', {
        sp1Satellite: !!sp1Satellite,
        bridgeCore: !!bridgeCore,
        techSatellites: techSatellites.length
    });
    
    // Highlight SP1-Helios as the main security component
    if (sp1Satellite) {
        sp1Satellite.style.transform = 'scale(1.4)';
        sp1Satellite.style.boxShadow = '0 0 30px rgba(34, 197, 94, 0.8)';
        sp1Satellite.style.borderColor = '#22c55e';
        sp1Satellite.style.transition = 'all 0.3s ease';
        console.log('SP1 satellite highlighted');
    }
    
    // Highlight bridge core with security emphasis
    if (bridgeCore) {
        bridgeCore.style.boxShadow = '0 0 40px rgba(255, 215, 0, 0.6)';
        bridgeCore.style.borderColor = '#ffd700';
        bridgeCore.style.transition = 'all 0.3s ease';
        console.log('Bridge core highlighted');
    }
    
    // Dim other satellites to focus on security
    techSatellites.forEach(satellite => {
        if (satellite !== sp1Satellite) {
            satellite.style.opacity = '0.4';
            satellite.style.transition = 'all 0.3s ease';
        }
    });
    console.log('Other satellites dimmed');
}

function createFlowLine(fromEl, toEl, container, delay = 0) {
    setTimeout(() => {
        const universeRect = document.getElementById('bridge-universe').getBoundingClientRect();
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();
        
        const fromCenter = {
            x: fromRect.left + fromRect.width / 2 - universeRect.left,
            y: fromRect.top + fromRect.height / 2 - universeRect.top
        };
        
        const toCenter = {
            x: toRect.left + toRect.width / 2 - universeRect.left,
            y: toRect.top + toRect.height / 2 - universeRect.top
        };
        
        const line = document.createElement('div');
        line.className = 'arch-flow-line';
        line.style.cssText = `
            position: absolute;
            height: 3px;
            background: linear-gradient(90deg, rgba(98, 126, 234, 0.9), rgba(255, 107, 53, 0.9));
            border-radius: 2px;
            transform-origin: left center;
            pointer-events: none;
            z-index: 8;
            box-shadow: 0 0 10px rgba(98, 126, 234, 0.5);
        `;
        
        const dx = toCenter.x - fromCenter.x;
        const dy = toCenter.y - fromCenter.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        line.style.left = fromCenter.x + 'px';
        line.style.top = fromCenter.y + 'px';
        line.style.width = distance + 'px';
        line.style.transform = `rotate(${angle}deg) scaleX(0)`;
        
        container.appendChild(line);
        
        // Animate line appearance
        line.animate([
            { transform: `rotate(${angle}deg) scaleX(0)`, opacity: 0 },
            { transform: `rotate(${angle}deg) scaleX(1)`, opacity: 1 }
        ], {
            duration: 800,
            fill: 'forwards',
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        // Add flowing data particles
        createDataParticles(line, angle, distance);
    }, delay);
}

function createDataParticles(line, angle, distance) {
    const particleCount = 3;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: #627eea;
                border-radius: 50%;
                left: 0;
                top: -1.5px;
                box-shadow: 0 0 8px rgba(98, 126, 234, 0.8);
            `;
            
            line.appendChild(particle);
            
            particle.animate([
                { left: '0px', opacity: 1 },
                { left: distance + 'px', opacity: 0 }
            ], {
                duration: 2000,
                easing: 'linear',
                iterations: Infinity
            });
        }, i * 600);
    }
}

function showArchModal(modal, title, content) {
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalCloseBtn = modal.querySelector('.modal-close');
    
    if (modalTitle) modalTitle.textContent = title;
    if (modalDescription) modalDescription.innerHTML = content;
    
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    };
    
    if (modalCloseBtn) {
        modalCloseBtn.onclick = closeModal;
    }
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeModal();
        }
    };
    
    // Auto-close after 8 seconds
    setTimeout(closeModal, 8000);
}

function resetArchitectureView(chainNodes, techSatellites) {
    // Clear any existing modal
    const modal = document.getElementById('component-modal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Reset all chain nodes to default state
    chainNodes.forEach(node => {
        node.style.opacity = '1';
        node.style.transform = '';
        node.style.boxShadow = '';
        node.style.borderColor = '';
    });
    
    // Reset all tech satellites to default state
    techSatellites.forEach(satellite => {
        satellite.style.opacity = '1';
        satellite.style.borderColor = '';
        satellite.style.boxShadow = '';
        satellite.style.transform = '';
        satellite.style.background = '';
    });
    
    // Reset bridge core
    const bridgeCore = document.querySelector('.bridge-core');
    if (bridgeCore) {
        bridgeCore.style.boxShadow = '';
        bridgeCore.style.borderColor = '';
    }
}

// Set initial body opacity to 0 for fade-in effect
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.8s ease';