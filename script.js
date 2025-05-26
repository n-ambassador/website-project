// Completely purposeless interactive elements

let clickCount = 0;
let bouncerX = Math.random() * window.innerWidth;
let bouncerY = Math.random() * window.innerHeight;
let bouncerVelX = 2;
let bouncerVelY = 2;

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initializeTrailCanvas();
    initializeMatrixCanvas();
    initializeColorBlobs();
    initializeSquares();
    initializeRippleZone();
    initializeGravityBalls();
    initializeBouncingElement();
    initializeProgressBars();
    initializeSecretButtons();
    initializeNumberRain();
    initializeInvisibleMaze();
    initializeTextChaos();
    initializeBreathingCircle();
    initializeSpinners();
    initializeMorphingShape();
    initializeNoiseGrid();
});

// Trail canvas for mouse movement
function initializeTrailCanvas() {
    const canvas = document.getElementById('trailCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const trails = [];
    
    document.addEventListener('mousemove', (e) => {
        trails.push({
            x: e.clientX,
            y: e.clientY,
            life: 30,
            maxLife: 30
        });
        
        if (trails.length > 50) {
            trails.shift();
        }
    });
    
    function animateTrails() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = trails.length - 1; i >= 0; i--) {
            const trail = trails[i];
            trail.life--;
            
            if (trail.life <= 0) {
                trails.splice(i, 1);
                continue;
            }
            
            const alpha = trail.life / trail.maxLife;
            const size = alpha * 5;
            
            ctx.beginPath();
            ctx.arc(trail.x, trail.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 0, 128, ${alpha * 0.5})`;
            ctx.fill();
        }
        
        requestAnimationFrame(animateTrails);
    }
    
    animateTrails();
}

// Matrix rain effect
function initializeMatrixCanvas() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01010101∅∞※?!@#$%^&*()_+-=[]{}|;:,.<>?';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 50);
}

// Color blobs
function initializeColorBlobs() {
    document.querySelectorAll('.color-blob').forEach((blob, index) => {
        const color = blob.dataset.color;
        blob.style.background = color;
        
        blob.addEventListener('click', () => {
            document.body.style.background = `radial-gradient(circle at center, ${color}22 0%, #000 100%)`;
            setTimeout(() => {
                document.body.style.background = '#000';
            }, 2000);
        });
    });
}

// Interactive squares
function initializeSquares() {
    document.querySelectorAll('.square').forEach(square => {
        square.addEventListener('click', () => {
            square.classList.add('active');
            setTimeout(() => {
                square.classList.remove('active');
            }, 300);
            
            // Generate random frequency
            const frequency = 200 + Math.random() * 800;
            playTone(frequency, 0.1);
        });
    });
}

// Simple tone generator
function playTone(frequency, duration) {
    if (typeof window.AudioContext !== 'undefined' || typeof window.webkitAudioContext !== 'undefined') {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
}

// Ripple zone
function initializeRippleZone() {
    const rippleZone = document.getElementById('rippleZone');
    
    rippleZone.addEventListener('click', (e) => {
        const rect = rippleZone.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.transform = 'translate(-50%, -50%)';
        
        rippleZone.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });
}

// Gravity balls
function initializeGravityBalls() {
    document.querySelectorAll('.gravity-ball').forEach(ball => {
        let isDragging = false;
        let offsetX, offsetY;
        
        ball.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - ball.offsetLeft;
            offsetY = e.clientY - ball.offsetTop;
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                ball.style.left = (e.clientX - offsetX) + 'px';
                ball.style.top = (e.clientY - offsetY) + 'px';
            }
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    });
}

// Bouncing element
function initializeBouncingElement() {
    const bouncer = document.getElementById('bouncer');
    
    function animateBouncer() {
        bouncerX += bouncerVelX;
        bouncerY += bouncerVelY;
        
        if (bouncerX <= 0 || bouncerX >= window.innerWidth - 30) {
            bouncerVelX = -bouncerVelX;
        }
        
        if (bouncerY <= 0 || bouncerY >= window.innerHeight - 30) {
            bouncerVelY = -bouncerVelY;
        }
        
        bouncer.style.left = bouncerX + 'px';
        bouncer.style.top = bouncerY + 'px';
        
        requestAnimationFrame(animateBouncer);
    }
    
    animateBouncer();
    
    bouncer.addEventListener('click', () => {
        bouncerVelX = (Math.random() - 0.5) * 10;
        bouncerVelY = (Math.random() - 0.5) * 10;
        bouncer.style.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    });
}

// Progress bars that do nothing
function initializeProgressBars() {
    document.querySelectorAll('.useless-progress').forEach(progress => {
        const bar = progress.querySelector('.progress-bar');
        let width = 0;
        let direction = 1;
        
        setInterval(() => {
            width += direction * Math.random() * 3;
            if (width >= 100) {
                width = 100;
                direction = -1;
            } else if (width <= 0) {
                width = 0;
                direction = 1;
            }
            bar.style.width = width + '%';
        }, 100);
        
        progress.addEventListener('click', () => {
            width = Math.random() * 100;
            bar.style.width = width + '%';
        });
    });
}

// Secret buttons
function initializeSecretButtons() {
    document.querySelectorAll('.secret-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const messages = ['∅', '⚡', '🌀', '✨', '💫', '🎭', '🔮', '🌙'];
            btn.textContent = messages[Math.random() * messages.length | 0];
            
            // Random position change
            btn.style.top = Math.random() * 80 + '%';
            btn.style.left = Math.random() * 80 + '%';
            btn.style.right = 'auto';
            btn.style.bottom = 'auto';
        });
    });
}

