class HappyClock {
    constructor() {
        this.currentTheme = 'cyber';
        this.timeFormat = '24h';
        this.animationsEnabled = true;
        this.soundsEnabled = true;
        this.animationSpeed = 5;
        this.version = 'v2.25.12.29.14.20';
        this.init();
    }

    async init() {
        this.cacheElements();
        this.createDigitColumns();
        this.setupEventListeners();
        this.applyTheme(this.currentTheme);
        this.createParticles();
        this.startClock();
        this.updateThemeButtons();
    }

    cacheElements() {
        // Time
        this.currentTime = document.getElementById('current-time');
        this.currentDate = document.getElementById('current-date');
        this.modalTime = document.getElementById('modal-time');
        this.modalTheme = document.getElementById('modal-theme');
        this.currentThemeName = document.getElementById('current-theme-name');
        
        // Digital
        this.hoursDigital = document.getElementById('hours-digital');
        this.minutesDigital = document.getElementById('minutes-digital');
        this.secondsDigital = document.getElementById('seconds-digital');
        
        // Digit stacks
        this.hourTensStack = document.getElementById('hour-tens-stack');
        this.hourOnesStack = document.getElementById('hour-ones-stack');
        this.minuteTensStack = document.getElementById('minute-tens-stack');
        this.minuteOnesStack = document.getElementById('minute-ones-stack');
        this.secondTensStack = document.getElementById('second-tens-stack');
        this.secondOnesStack = document.getElementById('second-ones-stack');
        
        // Controls
        this.themeButtons = document.querySelectorAll('.theme-btn-modal');
        this.timeFormatRadios = document.querySelectorAll('input[name="timeFormat"]');
        this.animationToggle = document.getElementById('animationToggle');
        this.soundToggle = document.getElementById('soundToggle');
        this.speedControl = document.getElementById('speedControl');
        this.refreshBtn = document.getElementById('refreshBtn');
        this.fullscreenBtn = document.getElementById('fullscreenBtn');
        
        // Modal
        this.settingsModal = document.getElementById('settingsModal');
        this.themeModal = document.getElementById('themeModal');
        this.aboutModal = document.getElementById('aboutModal');
    }

    createDigitColumns() {
        // Hour tens (0-2)
        for (let i = 0; i <= 2; i++) {
            const digit = this.createDigitElement(i);
            this.hourTensStack.appendChild(digit);
        }

        // Hour ones (0-9)
        for (let i = 0; i <= 9; i++) {
            const digit = this.createDigitElement(i);
            this.hourOnesStack.appendChild(digit);
        }

        // Minute tens (0-5)
        for (let i = 0; i <= 5; i++) {
            const digit = this.createDigitElement(i);
            this.minuteTensStack.appendChild(digit);
        }

        // Minute ones (0-9)
        for (let i = 0; i <= 9; i++) {
            const digit = this.createDigitElement(i);
            this.minuteOnesStack.appendChild(digit);
        }

        // Second tens (0-5)
        for (let i = 0; i <= 5; i++) {
            const digit = this.createDigitElement(i);
            this.secondTensStack.appendChild(digit);
        }

        // Second ones (0-9)
        for (let i = 0; i <= 9; i++) {
            const digit = this.createDigitElement(i);
            this.secondOnesStack.appendChild(digit);
        }
    }

    createDigitElement(value) {
        const digit = document.createElement('div');
        digit.className = 'digit';
        digit.textContent = value;
        digit.dataset.value = value;
        return digit;
    }

