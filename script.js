const GITHUB_USER = 'jer-hub';

function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function setBioHtml(el, bio) {
    el.textContent = '';
    String(bio).split('\n').forEach((line, i) => {
        if (i) el.appendChild(document.createElement('br'));
        el.appendChild(document.createTextNode(line));
    });
}

// ============================================
// JELLYFISH
// ============================================
const jellyConfigs = [
    { size: 80, x: '8%', y: '15%', color: '#00d4ff', colorLight: '#66e5ff', glow: 'rgba(0,212,255,0.15)', glowInner: 'rgba(0,212,255,0.08)', pulseSpeed: 4, waveSpeed: 3.5, floatDuration: 18, opacity: 0.5 },
    { size: 120, x: '85%', y: '25%', color: '#7b61ff', colorLight: '#a89bff', glow: 'rgba(123,97,255,0.12)', glowInner: 'rgba(123,97,255,0.06)', pulseSpeed: 5, waveSpeed: 4, floatDuration: 22, opacity: 0.4 },
    { size: 60, x: '70%', y: '60%', color: '#ff61d8', colorLight: '#ff99e6', glow: 'rgba(255,97,216,0.12)', glowInner: 'rgba(255,97,216,0.06)', pulseSpeed: 3.5, waveSpeed: 3, floatDuration: 15, opacity: 0.35 },
    { size: 100, x: '20%', y: '70%', color: '#4d8bff', colorLight: '#80abff', glow: 'rgba(77,139,255,0.1)', glowInner: 'rgba(77,139,255,0.05)', pulseSpeed: 4.5, waveSpeed: 3.8, floatDuration: 20, opacity: 0.3 },
    { size: 45, x: '50%', y: '40%', color: '#00d4ff', colorLight: '#66e5ff', glow: 'rgba(0,212,255,0.08)', glowInner: 'rgba(0,212,255,0.04)', pulseSpeed: 3, waveSpeed: 2.5, floatDuration: 14, opacity: 0.25 },
    { size: 70, x: '35%', y: '85%', color: '#7b61ff', colorLight: '#a89bff', glow: 'rgba(123,97,255,0.08)', glowInner: 'rgba(123,97,255,0.04)', pulseSpeed: 3.8, waveSpeed: 3.2, floatDuration: 17, opacity: 0.2 },
    { size: 55, x: '92%', y: '80%', color: '#ff61d8', colorLight: '#ff99e6', glow: 'rgba(255,97,216,0.08)', glowInner: 'rgba(255,97,216,0.04)', pulseSpeed: 4.2, waveSpeed: 3.5, floatDuration: 19, opacity: 0.2 }
];

function createJellyfish(c) {
    const j = document.createElement('div');
    j.className = 'jellyfish';
    j.style.cssText = `left:${c.x};top:${c.y};--size:${c.size}px;--color:${c.color};--color-light:${c.colorLight};--glow:${c.glow};--glow-inner:${c.glowInner};--pulse-speed:${c.pulseSpeed}s;--wave-speed:${c.waveSpeed}s;opacity:${c.opacity};animation:jellyFloat ${c.floatDuration}s ease-in-out infinite`;
    j.innerHTML = '<div class="jelly-body"></div><div class="tentacles"><div class="tentacle"></div><div class="tentacle"></div><div class="tentacle"></div><div class="tentacle"></div><div class="tentacle"></div><div class="tentacle"></div></div><div class="oral-arms"><div class="oral-arm"></div><div class="oral-arm"></div><div class="oral-arm"></div></div>';
    return j;
}

document.getElementById('jellyContainer').appendChild(
    Object.values(jellyConfigs)
        .map(createJellyfish)
        .reduce((f, c) => (f.appendChild(c), f), document.createDocumentFragment())
);

if (window.matchMedia('(max-width: 767px)').matches) {
    document.querySelectorAll('#jellyContainer .jellyfish').forEach((el, i) => {
        if (i >= 3) {
            el.remove();
            return;
        }
        const sizeMatch = el.style.cssText.match(/--size:(\d+)px/);
        if (sizeMatch) {
            const next = Math.min(Number(sizeMatch[1]), 70);
            el.style.setProperty('--size', `${next}px`);
        }
        const left = parseFloat(el.style.left);
        if (!Number.isNaN(left) && left > 78) el.style.left = '70%';
    });
}

