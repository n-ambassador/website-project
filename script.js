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

// Youth text matrix rain effect - Fixed version
function initializeMatrixCanvas() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Comprehensive youth novel text
    const youthText = '青春って何だろうねと君に聞いたあの日の放課後桜が散っていく中で僕らは笑っていた君の笑顔が一番好きだと言えなくて夕日が綺麗だったねとしか言えない自分が情けなくてでもそれでも君といる時間が宝物だった図書館で出会った運命なんて信じていなかったけれど君が読んでいた文庫本のタイトルを見た瞬間心臓が止まりそうになった初恋の味は甘酸っぱいというけれどこんなにも胸が苦しいものなのか部活の仲間たちと過ごした夏の日々汗まみれになりながらも笑顔だった君の姿が今でも目に焼き付いている体育祭での応援合戦文化祭のクラス展示合唱コンクールの練習全てが特別な思い出になった放課後の教室で君を待っている時間が一番好きだった夕日が差し込む窓際の席で君の横顔を見ているだけで幸せだった手紙を書こうと思ったけれど君への気持ちを言葉にできない自分がもどかしくて屋上から見た景色と君の笑い声夏祭りの花火と浴衣姿の君修学旅行の夜に話した将来の夢卒業式の日に流した涙全てが青春という名の奇跡だった友達以上恋人未満のもどかしい関係が続いて雨の日のバス停で傘を差し出してくれた君の優しさに恋をした瞬間を今でも覚えている君と歩いた通学路一緒に立ち寄ったコンビニ自転車を並べて走った帰り道全てが特別な意味を持っていた音楽室で君のピアノを聴いていた時間美術室での創作活動化学実験での失敗数学の問題より君の方が難しくて解けなかった英語の授業中も君のことばかり考えて先生に当てられて答えられなかった保健室で過ごした時間図書委員として働く君の真面目な姿窓際の席から見える景色よりも君の方が美しくて授業に集中できない日々が続いた君との会話が楽しすぎて休み時間の短さが恨めしかった学園祭の準備で夜更かしした日々クラスメイトとの何気ない会話部室での秘密の話放課後の特別な時間夏休みの宿題よりも君への想いの方が複雑で解けなかった制服を着た最後の日に思ったこと青空と白い雲を見上げながら君のことを考えていた君がいた教室君がいた季節君との青春ストーリーが今でも心の中で続いているあの時の気持ちのまま時が止まっていればよかったのに';
    
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    // Initialize drops
    for (let x = 0; x < columns; x++) {
        drops[x] = {
            y: 1,
            charIndex: Math.floor(Math.random() * youthText.length)
        };
    }
    
    function draw() {
        // Black background with slight transparency
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0'; // Matrix green
        ctx.font = fontSize + 'px "Yu Gothic", "Hiragino Sans", monospace';
        
        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            const drop = drops[i];
            
            // Get current character
            const char = youthText[drop.charIndex % youthText.length];
            
            // Draw character
            ctx.fillText(char, i * fontSize, drop.y * fontSize);
            
            // Reset drop randomly or when it reaches bottom
            if (drop.y * fontSize > canvas.height && Math.random() > 0.975) {
                drop.y = 0;
                drop.charIndex = Math.floor(Math.random() * youthText.length);
            }
            
            // Move drop down and advance character
            drop.y++;
            drop.charIndex++;
        }
    }
    
    setInterval(draw, 33);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Color blobs with actual Santa Sunrise content