// Number rain
function initializeNumberRain() {
    const numberRain = document.querySelector('.number-rain');
    
    setInterval(() => {
        const number = document.createElement('div');
        number.classList.add('falling-number');
        number.textContent = Math.floor(Math.random() * 10);
        number.style.left = Math.random() * 100 + '%';
        number.style.animationDuration = (2 + Math.random() * 3) + 's';
        
        numberRain.appendChild(number);
        
        setTimeout(() => {
            number.remove();
        }, 5000);
    }, 200);
}

// Invisible maze
function initializeInvisibleMaze() {
    const maze = document.getElementById('maze');
    
    // Create invisible maze dots
    for (let i = 0; i < 200; i++) {
        const dot = document.createElement('div');
        dot.classList.add('maze-dot');
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';
        maze.appendChild(dot);
    }
    
    document.addEventListener('mousemove', (e) => {
        document.querySelectorAll('.maze-dot').forEach(dot => {
            const rect = dot.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(e.clientX - rect.left, 2) + 
                Math.pow(e.clientY - rect.top, 2)
            );
            
            if (distance < 50) {
                dot.classList.add('revealed');
            } else {
                dot.classList.remove('revealed');
            }
        });
    });
}

// Text chaos
function initializeTextChaos() {
    const textChaos = document.getElementById('textChaos');
    const phrases = [
        '01010110011', 'void.exe', '∅∞∅∞∅', 'ERROR_404_PURPOSE_NOT_FOUND',
        'RANDOM_STRING_GENERATOR', '▓▓▓▓▓▓▓▓', '¿¿¿???¿¿¿',
        'NO_MEANING_DETECTED', 'PURPOSELESS_CONTENT', '∅∅∅∅∅∅∅∅∅∅'
    ];
    
    setInterval(() => {
        textChaos.textContent = phrases[Math.random() * phrases.length | 0];
    }, 1500);
}

// Breathing circle
function initializeBreathingCircle() {
    const breathCircle = document.querySelector('.breath-circle');
    
    breathCircle.addEventListener('click', () => {
        const colors = ['rgba(128, 255, 0, 0.5)', 'rgba(255, 0, 128, 0.5)', 
                       'rgba(0, 128, 255, 0.5)', 'rgba(255, 128, 0, 0.5)'];
        breathCircle.style.background = colors[Math.random() * colors.length | 0];
    });
}

// Spinners
function initializeSpinners() {
    document.querySelectorAll('.spinner').forEach(spinner => {
        spinner.addEventListener('click', () => {
            const speed = Math.random() * 5 + 0.1;
            spinner.style.animationDuration = speed + 's';
            
            if (Math.random() > 0.5) {
                spinner.style.animationDirection = 'reverse';
            } else {
                spinner.style.animationDirection = 'normal';
            }
        });
    });
}

// Morphing shape
function initializeMorphingShape() {
    const morphShape = document.querySelector('.morphing-shape');
    
    morphShape.addEventListener('click', () => {
        const colors = ['rgba(128, 0, 255, 0.6)', 'rgba(255, 0, 128, 0.6)', 
                       'rgba(0, 255, 128, 0.6)', 'rgba(255, 128, 0, 0.6)'];
        morphShape.style.background = colors[Math.random() * colors.length | 0];
    });
}

// Noise grid
function initializeNoiseGrid() {
    document.querySelectorAll('.noise-pixel').forEach(pixel => {
        const randomDelay = Math.random() * 2;
        pixel.style.animationDelay = randomDelay + 's';
        
        setInterval(() => {
            pixel.style.animationDuration = (0.05 + Math.random() * 0.2) + 's';
        }, 1000);
    });
}

// Click counter
document.getElementById('clickCounter').addEventListener('click', () => {
    clickCount++;
    document.getElementById('clickCounter').textContent = clickCount;
    
    if (clickCount === 42) {
        document.getElementById('clickCounter').textContent = '∅';
        setTimeout(() => {
            clickCount = 0;
            document.getElementById('clickCounter').textContent = '0';
        }, 2000);
    }
});

// Global click listener for random effects
document.addEventListener('click', (e) => {
    // Random screen flash
    if (Math.random() > 0.95) {
        document.body.style.background = '#fff';
        setTimeout(() => {
            document.body.style.background = '#000';
        }, 50);
    }
    
    // Random element creation
    if (Math.random() > 0.98) {
        const randomElement = document.createElement('div');
        randomElement.style.position = 'absolute';
        randomElement.style.left = e.clientX + 'px';
        randomElement.style.top = e.clientY + 'px';
        randomElement.style.width = '10px';
        randomElement.style.height = '10px';
        randomElement.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
        randomElement.style.borderRadius = '50%';
        randomElement.style.pointerEvents = 'none';
        randomElement.style.animation = 'float 2s ease-out forwards';
        
        document.body.appendChild(randomElement);
        
        setTimeout(() => {
            randomElement.remove();
        }, 2000);
    }
});

// Random background color changes
setInterval(() => {
    if (Math.random() > 0.99) {
        const hue = Math.random() * 360;
        document.querySelector('.void').style.background = 
            `radial-gradient(circle at center, hsl(${hue}, 20%, 10%) 0%, #000 100%)`;
        
        setTimeout(() => {
            document.querySelector('.void').style.background = 
                'radial-gradient(circle at center, #111 0%, #000 100%)';
        }, 3000);
    }
}, 1000);

console.log('∅ Purposeless website loaded ∅');
console.log('Nothing meaningful will happen here');
console.log('Enjoy the void');