const pColors = ['#00d4ff', '#7b61ff', '#ff61d8', '#4d8bff'];
const pc = document.getElementById('particleContainer');
const particleCount = window.matchMedia('(max-width: 767px)').matches ? 12 : 30;
for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const c = pColors[Math.floor(Math.random() * pColors.length)];
    p.style.cssText = `left:${Math.random() * 100}%;--p-color:${c};--p-duration:${6 + Math.random() * 10}s;--p-delay:${Math.random() * 10}s;width:${1 + Math.random() * 2}px;height:${1 + Math.random() * 2}px`;
    pc.appendChild(p);
}

// ============================================
// TYPING
// ============================================
const phrases = [
    'React · Next.js · Django · REST APIs',
    'Web Developer & IT Instructor',
    'Full-stack client projects end to end',
    'Teaching programming at the college level',
    'Cursor & Grok for faster delivery'
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeEffect() {
    const cur = phrases[phraseIdx];
    if (!isDeleting) {
        typedEl.textContent = cur.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === cur.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        setTimeout(typeEffect, 50 + Math.random() * 30);
    } else {
        typedEl.textContent = cur.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            setTimeout(typeEffect, 400);
            return;
        }
        setTimeout(typeEffect, 25);
    }
}

if (prefersReducedMotion) typedEl.textContent = phrases[0];
else typeEffect();

// ============================================
// GITHUB API
// ============================================
const GITHUB_SVG =
    '<svg class="github-icon-inline w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>';

const LANG_COLORS = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    PHP: '#4F5D95',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Shell: '#89e051',
    Dart: '#00B4AB',
    Lua: '#000080',
    R: '#198CE7',
    Scala: '#c22d40',
    Vue: '#41b883',
    Svelte: '#ff3e00',
    Dockerfile: '#384d54',
    'Jupyter Notebook': '#DA5B0B',
    TeX: '#3D6117',
    SCSS: '#c6538c',
    Sass: '#a53b70',
    Less: '#1d365d'
};

let allRepos = [];
let reposLoadError = null;

function resetStats() {
    ['statRepos', 'statStars', 'statForks'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.textContent = '—';
    });
}

function showGitHubFailure(message) {
    resetStats();
    const grid = document.getElementById('reposGrid');
    const lang = document.getElementById('langBars');
    const filterBar = document.getElementById('filterBar');
    if (grid) {
        grid.innerHTML = `<p class="text-sm text-slate-500 col-span-full">${escapeHtml(message)}</p>`;
    }
    if (lang) {
        lang.innerHTML = `<p class="text-sm text-slate-500">${escapeHtml(message)}</p>`;
    }
    if (filterBar) {
        filterBar.innerHTML =
            '<button type="button" class="filter-btn active px-4 py-1.5 rounded-lg text-xs font-medium transition" data-filter="all">All</button>';
        styleFilters();
    }
}

async function fetchGitHub() {
    reposLoadError = null;
    try {
        const [profileRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USER}`),
            fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100&type=owner`)
        ]);
        const profile = await profileRes.json();
        const reposData = await reposRes.json();

        if (!profileRes.ok || typeof profile.login !== 'string') {
            const msg = profile.message || `Could not load GitHub profile (${profileRes.status}).`;
            showGitHubFailure(msg);
            return;
        }

        if (!reposRes.ok || !Array.isArray(reposData)) {
            reposLoadError =
                (reposData && reposData.message) || `Could not load repositories (${reposRes.status}).`;
            allRepos = [];
        } else {
            allRepos = reposData.filter((r) => !r.fork);
        }

        populateProfile(profile);
        populateRepos(allRepos);
        populateLanguages(allRepos);
        populateFilters(allRepos);
    } catch (e) {
        console.error('GitHub fetch error:', e);
        showGitHubFailure('Network error while loading GitHub data.');
    }
}

