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

// Color blobs with Santa Sunrise info
function initializeColorBlobs() {
    const santaInfo = {
        vision: {
            title: 'Vision・ビジョン',
            content: `
                <h2>Metaverse into washing machine</h2>
                <div class="quote">
                    "メタバースを洗濯機に込めて"
                </div>
                <p>Santa Sunriseの革新的なビジョンは、デジタル世界と日常生活の境界を曖昧にし、新しい体験の可能性を探求することです。</p>
                <p>洗濯機という日常的なアイテムに、無限の可能性を秘めたメタバースの概念を融合させる発想は、常識を覆す創造性の表れです。</p>
                <h3>未来への展望</h3>
                <p>私たちは、テクノロジーと詩的な表現を組み合わせることで、これまでにない体験を創造します。</p>
            `
        },
        concept: {
            title: 'Concept・コンセプト',
            content: `
                <h2>A Skeptical Light Bulb</h2>
                <div class="quote">
                    "懐疑的な電球として"
                </div>
                <p>Santa Sunriseは自らを<span class="highlight">"A Skeptical Light Bulb"</span>と定義しています。</p>
                <p>これは、常識に疑問を投げかけながらも、新しい光を世界にもたらすという意志の表れです。</p>
                <h3>透明な炎</h3>
                <p>私たちが生み出す「透明な炎」は、見えないけれど確実に存在する情熱と創造力を象徴しています。</p>
                <p>それは<span class="highlight">"crazy juice"</span>と呼ばれる、狂気的なまでの創造性の源泉なのです。</p>
            `
        },
        philosophy: {
            title: 'Philosophy・哲学',
            content: `
                <h2>Beyond Conventional Thinking</h2>
                <div class="quote">
                    "従来の思考を超えて"
                </div>
                <p>Santa Sunriseの哲学は、既成概念にとらわれない<span class="highlight">非従来型</span>のアプローチにあります。</p>
                <h3>創造性の探求</h3>
                <p>私たちは、創造性と批判的思考を融合させ、新しい価値観を生み出すことを使命としています。</p>
                <p>メタファーを多用する表現方法は、言葉の限界を超えた理解を促進します。</p>
                <h3>革新への挑戦</h3>
                <p>常に既存の枠組みに疑問を投げかけ、革新的なソリューションを追求し続けます。</p>
            `
        },
        values: {
            title: 'Values・価値観',
            content: `
                <h2>Core Values</h2>
                <div class="quote">
                    "静寂、存在感、内面の美しさを大切に"
                </div>
                <h3>静寂の力</h3>
                <p><span class="highlight">静寂</span>は、私たちにとって創造性の源泉です。騒音の中では生まれない深い洞察が、静けさの中で育まれます。</p>
                <h3>存在感</h3>
                <p>私たちは、物理的な大きさではなく、<span class="highlight">存在感</span>の強さで価値を測ります。</p>
                <h3>内面の美しさ</h3>
                <p>表面的な美しさよりも、<span class="highlight">内面の美しさ</span>こそが真の価値を持つと信じています。</p>
                <p>それは、見る人の心に深く響く、本質的な美しさなのです。</p>
            `
        },
        about: {
            title: 'About・会社概要',
            content: `
                <h2>Santa Sunrise</h2>
                <div class="quote">
                    "創造的で非従来型のクリエイティブ集団"
                </div>
                <h3>設立</h3>
                <p><span class="highlight">2023年設立</span>の新進気鋭のクリエイティブ集団です。</p>
                <h3>事業内容</h3>
                <p>私たちは、メタファーと創造性を駆使して、これまでにない体験とソリューションを提供します。</p>
                <p>洗濯機、進化図、ロボット、宇宙など、多様なビジュアル要素を通じてストーリーを紡ぎます。</p>
                <h3>チーム構成</h3>
                <p>若々しく反抗的な精神を持つクリエイターたちが集結し、既成概念を覆す作品を生み出しています。</p>
                <h3>未来への約束</h3>
                <p>私たちは、<span class="highlight">変革と内省の物語</span>を通じて、世界に新しい価値を提供し続けます。</p>
            `
        }
    };

    document.querySelectorAll('.color-blob').forEach((blob, index) => {
        const color = blob.dataset.color;
        const infoType = blob.dataset.info;
        blob.style.background = color;
        
        blob.addEventListener('click', () => {
            // Show Santa Sunrise info
            showSantaInfo(infoType, santaInfo[infoType]);
            
            // Background effect
            document.body.style.background = `radial-gradient(circle at center, ${color}22 0%, #000 100%)`;
            setTimeout(() => {
                document.body.style.background = '#000';
            }, 2000);
        });
    });
}