    setupEventListeners() {
        this.themeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = e.target.closest('.theme-btn-modal').dataset.theme;
                this.applyTheme(theme);
                this.updateThemeButtons();
                this.updateCurrentThemeName();
            });
        });

        this.timeFormatRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.timeFormat = e.target.id === 'format12h' ? '12h' : '24h';
                this.updateDisplay();
            });
        });

        this.animationToggle.addEventListener('change', (e) => {
            this.animationsEnabled = e.target.checked;
            document.documentElement.style.setProperty('--animation-speed', 
                this.animationsEnabled ? `${1.5 - (this.animationSpeed * 0.1)}s` : '0s');
        });

        this.soundToggle.addEventListener('change', (e) => {
            this.soundsEnabled = e.target.checked;
        });

        this.speedControl.addEventListener('input', (e) => {
            this.animationSpeed = parseInt(e.target.value);
            if (this.animationsEnabled) {
                document.documentElement.style.setProperty('--animation-speed', 
                    `${1.5 - (this.animationSpeed * 0.1)}s`);
            }
        });

        this.refreshBtn.addEventListener('click', () => {
            this.updateDisplay();
        });

        this.fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        });

        this.settingsModal.addEventListener('show.bs.modal', () => {
            this.updateModalTheme();
            this.updateModalTime();
        });

        this.themeModal.addEventListener('show.bs.modal', () => {
            this.updateThemeButtons();
            this.updateCurrentThemeName();
        });

        // shortcuts
        document.addEventListener('keydown', (e) => {
            switch(e.key.toLowerCase()) {
                case '1': this.applyTheme('cyber'); break;
                case '2': this.applyTheme('matrix'); break;
                case '3': this.applyTheme('neon'); break;
                case 'f': this.fullscreenBtn.click(); break;
                case 'r': this.updateDisplay(); break;
                case ' ': 
                    e.preventDefault();
                    this.animationsEnabled = !this.animationsEnabled;
                    this.animationToggle.checked = this.animationsEnabled;
                    break;
            }
        });
    }

    applyTheme(themeName) {
        this.currentTheme = themeName;
        document.body.className = `theme-${themeName}`;
        
        switch(themeName) {
            case 'cyber':
                document.documentElement.style.setProperty('--happy-primary', '#00ff88');
                document.documentElement.style.setProperty('--happy-secondary', '#0088ff');
                document.documentElement.style.setProperty('--happy-accent', '#ff0088');
                break;
            case 'matrix':
                document.documentElement.style.setProperty('--happy-primary', '#00ff41');
                document.documentElement.style.setProperty('--happy-secondary', '#008f11');
                document.documentElement.style.setProperty('--happy-accent', '#00ff88');
                break;
            case 'neon':
                document.documentElement.style.setProperty('--happy-primary', '#ff00ff');
                document.documentElement.style.setProperty('--happy-secondary', '#00ffff');
                document.documentElement.style.setProperty('--happy-accent', '#ffff00');
                break;
        }
        
        this.updateModalTheme();
        this.updateCurrentThemeName();
    }

    updateThemeButtons() {
        this.themeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.theme === this.currentTheme) {
                btn.classList.add('active');
            }
        });
    }

    updateCurrentThemeName() {
        if (this.currentThemeName) {
            const themeNames = {
                'cyber': 'Cyber',
                'matrix': 'Matrix',
                'neon': 'Neon'
            };
            this.currentThemeName.textContent = themeNames[this.currentTheme] || 'Cyber';
        }
    }

    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'floating-particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = Math.random() * 4 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = Math.random() * 10 + 20 + 's';
            particlesContainer.appendChild(particle);
        }
    }

    async startClock() {
        this.updateDisplay();
        setInterval(() => this.updateDisplay(), 1000);
    }

    async updateDisplay() {
        try {
            const response = await fetch('/api/time');
            const timeData = await response.json();
            this.displayTime(timeData);
            this.updateModalTime();
        } catch (error) {
            console.error('Error updating time:', error);
            // Fallback to local time
            const now = new Date();
            this.displayTime({
                hours: now.getHours(),
                minutes: now.getMinutes(),
                seconds: now.getSeconds(),
                date: now.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            });
            this.updateModalTime();
        }
    }

    displayTime(timeData) {
        let hours = timeData.hours;
        const isPM = hours >= 12;
        
        let displayHours = hours;
        if (this.timeFormat === '12h') {
            displayHours = hours % 12 || 12;
        }
        
        const hourStr = displayHours.toString().padStart(2, '0');
        const minuteStr = timeData.minutes.toString().padStart(2, '0');
        const secondStr = timeData.seconds.toString().padStart(2, '0');
        
        this.hoursDigital.textContent = hourStr;
        this.minutesDigital.textContent = minuteStr;
        this.secondsDigital.textContent = secondStr;
        
        const ampm = this.timeFormat === '12h' ? (isPM ? ' PM' : ' AM') : '';
        this.currentTime.textContent = `${hourStr}:${minuteStr}:${secondStr}${ampm}`;
        this.currentDate.textContent = timeData.date;
        
        this.updateDigitColumn(this.hourTensStack, parseInt(hourStr[0]));
        this.updateDigitColumn(this.hourOnesStack, parseInt(hourStr[1]));
        this.updateDigitColumn(this.minuteTensStack, parseInt(minuteStr[0]));
        this.updateDigitColumn(this.minuteOnesStack, parseInt(minuteStr[1]));
        this.updateDigitColumn(this.secondTensStack, parseInt(secondStr[0]));
        this.updateDigitColumn(this.secondOnesStack, parseInt(secondStr[1]));
    }

    updateDigitColumn(column, activeValue) {
        const digits = column.querySelectorAll('.digit');
        digits.forEach(digit => {
            const value = parseInt(digit.dataset.value);
            digit.classList.remove('active', 'above-active', 'below-active');
            
            if (value === activeValue) {
                digit.classList.add('active');
            } else if (value === activeValue - 1 || (activeValue === 0 && value === 9)) {
                digit.classList.add('above-active');
            } else if (value === activeValue + 1 || (activeValue === 9 && value === 0)) {
                digit.classList.add('below-active');
            }
            
            // Position the digit in the column
            const position = (value - activeValue + 10) % 10;
            const topPosition = 50 + (position * 28); 
            digit.style.top = `${topPosition}px`;
        });
    }

    updateModalTheme() {
        if (this.modalTheme) {
            const themeNames = {
                'cyber': 'Cyber',
                'matrix': 'Matrix',
                'neon': 'Neon'
            };
            this.modalTheme.textContent = themeNames[this.currentTheme] || 'Cyber';
        }
    }

    updateModalTime() {
        if (this.modalTime && this.currentTime.textContent !== '--:--:--') {
            this.modalTime.textContent = this.currentTime.textContent;
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const happyClock = new HappyClock();
    console.log('%cHAPPY CLOCK v2.25.12.29.14.20', 'font-size: 16px; color: #00ff88; font-weight: bold;');
    console.log('%cThree-column cascading time display by Mihlali', 'font-size: 12px; color: #0088ff;');
    console.log('%cShortcuts: 1-3 (Themes) | F (Fullscreen) | R (Refresh) | Space (Animations)', 'font-size: 11px; color: #ff0088;');
});