function populateProfile(p) {
    // Keep CV-sourced name & bio; only sync nav handle and GitHub stats
    document.getElementById('navName').textContent = p.login || 'jer-hub';
    document.title = 'Jerwin A. Carreon — Web Developer & IT Instructor';

    const statusEl = document.getElementById('heroStatus');
    const statusSpan = statusEl && statusEl.querySelector('span:last-child');
    if (statusSpan) {
        const location = p.location || 'Koronadal City, South Cotabato, Philippines';
        statusSpan.textContent = location;
    }

    const repos = Number(p.public_repos);
    document.getElementById('statRepos').textContent = Number.isFinite(repos) ? String(repos) : '—';

    const totalStars = allRepos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
    const totalForks = allRepos.reduce((s, r) => s + (r.forks_count || 0), 0);
    animateCounter('statStars', totalStars);
    animateCounter('statForks', totalForks);
}

function animateCounter(id, target) {
    const el = document.getElementById(id);
    if (!el || !Number.isFinite(target)) {
        if (el) el.textContent = '—';
        return;
    }
    let current = 0;
    const inc = Math.max(1, Math.ceil(target / 30));
    const timer = setInterval(() => {
        current += inc;
        if (current >= target) {
            el.textContent = String(target);
            clearInterval(timer);
        } else el.textContent = String(current);
    }, 30);
}

function populateRepos(repos) {
    const grid = document.getElementById('reposGrid');
    grid.innerHTML = '';

    if (reposLoadError) {
        const note = document.createElement('p');
        note.className = 'text-sm text-amber-500/90 col-span-full mb-2';
        note.textContent = reposLoadError;
        grid.appendChild(note);
    }

    if (!repos.length && !reposLoadError) {
        grid.innerHTML = '<p class="text-sm text-slate-500 col-span-full">No public repositories to show.</p>';
        return;
    }

    const sorted = [...repos].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    sorted.forEach((repo, i) => {
        const card = document.createElement('a');
        card.href = repo.html_url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.className = 'repo-card rounded-2xl p-6 block reveal repo-item';
        card.dataset.lang = repo.language || 'Other';
        card.style.transitionDelay = `${i * 0.04}s`;
        const langCol = LANG_COLORS[repo.language] || '#8b949e';
        const timeAgo = getTimeAgo(repo.updated_at);
        const desc = repo.description || 'No description provided.';
        const safeName = escapeHtml(repo.name);
        const safeDesc = escapeHtml(desc);
        const safeLang = escapeHtml(repo.language || '');
        card.innerHTML = `
            <div class="flex items-start justify-between gap-4 mb-3">
                <div class="flex items-center gap-2.5 min-w-0">
                    ${GITHUB_SVG}
                    <h3 class="text-sm font-semibold text-white truncate">${safeName}</h3>
                </div>
                <svg class="w-4 h-4 text-slate-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
            </div>
            <p class="text-xs text-slate-500 leading-relaxed mb-4" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${safeDesc}</p>
            <div class="flex items-center gap-4 flex-wrap">
                ${repo.language ? `<span class="flex items-center gap-1.5 text-xs text-slate-500"><span class="lang-dot" style="background:${langCol}"></span>${safeLang}</span>` : ''}
                ${repo.stargazers_count > 0 ? `<span class="flex items-center gap-1 text-xs text-slate-600"><i data-lucide="star" class="w-3 h-3"></i>${repo.stargazers_count}</span>` : ''}
                ${repo.forks_count > 0 ? `<span class="flex items-center gap-1 text-xs text-slate-600"><i data-lucide="git-fork" class="w-3 h-3"></i>${repo.forks_count}</span>` : ''}
                <span class="text-xs text-slate-700 ml-auto">${escapeHtml(timeAgo)}</span>
            </div>`;
        grid.appendChild(card);
    });
    if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
    document.querySelectorAll('.reveal:not(.active)').forEach((el) => observer.observe(el));
}