function initializeColorBlobs() {
    const santaInfo = {
        vision: {
            title: 'Our Vision',
            content: `
                <h2>Metaverse into washing machine.</h2>
                <div style="text-align: center; margin: 1.5rem 0;">
                    <img src="./images/washingmachine.png" alt="Washing Machine" style="max-width: 300px; width: 100%; border-radius: 10px;">
                </div>
                <div class="quote">
                    High school summer. I had too much time to think about the meaning of life, youth, and love. There was a sadness to me then. I wonder if there is any sadness to me now? I can't help but think that life is simply continuing to wash away, just like the laundry in this machine.
                </div>
                <div style="text-align: center; margin: 1.5rem 0;">
                    <img src="./images/evolution.png" alt="Evolution" style="max-width: 300px; width: 100%; border-radius: 10px;">
                </div>
                <p>私たちのビジョンは、高校時代の夏に感じた人生の意味への問いかけから始まります。生命、青春、そして愛について考えすぎてしまう時間がありました。</p>
                <p>洗濯機の中で洗い流されていく衣服のように、人生もまた続いていくものなのでしょうか。</p>
            `
        },
        concept: {
            title: 'Who we are',
            content: `
                <h2>A Skeptical Light Bulb</h2>
                <div style="text-align: center; margin: 1.5rem 0;">
                    <img src="./images/sunflowerinblu.png" alt="Sunflower in Blue" style="max-width: 300px; width: 100%; border-radius: 10px;">
                </div>
                <div class="quote">
                    We are a skeptical light bulb. We glow, when we flip the switch of convention. It lights an invention fire. And we call this transparent flame "madness juice".
                </div>
                <div style="text-align: center; margin: 1.5rem 0;">
                    <img src="./images/evolution_animal_robot.png" alt="Animal Robot Evolution" style="max-width: 300px; width: 100%; border-radius: 10px;">
                </div>
                <p>私たちは<span class="highlight">懐疑的な電球</span>です。慣習のスイッチを切り替えるとき、私たちは光ります。</p>
                <p>それは発明の火を灯し、私たちはこの透明な炎を<span class="highlight">"madness juice"</span>と呼んでいます。</p>
            `
        },
        philosophy: {
            title: 'What we do',
            content: `
                <h2>Love Bombarda</h2>
                <div style="text-align: center; margin: 1.5rem 0;">
                    <img src="./images/inthespace.png" alt="In Space" style="max-width: 300px; width: 100%; border-radius: 10px;">
                </div>
                <div class="quote">
                    Beauty is in simply being. We think there's beauty in simply doing something that doesn't make sense. So we're just vibrating.
                </div>
                <div style="text-align: center; margin: 1.5rem 0;">
                    <img src="./images/love_fire_worls.png" alt="Love Fire Worlds" style="max-width: 300px; width: 100%; border-radius: 10px;">
                </div>
                <p>美しさは、ただ存在することの中にあります。意味をなさないことをすることにも美しさがあると私たちは考えています。</p>
                <p>だから私たちは<span class="highlight">ただ振動している</span>のです。</p>
            `
        },
        values: {
            title: 'Night Speaker',
            content: `
                <h2>The Beauty of Existence</h2>
                <div style="text-align: center; margin: 1.5rem 0;">
                    <img src="./images/nightspeaker.png" alt="Night Speaker" style="max-width: 300px; width: 100%; border-radius: 10px;">
                </div>
                <div class="quote">
                    "Beauty is in simply being."
                </div>
                <p>私たちの価値観は、シンプルな存在の中に美を見出すことです。</p>
                <p>意味を持たないことにも美しさがあり、そこに私たちの真の価値が宿っています。</p>
                <h3>ただ振動すること</h3>
                <p>私たちは意味を求めず、<span class="highlight">ただ振動する</span>ことで世界に響きを与えています。</p>
            `
        },
        about: {
            title: 'Santa Sunrise',
            content: `
                <h2>Santa Sunrise</h2>
                <div style="text-align: center; margin: 1.5rem 0;">
                    <img src="./images/SSLogo_big.png" alt="Santa Sunrise Logo" style="max-width: 200px; width: 100%;">
                </div>
                <div style="text-align: center; margin: 1.5rem 0;">
                    <img src="./images/HP_withHumen.png" alt="Humans" style="max-width: 300px; width: 100%; border-radius: 10px;">
                </div>
                <div class="quote">
                    "A creative collective challenging conventions and lighting invention fires."
                </div>
                <h3>私たちについて</h3>
                <p>Santa Sunriseは、慣習に挑戦し、発明の火を灯すクリエイティブな集団です。</p>
                <p>透明な炎である<span class="highlight">"madness juice"</span>を通じて、世界に新しい価値を提供します。</p>
                <h3>私たちの使命</h3>
                <p>美しさは単純に存在することの中にあるという信念のもと、意味をなさないことの美しさを追求しています。</p>
                <p>私たちは<span class="highlight">ただ振動する</span>ことで、世界に響きを与え続けています。</p>
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