// Show Santa Sunrise info modal
function showSantaInfo(type, info) {
    const modal = document.getElementById('infoModal');
    const body = document.getElementById('infoBody');
    
    body.innerHTML = info.content;
    modal.classList.add('active');
    
    // Close modal functionality
    const closeBtn = document.querySelector('.info-close');
    const modalOverlay = modal;
    
    closeBtn.onclick = () => {
        modal.classList.remove('active');
    };
    
    modalOverlay.onclick = (e) => {
        if (e.target === modalOverlay) {
            modal.classList.remove('active');
        }
    };
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
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

// Youth text rain
function initializeNumberRain() {
    const textRain = document.querySelector('.number-rain');
    
    const youthTexts = [
        '青春って何だろうね', '君の笑顔が一番好きだ', '夕日が綺麗だった', '今日も平凡な一日が始まる',
        '放課後の教室で君を待ってる', '桜が散っていく', '僕らの夏は終わらない', '星空を見上げて願いを込めた',
        'あの日の約束を覚えてる？', '図書館で出会った運命', '雨の日のバス停で', '君と過ごした時間が宝物',
        '青春の1ページ', '恋って不思議だね', '卒業まであと何日？', '文化祭での思い出',
        '部活の仲間たちと', '初恋の味は甘酸っぱい', '屋上から見た景色', '夏祭りの花火と君',
        '手紙を書こうと思ったけど', '君への気持ちを言葉にできない', '放課後の帰り道', '自転車を並べて走った',
        'あの時の気持ちのまま', '青空と白い雲', '君がいた教室', '制服姿の君が好きだった',
        '学園祭の準備で夜更かし', '体育祭でのドラマ', '修学旅行の夜', '卒業式の日に泣いた',
        '君のことばかり考えてる', '恋愛小説みたいな展開', '友達以上恋人未満', '告白する勇気がない',
        '青春時代の甘い思い出', '君と歩いた通学路', '窓際の席から見える景色', 'クラスメイトとの日々',
        '部室での秘密の話', '君の横顔が美しすぎて', '放課後の特別な時間', '学校帰りのコンビニ',
        '夏休みの宿題と恋心', '文庫本を読みながら', '君への想いは止まらない', '青春という名の奇跡',
        '制服を着た最後の日', '君と見た夕焼け空', '思春期の複雑な気持ち', '恋する気持ちって何？',
        '学生時代の淡い恋', 'あの日君は綺麗だった', '青春の1コマ', '君がいる風景',
        '放課後の音楽室で', '図書委員の君が好き', '保健室で過ごした時間', '君と交換した手紙',
        '学校行事での思い出', '運動会の応援合戦', '文化祭のクラス展示', '合唱コンクールの練習',
        '君のピアノを聴いていた', '美術室での創作活動', '化学実験での失敗', '数学の問題より君が難しい',
        '英語の授業中の妄想', '国語の時間に書いた詩', '歴史より君の過去が気になる', '地理より君の心を知りたい',
        '体育の時間の君は輝いてた', '家庭科で作った料理', '技術の授業でのものづくり', '音楽室でのハーモニー',
        '君との会話が楽しすぎて', '休み時間の短さが恨めしい', '授業中の居眠りと夢', '君が笑うと世界が明るくなる',
        '青春の輝きを君と', '学生服に込めた想い', '教室の空気が変わる瞬間', '君がいた季節',
        '放課後の部活動', '友情と恋の境界線', '純粋な気持ちのまま', '君との青春ストーリー'
    ];
    
    setInterval(() => {
        const text = document.createElement('div');
        text.classList.add('falling-number');
        text.textContent = youthTexts[Math.floor(Math.random() * youthTexts.length)];
        text.style.left = Math.random() * 100 + '%';
        text.style.animationDuration = (6 + Math.random() * 4) + 's';
        text.style.fontSize = (10 + Math.random() * 3) + 'px';
        text.style.opacity = 0.1 + Math.random() * 0.2;
        
        textRain.appendChild(text);
        
        setTimeout(() => {
            text.remove();
        }, 10000);
    }, 800);
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