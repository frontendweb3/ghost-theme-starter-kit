// Import styles
import '../css/styles.css';

// Import utilities
import './alpine.js';  // Initialize Alpine.js
import './icons.js';   // Initialize Lucide icons

// Help Vite discover images for optimization
import.meta.glob('../images/**/*.{png,jpg,jpeg,svg,webp,avif}', { eager: true });

if (import.meta.env.DEV) {
    console.log('[Vite HMR] Main entry loaded in DEV mode');
}

const getCommentAccentColor = () => {
    const probe = document.createElement('span');
    probe.style.color = 'var(--accent)';
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.pointerEvents = 'none';

    document.body.appendChild(probe);
    const accentColor = getComputedStyle(probe).color;
    probe.remove();

    return accentColor;
};

const syncCommentTheme = () => {
    const commentsScript = document.querySelector('script[data-ghost-comments]');
    const commentsRoot = document.getElementById('ghost-comments-root');
    const commentsFrame = commentsRoot?.querySelector('iframe[title="comments-frame"]');
    const commentsDocument = commentsFrame?.contentDocument;
    const isDarkTheme = document.documentElement.classList.contains('dark');

    if (!commentsScript) {
        if (!commentsDocument && commentsFrame) {
            commentsFrame.addEventListener('load', syncCommentTheme, { once: true });
        }
        return;
    }

    commentsScript.dataset.colorScheme = isDarkTheme ? 'dark' : 'light';
    commentsScript.dataset.accentColor = getCommentAccentColor();

    if (!commentsDocument) {
        if (commentsFrame) {
            commentsFrame.addEventListener('load', syncCommentTheme, { once: true });
        }

        return;
    }

    const commentSection = commentsDocument.querySelector('body > section.ghost-display-content');

    if (commentSection) {
        commentSection.classList.toggle('dark', isDarkTheme);
    } else if (commentsFrame) {
        commentsFrame.addEventListener('load', syncCommentTheme, { once: true });
    }
};

// Toggle dark mode based on user preference or system settings with local storage support and icon toggling using Tailwind CSS classes and JavaScript event listeners.
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Change the icons inside the button based on previous settings
    if (document.documentElement.classList.contains('dark')) {
        themeToggleLightIcon.classList.remove('hidden');
    } else {
        themeToggleDarkIcon.classList.remove('hidden');
    }

    syncCommentTheme();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function () {
            // toggle icons inside button
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');

            // if set via local storage previously
            if (localStorage.getItem('theme')) {
                if (localStorage.getItem('theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                }

                // if NOT set via local storage previously
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                }
            }

            syncCommentTheme();
        });
    }
});