function populateLanguages(repos) {
    const langBytes = {};
    repos.forEach((r) => {
        if (r.language) langBytes[r.language] = (langBytes[r.language] || 0) + (r.size || 0);
    });
    const total = Object.values(langBytes).reduce((a, b) => a + b, 0);
    const sorted = Object.entries(langBytes)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8);
    const container = document.getElementById('langBars');
    container.innerHTML = '';
    if (!sorted.length) {
        container.innerHTML = '<p class="text-sm text-slate-500">No language data available.</p>';
        return;
    }
    sorted.forEach(([lang, bytes], i) => {
        const pct = ((bytes / total) * 100).toFixed(1);
        const col = LANG_COLORS[lang] || '#8b949e';
        const safeLang = escapeHtml(lang);
        const row = document.createElement('div');
        row.className = 'lang-row';
        row.style.cssText = `opacity:0;transform:translateX(-20px);transition:all 0.5s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`;
        row.innerHTML = `
            <span class="lang-row-label truncate">${safeLang}</span>
            <div class="lang-row-track">
                <div class="lang-bar" style="width:0%;background:${col};box-shadow:0 0 10px ${col}44"></div>
            </div>
            <span class="lang-row-pct">${pct}%</span>`;
        container.appendChild(row);
        requestAnimationFrame(() => {
            setTimeout(() => {
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
                const bar = row.querySelector('.lang-bar');
                if (bar) bar.style.width = `${pct}%`;
            }, 100 + i * 100);
        });
    });
}

function populateFilters(repos) {
    const langs = [...new Set(repos.map((r) => r.language).filter(Boolean))].sort();
    const bar = document.getElementById('filterBar');
    bar.innerHTML =
        '<button type="button" class="filter-btn active px-4 py-1.5 rounded-lg text-xs font-medium transition" data-filter="all">All</button>';
    langs.forEach((lang) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'filter-btn px-4 py-1.5 rounded-lg text-xs font-medium transition';
        btn.dataset.filter = lang;
        btn.textContent = lang;
        bar.appendChild(btn);
    });
    styleFilters();
    bar.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            bar.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            styleFilters();
            const filter = btn.dataset.filter;
            document.querySelectorAll('.repo-item').forEach((item) => {
                if (filter === 'all' || item.dataset.lang === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    requestAnimationFrame(() => {
                        item.style.transition = 'all 0.4s';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                } else item.style.display = 'none';
            });
        });
    });
}

function styleFilters() {
    document.querySelectorAll('.filter-btn').forEach((btn) => {
        if (btn.classList.contains('active')) {
            btn.style.background = 'rgba(0,212,255,0.12)';
            btn.style.color = '#00d4ff';
            btn.style.border = '1px solid rgba(0,212,255,0.2)';
        } else {
            btn.style.background = 'rgba(255,255,255,0.04)';
            btn.style.color = '#94a3b8';
            btn.style.border = '1px solid rgba(255,255,255,0.06)';
        }
    });
}

function getTimeAgo(d) {
    const diff = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
    return `${Math.floor(diff / 31536000)}y ago`;
}

// ============================================
// SCROLL REVEAL
// ============================================
const observer = new IntersectionObserver(
    (e) => e.forEach((x) => {
        if (x.isIntersecting) x.target.classList.add('active');
    }),
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

fetchGitHub();

// ============================================
// MOBILE MENU
// ============================================
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuClose = document.getElementById('mobileMenuClose');

function setMobileMenuOpen(open) {
    mobileMenu.classList.toggle('open', open);
    mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
    mobileMenuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('menu-open', open);
    if (open) mobileMenuClose.focus();
    else mobileMenuBtn.focus();
}

mobileMenuBtn.addEventListener('click', () => setMobileMenuOpen(true));
mobileMenuClose.addEventListener('click', () => setMobileMenuOpen(false));
document.querySelectorAll('.mobile-link').forEach((l) =>
    l.addEventListener('click', () => setMobileMenuOpen(false))
);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        setMobileMenuOpen(false);
    }
});

const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') {
            e.preventDefault();
            return;
        }
        const t = document.querySelector(href);
        if (t) {
            e.preventDefault();
            t.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
        }
    });
});

if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();

const avatarGlow = document.getElementById('heroAvatarGlow');
if (avatarGlow) {
    const avatarImg = document.getElementById('avatarImg');
    avatarImg.addEventListener('load', () => avatarGlow.classList.add('active'));
    setTimeout(() => {
        if (avatarImg.complete) avatarGlow.classList.add('active');
    }, 1000);
}
